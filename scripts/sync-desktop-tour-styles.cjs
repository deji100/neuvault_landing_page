const fs=require('fs');
const {createRequire}=require('module');
const path=require('path');
const siteRoot=path.resolve(__dirname,'..');
const desktopRoot=path.resolve(process.argv[2]||path.join(siteRoot,'../updv-desktop'));
// Refresh the tour's scoped presentation rules from the desktop checkout.
// Run: node scripts/sync-desktop-tour-styles.cjs [path-to-updv-desktop]
const fromNext=createRequire(require.resolve('next/package.json',{paths:[siteRoot]}));
const postcss=fromNext('postcss');
const base=path.join(desktopRoot,'src/');
const selections=[
 ['styles.css', /linked-map-|linked-document-map|map-ai-|document-view-modal|youtube-inline-viewer|webpage-inline-viewer|nv-finder-|nv-dashboard-|nv-auto-ingestion-|nv-inbox-(?:folder-glyph|count-badge)|desktop-vault-folder-(?:card|art|tab|back|front)|desktop-vault-folder-menu-trigger/],
 ['planner.css', /nv-planner|nv-doc-kind/],
 ['components/planner/nova/novaRobot.css', /nv-nova/],
 ['notes-voice-workspace.css', /notes-voice-|notes-editor-content/],
 ['components/home/homeFeatureSpotlight.css', /nv-home-feature/],
];
const markup=['capture/DesktopInterface.tsx','planner/PlannerInterface.tsx','planner/PlannerNovaDemo.tsx','planner/NovaRobot.tsx','vault-map/MapInterface.tsx'].map(file=>fs.readFileSync(path.join(siteRoot,'components/specific/home',file),'utf8')).join('\n');
const used=new Set(markup.match(/\b(?:nv-|desktop-|notes-|linked-|map-ai-|document-|youtube-|webpage-)[a-zA-Z0-9_-]+/g));
let out='/* Desktop presentation rules copied from updv-desktop.\n * Scoped to the landing-page tour; no app database, account or Electron code.\n * Source: AppSidebar, DesktopHomePage, NotesVoicePage, VaultFolderCard, Planner, NovaRobot.\n */\n';
for(const [file,pattern] of selections){
 const root=postcss.parse(fs.readFileSync(base+file,'utf8'));out+='\n/* '+file+' */\n';
 root.walkRules(rule=>{
  if(!pattern.test(rule.selector))return;
  let parent=rule.parent;while(parent&&parent.type!=='root'){if(parent.type==='atrule')return;parent=parent.parent;}
  const selectors=rule.selectors.filter(s=>(s.match(/\.(?:nv-|desktop-|notes-|linked-|map-ai-|document-|youtube-|webpage-)[a-zA-Z0-9_-]+/g)||[]).every(c=>used.has(c.slice(1)))&&pattern.test(s)&&!s.includes('data-collapsed="true"')&&!s.includes(':hover')&&!s.includes(':focus')&&!s.includes(':active'));
  if(!selectors.length)return;
  const copy=rule.clone();
  copy.selectors=[...new Set(selectors.map(s=>'.nv-capture-desktop '+s.replace(/:root\[data-desktop-theme="dark"\]/g,'.updv-dark').replace(/:root\[data-desktop-theme="light"\]/g,'.updv-light').replace(/html\.updv-dark\s+body/g,'.updv-dark').replace(/html\s+body\s*/g,'').replace(/:root/g,'.capture-root')))];
  copy.walkDecls(d=>{if(d.prop==='animation'||d.prop==='will-change')d.remove();});out+=copy.toString()+'\n';
 });
}
fs.writeFileSync(path.join(siteRoot,'components/specific/home/capture/DesktopApp.css'),out);
console.log('Scoped desktop CSS:',out.length,'bytes');
