/* eslint-disable @typescript-eslint/no-require-imports -- Node asset sync script. */
const fs=require('node:fs'),path=require('node:path'),{createRequire}=require('node:module');
const root=path.resolve(__dirname,'..'),desktop=path.resolve(root,'../updv-desktop');
const native=createRequire(path.join(desktop,'package.json')),postcss=createRequire(native.resolve('vite'))('postcss');
const css=postcss.parse(fs.readFileSync(path.join(desktop,'src/styles.css'),'utf8')),out=postcss.root();
const names=new Set(['nv-sidebar-ring','nv-bell-clapper','nv-bell-badge-in','nv-sidebar-marker-flow']);
css.walkRules(rule=>{
 if(!rule.selector.includes('.nv-finder-row[data-alerting=')&&!rule.selector.includes('.nv-finder-row[data-nav-key="notifications"]'))return;
 const copy=rule.clone();copy.selectors=copy.selectors.map(s=>'.nv-capture-desktop '+s.replaceAll('html.updv-dark body','.updv-dark').replaceAll(':root[data-desktop-theme="dark"] body','.updv-dark').replaceAll('html body','').trim());
 let wrapped=copy;for(let p=rule.parent;p&&p.type!=='root';p=p.parent){const a=p.clone({nodes:[]});a.append(wrapped);wrapped=a}out.append(wrapped);
});
css.walkAtRules('keyframes',rule=>{if(names.has(rule.params))out.append(rule.clone())});
fs.writeFileSync(path.join(root,'components/specific/home/capture/SidebarMotion.css'),'/* Native desktop attention indicators and animation keyframes. */\n'+out.toString()+'\n');
const sync=fs.readFileSync(path.join(desktop,'src/lib/syncIconAnimations.ts'),'utf8').replace('if (!SYNCED_ANIMATIONS.has(event.animationName)) return;', 'if (!SYNCED_ANIMATIONS.has(event.animationName)) return;\n  if (event.target instanceof Element && getComputedStyle(event.target).animationPlayState === "paused") return;');
fs.writeFileSync(path.join(root,'components/specific/home/capture/sidebarIconSync.ts'),'// Copied from the desktop animation clock; paused demo animations stay paused.\n'+sync);
console.log('Synced native sidebar attention styles and shared animation clock.');
