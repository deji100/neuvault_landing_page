export const REMINDER_DURATION = 38000;
export const REMINDER_BASE_TIME = '2026-11-12T09:00:00+01:00';
export const REMINDER_REASON = 'Confirm our Kyoto stay and save the address, arrival time and cancellation deadline.';
export const REMINDER_DATE = '2026-11-19T15:30:00+01:00';
export function reminderDocumentAt(time:number){return time>=4000&&time<7000?'lease':time>=8500&&time<12500?'passport':time>=16000&&time<29000?'japan':null}
export function reminderPageAt(time:number){return time>=14000&&time<30000?'vault':'smart-suggestions'}
export function reminderFrame(time:number,reduced:boolean){
 if(reduced)return {x:0,y:0,zoom:1};
 const zoom=time>=17500&&time<27500?1.12:1;
 return {zoom,x:800-800*zoom,y:540-540*zoom};
}
