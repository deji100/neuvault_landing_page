// @ts-nocheck -- fictional records are compiled with the desktop app.
import {PROJECT_TITLE,PROJECT_MILESTONES,SAVED_NOTE,SAVED_NOTE_EDIT,DESIGN_NOTE,DESIGN_NOTE_EDIT,MILESTONE_NOTE,MILESTONE_NOTE_TITLE,VIDEO,WEBPAGE,NOVA_PROMPT} from '../../components/specific/home/vault-map/mapProject';
export const html=(text:string)=>text.split('\n\n').map(block=>'<p>'+block.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('\n','<br/>')+'</p>').join('');
export const typed=(text:string,time:number,start:number,speed=40)=>text.slice(0,Math.max(0,Math.floor((time-start)/speed)));
const record=(id,title,entityType,x,y,width,height,body='',metadata={})=>({id,mapId:'tour-map',entityId:entityType==='map_note'?null:id,title,entityType,x,y,width,height,body,metadata,createdAt:1794351600000,updatedAt:1794351600000});
export function savedNoteBody(time:number){
 let body=html(SAVED_NOTE);
 if(time>=9000)body='<h2>Japan trip brief</h2>'+body;
 if(time>=10500)body=body.replace(/(Trip outline:|Tokyo ideas:|Kyoto ideas:|Travel day:|Stay and budget:)/g,'<strong>$1</strong>');
 if(time>=11500)body=body.replace(/<p>Still to decide:[\s\S]*?<\/p>/,'<p><strong>Still to decide</strong></p><ul><li>Arrival and departure flights</li><li>Where to stay in Tokyo</li><li>Activities that need advance booking</li><li>A rainy-day alternative</li></ul>');
 if(time>=12500)body+=html(typed(SAVED_NOTE_EDIT,time,12500,55)).replace('Our priorities:','<strong>Our priorities:</strong>');
 return body;
}
export const savedItem={id:'saved-note',title:'Japan trip ideas',type:'note',file_type:'NOTE',processing_status:'processed',raw_data:html(SAVED_NOTE),summary:'April 11–17, 2027 · two travellers. Tokyo and Kyoto ideas, travel-day plans, stay and budget notes, and decisions to research.'};
export const videoItem={id:'video',title:VIDEO.title,type:'document',file_type:'YOUTUBE',processing_status:'processed',extracted_fields:{youtube:{source_kind:'youtube',video_id:VIDEO.id,canonical_url:VIDEO.url,thumbnail_url:VIDEO.thumbnail,title:VIDEO.title,channel_name:VIDEO.publisher,metadata_status:'available'}}};
export const webItem={id:'web',title:WEBPAGE.title,type:'document',file_type:'WEBPAGE',processing_status:'processed',extracted_fields:{webpage:{source_kind:'webpage',canonical_url:WEBPAGE.url,hostname:'en.wikivoyage.org',display_url:'en.wikivoyage.org/wiki/Kyoto',title:WEBPAGE.title,metadata_status:'available'}}};
export const pdfItem={id:'pdf',title:'Kyoto stay · accommodation plan.pdf',type:'document',file_type:'PDF',content_type:'application/pdf',processing_status:'processed',summary:'Kyoto accommodation and arrival plan, April 14–17, 2027. Three nights for two adults; room requirements, arrival window, daily outline, booking checks, departure preparation and offline essentials.'};
export const imageItems=[{id:'kyoto',title:'Kyoto · old streets.jpg',type:'document',file_type:'JPG',processing_status:'unprocessed'},{id:'tokyo',title:'Tokyo · city lights.jpg',type:'document',file_type:'JPG',processing_status:'unprocessed'}];
export const projectGroup={id:'tour-group',name:PROJECT_TITLE,documents:[savedItem,pdfItem,...imageItems,videoItem,webItem]};
export function documentsAt(time:number){return projectGroup.documents.map(item=>item.id==='saved-note'&&time>=19000?{...item,raw_data:savedNoteBody(19000)}:item)}
export function tableHtml(rows:string[][]){return '<table><tbody>'+rows.map((row,index)=>'<tr>'+row.map(value=>`<${index?'td':'th'}><p>${value||'<br>'}</p></${index?'td':'th'}>`).join('')+'</tr>').join('')+'</tbody></table>'}
export const initialTable=[['City','Make room for'],['Tokyo','Neighbourhood walks + food'],['Kyoto','Gardens + quiet mornings']];
export const ITINERARY_BASE='<h2>Tokyo + Kyoto</h2>'+html('Trip plan: '+DESIGN_NOTE+DESIGN_NOTE_EDIT).replace('Trip plan:','<strong>Trip plan:</strong>')+tableHtml(initialTable);
export const TRAVEL_DAY_NOTE='<p>Move from Tokyo to Kyoto on April 14, with time to settle in before dinner.</p><ul><li>Save the departure station, route and booking reference offline before leaving the hotel.</li><li>Check checkout time and luggage arrangements; allow a buffer for finding the platform.</li><li>Keep passports, tickets, chargers and a change of clothes within easy reach.</li><li>Share the Kyoto address and check-in instructions; leave the evening free if the journey takes longer.</li></ul>';
export const TRAVEL_DAY_SECTION='<h2>Travel-day checklist</h2>'+TRAVEL_DAY_NOTE;
export const WATCH_NOTES='<h2>Notes while watching</h2><ul><li>Group nearby ideas into one day, with a café or food stop along the walking route.</li><li>Keep a free afternoon for discoveries and a quieter option if we are tired.</li><li>Check opening days and booking requirements, and save an indoor alternative for rain.</li></ul>';
export const NOTE_PHOTO='<p><img src="/desktop-tour-media/kyoto.jpg" data-nv-note-image="demo/kyoto.jpg" alt="Kyoto old streets inspiration" width="280" data-width="280" style="width:min(280px,100%);height:auto;"></p>';
export const ITINERARY_WITH_TRAVEL=ITINERARY_BASE+WATCH_NOTES+TRAVEL_DAY_SECTION;
export const ITINERARY_WITH_PHOTO=ITINERARY_BASE.replace('</h2>','</h2>'+NOTE_PHOTO)+WATCH_NOTES+TRAVEL_DAY_SECTION;
export const NOVA_NOTE='<h2>A week in Japan</h2>'+NOTE_PHOTO+'<p>April 11–17, 2027 · two travellers · six nights. Our draft itinerary keeps one main area a day, with flexible mornings and a wet-weather alternative.</p>'+tableHtml([['Days','Base','Draft plan'],['1–3','Tokyo','Check in and rest on arrival; use the next two days for neighbourhood walks, small cafés and food stops. Keep one afternoon unplanned.'],['4','Tokyo → Kyoto','Check out, travel to Kyoto and save the new address offline. Allow time for luggage and check-in; keep dinner flexible.'],['5–6','Kyoto','Choose one garden or old-street area each day. Leave a morning open and keep an indoor option ready for rain.'],['7','Departure','Pack the night before, check the departure route and allow a comfortable buffer for the airport.']])+'<h3>Stay details</h3><p>Kyoto stay: April 14–17, 2027. Three nights for two adults. Prefer a quiet double or twin room with a private bathroom and space for luggage. Aim to arrive between 15:00 and 17:00 JST, after confirming reception hours. Check the final price, payment timing and cancellation deadline before booking; save the confirmation, address and arrival instructions together.</p>'+WATCH_NOTES+TRAVEL_DAY_SECTION;
export function notePlan(noteId:string,time:number){
 if(noteId==='saved-edit'&&time>=7000&&time<19000)return {body:savedNoteBody(time),expanded:time>=8500,action:time>=9000&&time<9500?'Heading 2':time>=10500&&time<11000?'Bold':time>=11500&&time<12000?'Bullet list':null};
 if(noteId==='design'&&time>=64000&&time<85000){
  let body='<h2>'+typed('Tokyo + Kyoto',time,65000,95)+'</h2>';
  if(time>=67500)body+=html('Trip plan: '+typed(DESIGN_NOTE,time,67500,22)).replace('Trip plan:','<strong>Trip plan:</strong>');
  if(time>=73500)body+=html(typed(DESIGN_NOTE_EDIT,time,73500,19));
  if(time>=78000){const letters=initialTable.flat().join('').length;const count=Math.min(letters,Math.max(0,Math.floor((time-78500)/30)));let left=count;body+=tableHtml(initialTable.map(row=>row.map(value=>{const text=value.slice(0,left);left=Math.max(0,left-value.length);return text})))}
  return {body,expanded:time>=64500,action:time>=65000&&time<66000?'Heading 2':time>=67500&&time<68500?'Bold':time>=77000&&time<78000?'Insert table':null};
 }
 if(noteId==='milestones'&&time>=89000&&time<97000)return {body:html(typed(MILESTONE_NOTE,time,89500,9)),expanded:time>=90000,action:null};
 if(noteId==='design'&&time>=111000&&time<128000){const text=typed('Group nearby ideas into one day, with a café or food stop along the walking route.\n\nKeep a free afternoon for discoveries and a quieter option if we are tired.\n\nCheck opening days and booking requirements, and save an indoor alternative for rain.',time,116000,43);return {body:ITINERARY_BASE+'<h2>Notes while watching</h2><ul>'+text.split('\n\n').map(line=>'<li>'+line+'</li>').join('')+'</ul>',expanded:time>=113000,action:time>=115000&&time<116000?'Bullet list':null}}
 if(noteId==='design'&&time>=131500&&time<133500)return {body:ITINERARY_WITH_PHOTO,expanded:true,action:null};
 if(noteId==='design'&&time>=159000&&time<162000)return {body:NOVA_NOTE,expanded:true,action:null};
 return null;
}
export function projectAt(time:number){
 const nodes=[record('saved-note','Japan trip ideas','note',30,30,300,260,'',{documentType:'NOTE'})];
 if(time>=7000&&time<19000)nodes.push(record('saved-edit','Japan trip ideas','map_note',420,30,620,620,html(SAVED_NOTE),{editTargetIntakeId:'saved-note'}));
 if(time>=26000){nodes.push(record('pdf',pdfItem.title,'document',420,30,300,260,'',{documentType:'PDF'}));nodes.push(record('kyoto',imageItems[0].title,'document',30,1150,500,null,'',{documentType:'JPG'}),record('tokyo',imageItems[1].title,'document',600,1150,500,null,'',{documentType:'JPG'}))}
 if(time>=39000)nodes.push(record('video',VIDEO.title,'document',30,410,null,null,'',{documentType:'YOUTUBE'}));
 if(time>=51500)nodes.push(record('web',WEBPAGE.title,'document',780,30,300,260,'',{documentType:'WEBPAGE'}));
 if(time>=61500)nodes.push(record('design',time<64000?typed('Tokyo + Kyoto itinerary',time,62000,90)||'Untitled note':'Tokyo + Kyoto itinerary','map_note',940,410,time>=131500?720:time>=129700?640:480,time>=131500?720:time>=129700?680:620,time>=156000?NOVA_NOTE:time>=131500?ITINERARY_WITH_PHOTO:time>=129700?ITINERARY_WITH_TRAVEL:time>=128000?ITINERARY_BASE+WATCH_NOTES:time>=85000?ITINERARY_BASE:'<p></p>'));
 if(time>=85000&&time<129700)nodes.push(record('travel-day','Travel-day checklist','map_note',1650,1100,480,380,TRAVEL_DAY_NOTE));
 if(time>=87500)nodes.push(record('milestones',MILESTONE_NOTE_TITLE,'map_note',1500,410,480,470,time>=97000?html(MILESTONE_NOTE):'<p></p>',{noteKind:'sticky',cardColor:time>=95600?'#dff6e8':'#e6dcff'}));
 const progress=Math.max(0,Math.min(1,(time-97000)/2000));
 const settled=progress*progress*(3-2*progress);
 for(const node of nodes){
  const target=CONNECTED_LAYOUT[node.id];
  if(target&&settled){
   const centredY=target.y+(node.id==='design'?(620-node.height)/2:0);
   const extraX=time>=131500?280:time>=129700?200:0;
   const targetX=target.x+(['milestones','video'].includes(node.id)?extraX:0);
   node.x+=(targetX-node.x)*settled;node.y+=(centredY-node.y)*settled;
  }
 }
 if(time>=139000)for(const node of nodes)if(['saved-note','web'].includes(node.id))node.metadata={...node.metadata,mapGroupId:'trip-research',mapGroupName:'Trip research',mapGroupColor:'#42a5b3',mapGroupParentId:null};
 const edge=(id,sourceNodeId,targetNodeId,label)=>({id,mapId:'tour-map',sourceNodeId,targetNodeId,label,relationType:'supports',createdBy:'user',createdAt:0,updatedAt:0,provenance:null});
 const edges=[];
 if(time>=102000)edges.push(edge('reservation','pdf','design','stay details'));
 if(time>=106000)edges.push(edge('milestones','design','milestones','before we go'));
 return {map:{id:'tour-map',linkedGroupId:'tour-group',name:PROJECT_TITLE,createdAt:0,updatedAt:0},nodes,edges,documents:documentsAt(time)};
}
export function messagesAt(time:number){
 const sources=[{source_type:'note',source_id:'design',title:'Tokyo + Kyoto itinerary'}];
 const proposal={id:'edit-itinerary',type:'UPDATE_NOTE_CARD',title:'Turn the itinerary into a clear day-by-day plan',description:'Replace this note with the reviewed itinerary, preserving the stay details and your viewing notes.',target_note_ids:['design'],target_document_ids:[],requires_confirmation:true,payload:{note_id:'design',new_title:'Tokyo + Kyoto itinerary',new_body:NOVA_NOTE}};
 return [...(time>=147000?[{id:'question',role:'user',content:NOVA_PROMPT,created_at:'2026-11-11'}]:[]),...(time>=150000?[{id:'answer',role:'assistant',content:'Here is a proposed edit of your itinerary note. I kept the accommodation and arrival details and the notes you wrote while watching, and turned the rough plan into a day-by-day table. Review the changes before confirming.',response:{sources,action_proposals:[proposal],warnings:[]},created_at:'2026-11-11'}]:[])];
}

let currentTime=0;
export const setProjectTime=(time:number)=>{currentTime=time};
export const updateDemoNote=async(id:string,title:string,body:string)=>{
 const canonical=projectAt(currentTime).nodes.find(node=>node.id===id);
 const confirmedNovaEdit=id==='design'&&body.includes('A week in Japan')&&body.includes('Stay details');
 // Native editors commit on blur/unmount. A backward seek or reduced-motion
 // jump must not let an old scene's late commit overwrite the new scene.
 const nextBody=confirmedNovaEdit||notePlan(id,currentTime)?body:canonical?.body??body;
 return {...canonical||record(id,title,'map_note',940,410,480,620),title,body:nextBody};
};

export const canCommitTourNote=(noteId:string)=>Boolean(notePlan(noteId,currentTime));

// Settle references into one row and align connected card centres so the
// reservation → itinerary → preparation chain has clear, straight paths.
export const CONNECTED_LAYOUT={
 'saved-note':{x:30,y:30},web:{x:450,y:30},
 kyoto:{x:800,y:30},tokyo:{x:1380,y:30},
 pdf:{x:30,y:692},design:{x:450,y:500},milestones:{x:1050,y:575},
 video:{x:1650,y:500},'travel-day':{x:1650,y:1100},
};

export const insertDemoNote=async(sourceId,targetId,body)=>({target:{...projectAt(currentTime).nodes.find(node=>node.id===targetId),body},rewiredEdges:[]});

export const updateDemoColor=async(id,color)=>{const node=projectAt(currentTime).nodes.find(node=>node.id===id);return {...node,metadata:{...node?.metadata,cardColor:color}}};

export const updateDemoGroups=async(ids,group)=>projectAt(currentTime).nodes.filter(node=>ids.includes(node.id)).map(node=>({...node,metadata:{...node.metadata,mapGroupId:group.id,mapGroupName:group.name,mapGroupColor:group.color,mapGroupParentId:group.parentId||null}}));
