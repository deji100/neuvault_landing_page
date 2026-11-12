// Compile the actual desktop Reminders page, sidebar, document cards and
// SmartDoc/Reminder dialogs. Only IO and deterministic tour controllers differ.
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),site=path.resolve(here,'../..'),desktop=path.resolve(site,'../updv-desktop'),require=createRequire(path.join(desktop,'package.json'));
const ts=require('typescript'),{build}=await import(path.join(desktop,'node_modules/vite/dist/node/index.js')),{default:tailwind}=await import(path.join(desktop,'node_modules/@tailwindcss/vite/dist/index.mjs'));
const project=JSON.stringify(path.join(here,'project.ts')),controllers=JSON.stringify(path.join(here,'controllers.ts'));
const mocks=JSON.parse(fs.readFileSync(path.join(site,'scripts/native-map/mocks.json'),'utf8'));
for(const key of Object.keys(mocks))if(key.startsWith('/components/'))delete mocks[key];
// Preserve all synchronous native document-type classification and artwork logic.
delete mocks['/lib/documentThumbnails'];
Object.assign(mocks,{
 '/database':`export {database} from ${project};`,
 '/database/dbManager':`export const getCurrentDbName=()=> 'reminder-tour';export const DATABASE_CHANGED_EVENT='reminder-tour-db';`,
 '/lib/auth':`export const API_BASE='';export class ApiError extends Error{constructor(message,status){super(message);this.status=status}}`,
 '/lib/authRetry':`export const getFreshToken=async()=> 'tour';export const fetchWithTokenRetry=async()=>{throw Error('Network API disabled in tour')};`,
 '/lib/smartSuggestions':`import {dataAt} from ${project};export const getActiveSmartSuggestions=async()=>dataAt().suggestions;export const reviewSmartSuggestions=async()=>{};export const upsertSmartSuggestions=async()=>[];export const deleteSmartSuggestionsForDocuments=async()=>{};`,
 '/lib/manualAttention':`import {dataAt} from ${project};export const isManualAttentionSuggestion=s=>s?.attention_source==='manual';export const loadManualAttentionSuggestions=async()=>dataAt().manual;export const clearManualAttentionReminder=async()=>{};export const loadManualAttentionByDoc=async()=>new Map();`,
 '/database/actions/attentionDateIndexActions':`export const loadAttentionCoverageSummary=async()=>({candidateCount:5,readyDocCount:2,readyDocIds:['invoice','lease']});export const upsertAttentionDateIndexForDoc=async()=>{};`,
 '/components/intake/IntakePreviewProvider':`export const IntakePreviewProvider=({children})=>children;const value={openIntake:item=>window.dispatchEvent(new CustomEvent('tour-open-document',{detail:item})),openDocument:item=>window.dispatchEvent(new CustomEvent('tour-open-document',{detail:item})),closeIntake:()=>{},openPinnedDocs:()=>{},closePinnedDocs:()=>{}};export const useIntakePreview=()=>value;`,
 '/components/layout/AppShell':`export default function AppShell({children}){return children}`,
 '/components/planner/usePlannerItems':`export const usePlannerItems=()=>[];`,
 '/lib/desktopNotificationApi':'',
 '/lib/desktopOnboarding':`export const isDesktopOnboardingTourOpen=()=>false;export const emitDesktopOnboardingInteraction=()=>{};export const DESKTOP_ONBOARDING_COMMAND_EVENT='tour-onboarding-command';`,
 '/hooks/useDesktopQueueSnapshot':`const value={queue:[],completed:[],audioAssetNamespace:'tour'};export default ()=>value;export const useDesktopQueueSummary=()=>({queueCount:0});`,
 '/hooks/useDesktopNotificationCount':`export default ()=>0;`,
 '/hooks/useDesktopReminderCount':`import {dataAt} from ${project};export default ()=>dataAt().suggestions.length+dataAt().manual.length;`,
 '/hooks/usePlannerBadgeCount':`export const usePlannerDueCount=()=>0;`,
 '/lib/intakeProcessingSettings':`export const readIntakeProcessingSettings=()=>({});`,
 '/lib/assetPaths':`export const appLogoSrc='/desktop-images/app-logo.png';`,
 '/lib/noteAudioAssets':`export const getNoteSourceAudio=()=>null;export const getItemAudioSource=()=>null;export const noteAudioTrackId=()=>null;`,
 '/database/actions/linkingActions':`import {getRecord} from ${project};export const hydrateDesktopIntakeItem=async item=>item;export const mapIntakeModelToDesktopItem=record=>record;export const getDesktopIntakeItemById=async id=>getRecord(id);export const getGroupIdsForDoc=async()=>[];export const getLinkGroupMetaByIds=async()=>[];export const getRelatedDocsForDoc=async()=>[];`,
 '/lib/desktopQueue':`export const setDesktopQueueIntakeProcessingSettings=async()=>{};`,
});
const mockSources=new Map();
function importedNames(id,importer){if(!importer||!fs.existsSync(importer))return [];const tree=ts.createSourceFile(importer,fs.readFileSync(importer,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),names=[];for(const st of tree.statements){if(!ts.isImportDeclaration(st)||st.moduleSpecifier.text!==id||st.importClause?.isTypeOnly)continue;const c=st.importClause;if(c?.name)names.push('default');if(c?.namedBindings&&ts.isNamedImports(c.namedBindings))for(const n of c.namedBindings.elements)if(!n.isTypeOnly)names.push((n.propertyName||n.name).text)}return names}
function declaredNames(source){const tree=ts.createSourceFile('mock.ts',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS),names=new Set();for(const st of tree.statements){if(ts.isExportAssignment(st)){names.add('default');continue}if(ts.isExportDeclaration(st)&&st.exportClause&&ts.isNamedExports(st.exportClause)){for(const n of st.exportClause.elements)names.add(n.name.text);continue}if(!st.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword))continue;if(st.modifiers.some(m=>m.kind===ts.SyntaxKind.DefaultKeyword))names.add('default');if(st.name)names.add(st.name.text);if(ts.isVariableStatement(st))for(const n of st.declarationList.declarations)if(ts.isIdentifier(n.name))names.add(n.name.text);if(ts.isExportDeclaration(st)&&st.exportClause&&ts.isNamedExports(st.exportClause))for(const n of st.exportClause.elements)names.add(n.name.text)}return names}
const io={name:'reminder-tour-io',enforce:'pre',resolveId(id,importer){
 if(id==='@nozbe/watermelondb'){const key='\0reminder-watermelon';mockSources.set(key,'export const Q=new Proxy({},{get:(_,name)=>(...args)=>({name,args})});');return key}
 const full=(id.startsWith('.')&&importer?path.resolve(path.dirname(importer),id):id).replace(/\.(tsx?|jsx?)$/,'');if(!full.startsWith(path.join(desktop,'src/')))return;
 const suffix=Object.keys(mocks).find(key=>full.endsWith(key));if(!suffix&&!full.startsWith(path.join(desktop,'src/database')))return;
 let source=suffix?mocks[suffix]:'';const declared=declaredNames(source),names=importedNames(id,importer);
 for(const name of names){if(declared.has(name))continue;if(name==='default')source+='\nexport default class TourRecord {}';else if(/^[A-Z][A-Z_0-9]+$/.test(name))source+=`\nexport const ${name}=${JSON.stringify('tour:'+name)};`;else source+=`\nexport const ${name}=async()=>[];`;declared.add(name)}
 const key='\0reminder-io:'+full+':'+names.join(',');mockSources.set(key,source);return key;
},load:id=>mockSources.get(id)};
const fidelity={};
const jsx=text=>{const tree=ts.createSourceFile('native.tsx',text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),parts=[];function visit(node){if(ts.isJsxElement(node)||ts.isJsxSelfClosingElement(node)||ts.isJsxFragment(node))parts.push(node.getText(tree));ts.forEachChild(node,visit)}visit(tree);return parts};
const injection={name:'reminder-tour-controller',enforce:'pre',load(id){
 let hook,marker,args;
 if(id.endsWith('/src/pages/SmartSuggestionsPage.tsx')){hook='useReminderPageTour';marker='  const content = (';args='{setSuggestions,setManualSuggestions,setIntakeRecords,setIsLoadingData,setCandidateCount,setCandidatesWithFutureCount,setError,setShowRemindersInfo,setDueExpanded}'}
 if(id.endsWith('/src/components/intake/DesktopSmartDocHandler.tsx')){hook='useReminderDetailsTour';marker='  let sectionDialogTitle';args='{item,setActiveSection,setImportance,setImportanceReason,setResurfaceCadence,setResurfaceType,setNextResurfaceAt,setReminderSaveState}'}
 if(!hook)return;
 const source=fs.readFileSync(id,'utf8');if(!source.includes(marker))throw Error('Native controller marker changed: '+id);
 const result=`import {${hook}} from ${controllers};\n`+source.replace(marker,`  ${hook}(${args});\n${marker}`);
 if(JSON.stringify(jsx(source))!==JSON.stringify(jsx(result)))throw Error('Native JSX changed: '+id);
 fidelity[path.relative(desktop,id)]=true;return result;
}};
const work=path.join(site,'.native-reminders-build');fs.mkdirSync(work,{recursive:true});fs.writeFileSync(path.join(work,'index.html'),'<!doctype html><html lang="en" class="updv-dark" data-desktop-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NeuVault Reminders demo</title></head><body><div id="root"></div><script type="module" src="/scripts/native-reminders/entry.tsx"></script></body></html>');
await build({configFile:false,root:site,publicDir:false,base:'/desktop-tour/reminders/',plugins:[injection,io,tailwind()],esbuild:{jsx:'automatic'},css:{postcss:{plugins:[]}},resolve:{dedupe:['react','react-dom'],alias:{'@desktop':desktop,'lucide-react':path.join(desktop,'node_modules/lucide-react'),'react-dom':path.join(desktop,'node_modules/react-dom'),'react':path.join(desktop,'node_modules/react')}},build:{outDir:path.join(work,'output'),emptyOutDir:true,rollupOptions:{input:path.join(work,'index.html')},chunkSizeWarningLimit:3500},define:{'process.env.NODE_ENV':'"production"'}});
fs.renameSync(path.join(work,'output/.native-reminders-build/index.html'),path.join(work,'output/index.html'));
fs.cpSync(path.join(work,'output'),path.join(site,'public/desktop-tour/reminders'),{recursive:true});
for(const name of ['pdf.png','note.png','markdown.png','img.png','audio.png']){const file=path.join(desktop,'public',name);if(fs.existsSync(file))fs.copyFileSync(file,path.join(site,'public/desktop-tour/reminders',name))}
const hash=text=>createHash('sha256').update(text).digest('hex');const files=['src/pages/SmartSuggestionsPage.tsx','src/components/layout/AppSidebar.tsx','src/components/intake/DesktopSmartDocHandler.tsx','src/components/intake/DesktopResurfaceSection.tsx','src/components/intake/GlobalIntakePreview.tsx','src/components/intake/DesktopSectionShell.tsx','src/components/vault/VaultSubgroupDocumentCard.tsx','src/lib/documentThumbnails.ts','src/components/layout/DesktopVaultBrowserHeader.tsx','src/components/attention/ReminderCountdown.tsx','src/components/attention/FlipCountdown.tsx','src/styles.css','src/document-preview.css'];
const sources=Object.fromEntries(files.map(file=>[file,hash(fs.readFileSync(path.join(desktop,file)))]));const local=fs.readdirSync(here).sort().map(file=>fs.readFileSync(path.join(here,file)));local.push(fs.readFileSync(path.join(site,'components/specific/home/reminders/reminderProject.ts')));
fs.writeFileSync(path.join(site,'public/desktop-tour/reminders/source-manifest.json.next'),JSON.stringify({version:hash(Buffer.concat([...local,Buffer.from(JSON.stringify(sources))])).slice(0,16),jsxUnchanged:Object.values(fidelity).every(Boolean),controllers:fidelity,sources},null,2)+'\n');

fs.renameSync(path.join(site,'public/desktop-tour/reminders/source-manifest.json.next'),path.join(site,'public/desktop-tour/reminders/source-manifest.json'));
