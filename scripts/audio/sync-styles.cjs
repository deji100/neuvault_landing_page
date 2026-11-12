// Copy the native Note & Voice, transcription and player skin into this scene.
const fs=require('node:fs'),path=require('node:path'),{createRequire}=require('node:module');
const root=path.resolve(__dirname,'../..'),desktop=path.resolve(root,'../updv-desktop');
const native=createRequire(path.join(desktop,'package.json'));
const postcss=createRequire(native.resolve('vite'))('postcss');
const pattern=/notes-voice-|notes-editor-content|nv-transcri|transcript-follow-|transcript-audio-active|transcript-speaker-active|nv-global-audio-bar/;
const out=postcss.root();
for(const file of ['styles.css','notes-voice-workspace.css']){
 const source=postcss.parse(fs.readFileSync(path.join(desktop,'src',file),'utf8'));
 source.walkRules(rule=>{
  if(!pattern.test(rule.selector))return;
  let parent=rule.parent;
  while(parent&&parent.type!=='root'){
   if(parent.type==='atrule'&&!(parent.name==='media'&&parent.params.includes('prefers-reduced-motion')))return;
   parent=parent.parent;
  }
  // :not(.updv-dark) is a light-theme guard. Exclude it before removing
  // positive dark guards, or replacing .updv-dark would leave invalid :not().
  const selectors=rule.selectors.filter(s=>pattern.test(s)&&!s.includes('updv-light')&&!s.includes('data-desktop-theme="light"')&&!/:not\(\s*\.updv-dark\s*\)/.test(s));
  if(!selectors.length)return;
  const copy=rule.clone();
  copy.selectors=selectors.map(s=>'.nv-capture-desktop .audio-native-scope '+s.replace(/:root\[data-desktop-theme="dark"\]/g,'').replace(/html\.updv-dark\s+body/g,'').replace(/html\s+body/g,'').replace(/\.updv-dark/g,'').replace(/:root/g,'').trim());
  let wrapped=copy;
  for(let ancestor=rule.parent;ancestor&&ancestor.type!=='root';ancestor=ancestor.parent){const p=ancestor.clone({nodes:[]});p.append(wrapped);wrapped=p}
  out.append(wrapped);
 });
 source.walkAtRules('keyframes',rule=>{if(/transcri|follow-bar/.test(rule.params))out.append(rule.clone())});
}
const target=path.join(root,'components/specific/home/capture/AudioNative.css');
out.walkRules(rule=>{if(/:(?:not|is|where|has)\(\s*\)/.test(rule.selector))throw new Error('Empty selector generated: '+rule.selector)});
fs.writeFileSync(target,'/* Native desktop Note & Voice rules, scoped to the existing Capture scene. */\n'+out.toString()+'\n');
console.log('Copied native audio presentation:',fs.statSync(target).size,'bytes');
