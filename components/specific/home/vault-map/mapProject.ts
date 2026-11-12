export const PROJECT_TITLE = "A week in Japan";
export const PROJECT_MILESTONES = [
  {id:"hotel",title:"Confirm the Kyoto stay",at:"2027-04-02T10:00:00+01:00",label:"April 2, 2027 at 10:00 AM WAT",detail:"Compare the stay options, check cancellation terms, and save the address and check-in instructions beside the accommodation plan."},
  {id:"train",title:"Review train reservations",at:"2027-04-05T14:00:00+01:00",label:"April 5, 2027 at 2:00 PM WAT",detail:"Check the April 14 route, departure station, luggage arrangements and timing before choosing tickets. Keep an offline copy of the journey details."},
  {id:"packing",title:"Finish the packing list",at:"2027-04-09T09:00:00+01:00",label:"April 9, 2027 at 9:00 AM WAT",detail:"Pack comfortable walking shoes, a light rain layer, chargers and travel documents. Share the hotel details and emergency contact information."},
] as const;
export const MILESTONE_NOTE_TITLE="Before we go";
export const MILESTONE_NOTE=PROJECT_MILESTONES.map(m=>`${m.title}\n${m.label}\n${m.detail}`).join("\n\n");
export const SAVED_NOTE=[
  "Trip outline: April 11–17, 2027 · two travellers · six nights. Start with three nights in Tokyo, then three in Kyoto. This is our draft plan; bookings and travel details still need checking.",
  "Tokyo ideas: neighbourhood walks, small cafés, bookshops and an evening exploring the city lights. Keep arrival afternoon free, and group nearby places into one day rather than crossing the city repeatedly.",
  "Kyoto ideas: quiet garden mornings, old streets and a relaxed food stop. Save a few photo references, then choose one main area each day. Leave an unscheduled morning for something we discover there.",
  "Travel day: move from Tokyo to Kyoto on April 14. Compare train options, check luggage arrangements and leave time between checkout, the journey and check-in. Keep that evening open.",
  "Stay and budget: collect both hotel options, reservation PDFs and arrival details here. Track accommodation, intercity travel, daily food and a small extra allowance before setting the final budget.",
  "Still to decide: arrival and departure flights, where to stay in Tokyo, which activities need advance booking, and a rainy-day alternative. Bring photos, a travel video and a city guide into this map to help us choose.",
].join("\n\n");
export const SAVED_NOTE_EDIT="\n\nOur priorities: fewer hotel changes, one main plan each day, and time for small discoveries.";
export const DESIGN_NOTE="Three nights in Tokyo, then three in Kyoto for two travellers, April 11–17, 2027. Keep arrival afternoon free for check-in, a short walk and a simple dinner. Plan one neighbourhood at a time so the trip feels relaxed.";
export const DESIGN_NOTE_EDIT="\n\nLeave an unscheduled morning in each city and one indoor option for wet weather. Save the photos, hotel addresses and reservation details beside the plan; confirm opening days before booking.";
export const VIDEO={id:"epqX_EmrQbQ",url:"https://www.youtube.com/watch?v=epqX_EmrQbQ",title:"Ultimate Japan Travel Guide for 1st Timers",publisher:"The Travel Intern",thumbnail:"/desktop-tour-media/japan-video.jpg"};
export const WEBPAGE={url:"https://en.wikivoyage.org/wiki/Kyoto",title:"Kyoto travel guide",publisher:"Wikivoyage"};
export const NOVA_PROMPT="Edit the selected itinerary note into a day-by-day table. Keep the Kyoto photo below the heading, the stay details and merged travel-day checklist. Leave free time, and show me the changes before applying them.";
export const NOVA_CHECKLIST=PROJECT_MILESTONES.map(m=>`${m.title} — ${m.label}`);
export const MAP_DURATION=178000;
export const MAP_CHAPTERS=[
 {at:0,title:"Open and edit a saved note",copy:"Follow the desktop guide: open your note, edit on the canvas, expand its tools, and save it back."},
 {at:20000,title:"Import photos and files",copy:"Bring Kyoto and Tokyo photos and a detailed accommodation PDF into the same workspace."},
 {at:32000,title:"Add video and web research",copy:"Add a full-size YouTube card and explore the live Kyoto guide in fullscreen."},
 {at:60000,title:"Write, format, and build a table",copy:"Create itinerary notes, use the expanded editor tools, and type into a table."},
 {at:98000,title:"Connect the pieces",copy:"Arrange related cards in clean rows, then link the reservation, itinerary and booking dates."},
 {at:108000,title:"Watch and take notes",copy:"Watch and format notes side by side, then combine a checklist note and a canvas photo with the itinerary."},
 {at:133500,title:"Group related references",copy:"Select cards, name the group and choose its color with the desktop grouping controls."},
 {at:140000,title:"Ask Nova to edit your note",copy:"Review a proposed day-by-day table, then confirm before the note changes."},
 {at:163000,title:"Share the complete trip",copy:"Export the map with its notes, photos, reservations, video and web references."},
] as const;

// A second camera frames fixed desktop controls and dialogs. Canvas movement
// remains the native React Flow camera. Both are presentation-only animation.
export function frameCamera(time:number,reduced=false){
 let zoom=1,centerX=800,centerY=540;
 if(!reduced){
  if(time>=22000&&time<26000||time>=33000&&time<39000||time>=47000&&time<51500||time>=166000&&time<174000){zoom=1.2;centerX=800;centerY=540}
  else if(time>=20000&&time<22000||time>=32000&&time<33000||time>=46000&&time<47000||time>=60000&&time<61500||time>=86000&&time<87500||time>=108000&&time<110000||time>=163000&&time<166000){zoom=1.22;centerX=1150;centerY=260}
  else if(time>=140000&&time<159000){zoom=1.12;centerX=1330;centerY=1000}
 }
 const x=Math.max(1600*(1-zoom),Math.min(0,800-centerX*zoom));
 const y=Math.max(1080*(1-zoom),Math.min(0,540-centerY*zoom));
 return {zoom,x,y};
}
