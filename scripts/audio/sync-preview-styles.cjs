// Native document modal presentation, scoped to the transcript preview only.
const fs=require('node:fs'),path=require('node:path'),{createRequire}=require('node:module');
const root=path.resolve(__dirname,'../..'),desktop=path.resolve(root,'../updv-desktop');
const fromNext=createRequire(require.resolve('next/package.json'));
const postcss=fromNext('postcss'),out=postcss.root();
const pattern=/desktop-fullscreen-(?:preview|document)|desktop-modal-header|desktop-document-neutral-canvas|nv-audio-source-badge/;
for(const file of ['styles.css','document-preview.css']){
 const source=postcss.parse(fs.readFileSync(path.join(desktop,'src',file),'utf8'));
 source.walkRules(rule=>{
  if(!pattern.test(rule.selector))return;
  let parent=rule.parent;while(parent&&parent.type!=='root'){if(parent.type==='atrule')return;parent=parent.parent}
  const selectors=rule.selectors.filter(s=>pattern.test(s)&&!s.includes('updv-light')&&!s.includes('desktop-preview-light')&&!/data-desktop-theme=["']?light/.test(s)&&!/:not\(\s*\.updv-dark\s*\)/.test(s));
  if(!selectors.length)return;
  const copy=rule.clone();copy.selectors=selectors.map(s=>'.nv-capture-desktop .native-transcript-modal '+s.replace(/:root\[data-desktop-theme="dark"\]/g,'').replace(/\.updv-dark/g,'').replace(/(^|\s)(?:html|body)(?=\s|$)/g,'$1').replace(/:root/g,'').trim());
  if(copy.selectors.some(s=>/:(not|is|where|has)\(\s*\)/.test(s)))throw Error('Empty selector');
  out.append(copy);
 });
}
fs.writeFileSync(path.join(root,'components/specific/home/capture/TranscriptModalNative.css'),'/* Native DesktopFullscreenPreview presentation from updv-desktop. */\n'+out.toString()+'\n');
console.log('Copied native transcript modal presentation');
