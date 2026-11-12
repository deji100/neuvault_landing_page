// @ts-nocheck -- IO records for the unchanged native reminder components.
import {REMINDER_REASON,REMINDER_DATE} from '../../components/specific/home/reminders/reminderProject';
export let time=0;
export const setTime=value=>{time=value};
const doc=(id,title,summary,fields={})=>({id,title,summary,_raw:{},type:'document',file_type:'PDF',content_type:'application/pdf',processing_status:'processed',group:'Personal & Family',subgroup:'Documents',tags:[],raw_data:'',extracted_fields:{},processed_at:new Date('2026-11-10T10:00:00Z'),importance:null,importance_reason:null,next_resurface_at:null,resurface_cadence:null,resurface_type:null,linked_groups:[],related_documents:[],...fields});
export const records=[
 doc('invoice','Studio invoice — November.pdf','Invoice for the monthly studio workspace. Payment is due November 12, 2026 at 16:00.',{group:'Finance & Banking',extracted_fields:{payment_due_date:'2026-11-12',amount:'240.00',currency:'GBP'}}),
 doc('lease','Studio lease agreement.pdf','The current studio lease ends November 14, 2026. Confirm renewal and the revised monthly rate before the deadline.',{extracted_fields:{renewal_date:'2026-11-14'}}),
 doc('passport','Passport renewal checklist','Check passport validity, gather the photograph and supporting documents, and review appointment availability.',{importance:'high',importance_reason:'Check passport validity before booking the Japan trip.',next_resurface_at:'2026-11-20T09:00:00+01:00',resurface_cadence:'yearly',resurface_type:'recurring'}),
 doc('insurance','Travel insurance renewal','Review cover limits, exclusions and the renewal quote before the next trip.',{importance:'medium',importance_reason:'Compare cover for both travellers.',next_resurface_at:'2026-11-16T10:00:00+01:00',resurface_type:'once'}),
 doc('japan','Japan travel bookings.pdf','Tokyo and Kyoto: collect hotel confirmations, arrival instructions, train reservations and cancellation deadlines in one place.',{group:'Travel & Tourism',subgroup:'Japan',tags:['Japan','Bookings','Travel']})
];
const suggestion=(id,docId,title,date)=>({id,suggestion_id:id,doc_id:docId,title,description:'Date found in the document.',primary_date:date,recommended_remind_at:date,recommended_action:'Review the source document.',priority:'high',generated_at:'2026-11-10T10:00:00Z',status:'active'});
const detected=[suggestion('invoice-due','invoice','Pay the studio invoice','2026-11-12T16:00:00+01:00'),suggestion('lease-renewal','lease','Confirm studio lease renewal','2026-11-14T09:00:00+01:00')];
const manual=(record,date=record.next_resurface_at)=>({id:'manual:doc:'+record.id,suggestion_id:null,doc_id:record.id,title:record.title,description:record.importance_reason||'Reminder set by you.',primary_date:date,recommended_remind_at:date,priority:record.importance||'medium',generated_at:'2026-11-10T10:00:00Z',status:'active',attention_source:'manual',target_type:'doc',target_id:record.id});
export function dataAt(value=time){
 const docs=records.map(record=>record.id==='japan'?{...record,importance:value>=18000?'high':null,importance_reason:value>=22000?REMINDER_REASON:null,resurface_cadence:null,resurface_type:value>=22000?'once':null,next_resurface_at:value>=24000?REMINDER_DATE:value>=22000?'2026-11-19T09:00:00+01:00':null}:record);
 return {records:docs,suggestions:detected.filter(s=>value<35800||s.id!=='invoice-due'),manual:[manual(docs[2]),manual(docs[3]),...(value>=26000?[manual(docs[4],REMINDER_DATE)]:[])]};
}
export const getRecord=id=>dataAt().records.find(record=>record.id===id);
export const query=()=>({fetch:async()=>dataAt().records,fetchCount:async()=>0,observe(){return this},observeCount(){return {subscribe(callback){if(typeof callback==='function')callback(0);else callback?.next?.(0);return {unsubscribe(){}}}}},observeWithColumns(){return this},subscribe(callback){if(typeof callback==='function')callback(dataAt().records);else callback?.next?.(dataAt().records);return {unsubscribe(){}}}});
export const database={write:async callback=>callback(),get:name=>({find:async id=>{const record=getRecord(id);if(!record)throw Error('Unknown demo document');return {...record,update:async callback=>{const next={...record};callback(next);return next}}},query,findAndObserve:id=>({subscribe(callback){callback(getRecord(id));return {unsubscribe(){}}}})})};
