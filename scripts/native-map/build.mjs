// Bundle the complete desktop Vault Map. Only IO and the tour controller are
// adapted; desktop JSX, React Flow configuration and styles remain unchanged.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const site=path.resolve(here,'../..');
const desktop=path.resolve(process.argv[2]||path.join(site,'../updv-desktop'));
const require=createRequire(path.join(desktop,'package.json'));
const ts=require('typescript');
const {build}=await import(path.join(desktop,'node_modules/vite/dist/node/index.js'));
const {default:tailwind}=await import(path.join(desktop,'node_modules/@tailwindcss/vite/dist/index.mjs'));
const work=path.join(site,'.native-map-build');fs.mkdirSync(work,{recursive:true});
const mapFile=path.join(desktop,'src/features/linked-document-map/LinkedDocumentMapView.tsx');
const fidelity={jsxUnchanged:false};
const mocks=JSON.parse(fs.readFileSync(path.join(here,'mocks.json'),'utf8'));
// Visual components always come from desktop, including the preview renderers.
for(const key of Object.keys(mocks))if(key.startsWith('/components/'))delete mocks[key];
delete mocks['/features/linked-document-map/map-ai/MapPlannerNova'];
Object.assign(mocks,{
 '/components/intake/IntakePreviewProvider':'export const useIntakePreview=()=>({openIntake:()=>{}});',
 '/features/linked-document-map/linkedDocumentMapService':`import {projectAt,updateDemoNote,insertDemoNote,updateDemoColor,updateDemoGroups} from ${JSON.stringify(path.join(here,'project.ts'))};export const updateMapNodeGroups=updateDemoGroups;export const updateMapNote=updateDemoNote;export const updateMapNodeColor=updateDemoColor;export const insertMapNoteIntoNote=insertDemoNote;export const ensureLinkedDocumentMap=async()=>projectAt(0);export const isPlaceholderNoteTitle=s=>!s||/untitled/i.test(s);export const mapNoteTitleFromBody=()=>null;export const addMapEdge=async(mapId,sourceNodeId,targetNodeId)=>({id:'tour-connection:'+sourceNodeId+':'+targetNodeId,mapId,sourceNodeId,targetNodeId,relationType:'related',label:null,createdBy:'user',createdAt:0,updatedAt:0});`,
 '/features/linked-document-map/map-ai/mapAIHistoryPersistence':'export const loadMapAIHistory=()=>({messages:[],executedProposalIds:[]});export const loadMapAIPendingProcessing=()=>null;',
 '/lib/firstRunExperience':'const state={eligible:false};export const useFirstRun=()=>state;',
 '/lib/desktopQueue':'export const getDesktopQueueState=async()=>({items:[]});export const subscribeDesktopQueuePatches=()=>()=>{};',
 '/lib/desktopOnboarding':'',
 '/lib/captureApi':'',
 '/lib/organizeInbox':'',
 '/lib/noteSubmission':'',
 '/lib/mediaDuplicateCheck':'',
 '/lib/smartSuggestions':'',
 '/hooks/useDesktopNotificationCount':'',
 '/features/linked-document-map/linkedDocumentMapBundle':'',
 '/features/linked-document-map/linkedDocumentMapPackageRestore':'',
 '/features/linked-document-map/map-ai/mapAIApi':'',
});
// Preserve the desktop's type classification exactly. Case-sensitive demo
// substitutes incorrectly treated its lowercase "youtube" label as a 300px
// document card instead of using the native 820px media default.
const thumbnailsFile=path.join(desktop,'src/lib/documentThumbnails.ts');
const thumbnailsText=fs.readFileSync(thumbnailsFile,'utf8');
const thumbnailsTree=ts.createSourceFile(thumbnailsFile,thumbnailsText,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
const classificationNames=new Set(['VIDEO_TYPE_WORDS','IMAGE_TYPE_WORDS','typeWords','isWebDocumentTypeLabel','isImageDocumentTypeLabel','isVideoDocumentTypeLabel']);
const classification=thumbnailsTree.statements.filter(st=>classificationNames.has(st.name?.text)||ts.isVariableStatement(st)&&st.declarationList.declarations.some(d=>classificationNames.has(d.name.getText(thumbnailsTree))));
if(classification.length!==6)throw Error('Native thumbnail classification changed; update the IO adapter.');
mocks['/lib/documentThumbnails']=`import {isYouTubeDocumentTypeLabel} from ${JSON.stringify(path.join(desktop,'src/lib/youtubeLinks'))};\n`+ts.transpileModule(classification.map(st=>st.getText(thumbnailsTree)).join('\n'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext}}).outputText+'\n'+mocks['/lib/documentThumbnails'];
function importNames(id,importer){
 if(!importer||!fs.existsSync(importer))return [];
 const source=ts.createSourceFile(importer,fs.readFileSync(importer,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const names=[];
 for(const st of source.statements){if(!ts.isImportDeclaration(st)||st.moduleSpecifier.text!==id||st.importClause?.isTypeOnly)continue;const clause=st.importClause;if(clause?.namedBindings&&ts.isNamedImports(clause.namedBindings))for(const e of clause.namedBindings.elements)if(!e.isTypeOnly)names.push((e.propertyName||e.name).text);if(clause?.name)names.push('default')}
 return names;
}
function exportedNames(source){
 const ast=ts.createSourceFile('mock.ts',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS),names=new Set();
 for(const st of ast.statements){if(!st.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword))continue;if(st.modifiers.some(m=>m.kind===ts.SyntaxKind.DefaultKeyword))names.add('default');if(st.name)names.add(st.name.text);if(ts.isVariableStatement(st))for(const d of st.declarationList.declarations)if(ts.isIdentifier(d.name))names.add(d.name.text)}
 return names;
}
// Reuse native content rules in split view; those rules originally require
// a canvas note-node ancestor, which the split editor deliberately lacks.
const postcss=createRequire(require.resolve('vite'))('postcss');
const nativeStyles=postcss.parse(fs.readFileSync(path.join(desktop,'src/styles.css'),'utf8'));
const splitStyles=postcss.root();
nativeStyles.walkRules(rule=>{
 if(!/\.linked-map-note-node[\s\S]*?(?:linked-map-note-rich|linked-map-note-inline-editor|notes-editor-content)/.test(rule.selector))return;
 const clone=rule.clone({selector:rule.selector.replaceAll('.linked-map-note-node','.linked-map-split-note-editor').replaceAll('.linked-map-note-rich','.linked-map-note-inline-editor')});
 let wrapped=clone;
 for(let ancestor=rule.parent;ancestor&&ancestor.type!=='root';ancestor=ancestor.parent){const parent=ancestor.clone({nodes:[]});parent.append(wrapped);wrapped=parent}
 splitStyles.append(wrapped);
});
fs.writeFileSync(path.join(work,'editor-parity.css'),splitStyles.toString());
const imageFile=path.join(desktop,'src/lib/noteImageAssets.ts');
const imageSource=fs.readFileSync(imageFile,'utf8');
const imageTree=ts.createSourceFile(imageFile,imageSource,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
const imageMarkup=imageTree.statements.find(st=>st.name?.text==='noteImageBlockHtml');
if(!imageMarkup)throw Error('Native note image markup changed.');
mocks['/lib/noteImageAssets']=`export const NOTE_IMAGE_PATH_ATTRIBUTE='data-nv-note-image';
export const resolveNoteImageUrl=async()=>'/desktop-tour-media/kyoto.jpg';
export const copyDocumentImageIntoNote=async()=>({relativePath:'demo/kyoto.jpg'});
export const useResolvedNoteHtml=s=>s.replace(/src=""/g,'src="/desktop-tour-media/kyoto.jpg"');
export const stripResolvedNoteImageSources=s=>s;
export const migrateNoteImagesToAssets=async(id,s)=>s;
`+ts.transpileModule(imageMarkup.getText(imageTree).replace('width = 420','width = 280'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext}}).outputText;
const mockSources=new Map();
const mockPlugin={name:'tour-io-only',enforce:'pre',resolveId(id,importer){
 if(id.startsWith('@tiptap/'))return createRequire(importer?.startsWith('/')?importer:path.join(desktop,'package.json')).resolve(id,{paths:[importer?path.dirname(importer):desktop,path.join(desktop,'node_modules')]});
 const full=(id.startsWith('.')&&importer?path.resolve(path.dirname(importer),id):id).replace(/\.(tsx?|jsx?)$/,'');
 if(!full.startsWith(path.join(desktop,'src/')))return;
 const suffix=Object.keys(mocks).find(suffix=>full.endsWith(suffix));
 if(!suffix&&!full.startsWith(path.join(desktop,'src/database')))return;
 let source=suffix?mocks[suffix]:'';
 const declared=exportedNames(source);
 const names=importNames(id,importer);
 for(const name of names){if(declared.has(name))continue;if(name==='default')source+='\nexport default class DemoRecord {}';else if(/^[A-Z][A-Z_0-9]+$/.test(name))source+=`\nexport const ${name}=${JSON.stringify('demo:'+name)};`;else if(name.startsWith('observe'))source+=`\nexport const ${name}=()=>({observeWithColumns(){return this},observe(){return this},subscribe(callback){callback([]);return {unsubscribe(){}}}});`;else if(name.startsWith('subscribe'))source+=`\nexport const ${name}=()=>()=>{};`;else source+=`\nexport const ${name}=async()=>[];`;declared.add(name)}
 const key='\0tour-io:'+full+':'+names.join(',');mockSources.set(key,source);return key;
 },load(id){return mockSources.get(id)}};
const controllerNames=['applySnapshot','setLoading','setError','setYoutubeLinkOpen','setYoutubeLinkDraft','setWebBookmarkOpen','setWebBookmarkDraft','setOpenToolbarCategory','setPreviewDocument','setPlayingMediaNodeId','setSplitScreenActive','setSplitScreenItems','setExpandedSplitPane','setNovaOpen','setNovaDraft','setNovaMessages','setExecutedNovaProposalIds','setNovaSending','setNovaScopeChoice','setMapExportOpen','setSelectedNodeIds','setNodes','setSelection','getViewport','screenToFlowPosition','flowToScreenPosition','setViewport','editFocusAtRef','setLiveDocuments','setReplayNoteId','setMapCoachStep','setMapCoachEditCardId','setMapUploadChoice','wrapperElement','nodesRef','handleNodeDragStart','handleNodeDrag','handleNodeDragStop','setMergeRestructureSuggestion','setGroupDraft','setSelectedGroupIds'];
const tourPlugin={name:'native-map-controller',enforce:'pre',load(id){
 if(id!==mapFile)return;
 const source=fs.readFileSync(id,'utf8');
 const ast=ts.createSourceFile(id,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const inner=ast.statements.find(st=>ts.isFunctionDeclaration(st)&&st.name?.text==='LinkedDocumentMapInner');
 const guard=inner?.body.statements.find(st=>ts.isIfStatement(st)&&st.expression.getText(ast)==='loading');
 if(!guard)throw Error('Native map loading guard changed; update controller injection.');
 let output=source.slice(0,guard.getStart(ast))+`useNativeMapTour({${controllerNames.join(',')}});\n`+source.slice(guard.getStart(ast));
 // Drive the real note editor through its command API while typing.
 const marker='  const noteTools =';
 if(!output.includes(marker))throw Error('Native note editor changed; update typing controller.');
 output=output.replace('editorProps: {\n      attributes:', 'editorProps: {\n      handleScrollToSelection: () => true,\n      attributes:');
 output=output.replace(marker,`  useTourEditor(editor,noteId,setToolsExpanded,dirtyRef);\n${marker}`);
 output=output.replace('if (autoFocus) editor.commands.focus("end");','if (autoFocus) editor.commands.focus("end", {scrollIntoView:false});');
 output=output.replaceAll('dirtyRef.current && html !== committedHtmlRef.current', 'dirtyRef.current && html !== committedHtmlRef.current && canCommitTourNote(noteId)');
 const jsxTexts=(text)=>{const tree=ts.createSourceFile(id,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),result=[];const visit=node=>{if(ts.isJsxElement(node)||ts.isJsxSelfClosingElement(node)||ts.isJsxFragment(node))result.push(node.getText(tree));ts.forEachChild(node,visit)};visit(tree);return result};
 if(JSON.stringify(jsxTexts(source))!==JSON.stringify(jsxTexts(output)))throw Error('Tour injection changed native JSX.');
 fidelity.jsxUnchanged=true;
 return `import {useTourEditor,canCommitTourNote} from ${JSON.stringify(path.join(here,'useTourEditor.ts'))};\nimport {useNativeMapTour} from ${JSON.stringify(path.join(here,'useNativeMapTour.ts'))};\n`+output;
}};
fs.writeFileSync(path.join(work,'index.html'),'<!doctype html><html lang="en" data-desktop-theme="dark" class="updv-dark"><head><meta charset="UTF-8"/><title>NeuVault Vault Map demonstration</title><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body><div id="root"></div><script type="module" src="/scripts/native-map/entry.tsx"></script></body></html>');
await build({configFile:false,publicDir:false,root:site,base:'/desktop-tour/vault-map/',esbuild:{jsx:'automatic'},css:{postcss:{plugins:[]}},plugins:[tourPlugin,mockPlugin,tailwind()],resolve:{dedupe:['react','react-dom'],alias:{'@desktop':desktop,'@xyflow/react':path.join(desktop,'node_modules/@xyflow/react'),'lucide-react':path.join(desktop,'node_modules/lucide-react'),'react-dom':path.join(desktop,'node_modules/react-dom'),'react':path.join(desktop,'node_modules/react')}},build:{outDir:path.join(site,'public/desktop-tour/vault-map'),emptyOutDir:true,rollupOptions:{input:path.join(work,'index.html')},chunkSizeWarningLimit:3000},define:{'process.env.NODE_ENV':'"production"'}});
const builtHtml=path.join(site,'public/desktop-tour/vault-map/.native-map-build/index.html');
fs.renameSync(builtHtml,path.join(site,'public/desktop-tour/vault-map/index.html'));
for(const name of ['pdf.png','note.png','video.png','webpage.svg','markdown.png','word.png','img.png','audio.png','spreadsheet.png','powerpoint.png']){const source=path.join(desktop,'public',name);if(fs.existsSync(source))fs.copyFileSync(source,path.join(site,'public/desktop-tour/vault-map',name))}



const nativeFiles=['src/lib/noteImageAssets.ts','src/lib/documentThumbnails.ts','src/features/linked-document-map/LinkedDocumentMapView.tsx','src/features/linked-document-map/LinkedDocumentMapPreview.tsx','src/features/linked-document-map/map-ai/MapAIDrawer.tsx','src/styles.css','src/document-preview.css','src/linked-share-help.css','src/isolated-controls.css','src/notes-voice-workspace.css','src/build-with-us.css','src/nova-assistant-workspace.css'];
const hash=text=>createHash('sha256').update(text).digest('hex');
const sources=Object.fromEntries(nativeFiles.map(file=>[file,hash(fs.readFileSync(path.join(desktop,file)))]));
const localInputs=fs.readdirSync(here).filter(file=>/\.(tsx?|mjs|json|css|html)$/.test(file)).sort().map(file=>fs.readFileSync(path.join(here,file)));
const version=hash(Buffer.concat([...localInputs,Buffer.from(JSON.stringify(sources))])).slice(0,16);
fs.writeFileSync(path.join(site,'public/desktop-tour/vault-map/source-manifest.json'),JSON.stringify({version,jsxUnchanged:fidelity.jsxUnchanged,sources},null,2)+'\n');
