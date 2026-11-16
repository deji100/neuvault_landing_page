"use client";

import { useId } from "react";
import type { Workflow, WorkflowReminder } from "@/lib/workflows";
import styles from "./WorkflowIllustration.module.css";

export const workflowHeadlines: Record<string, string[]> = {
  "study-smarter": ["Keep your course\nmaterial together.", "Find the assignment\ndue date.", "Connect notes\nto the assignment.", "Set a reminder.\nPlan study time.", "Check the brief.\nFinish on time."],
  "organize-research": ["Keep your\nsources together.", "Find the\nsubmission deadline.", "Compare papers.\nConnect the evidence.", "Set a reminder.\nPlan the review.", "Check the guidelines\nbefore you submit."],
  "manage-work": ["Keep client\nrecords together.", "Find the contract\nrenewal date.", "Connect the contract\nto your notes.", "Set a reminder\nbefore renewal.", "Review the terms\nbefore you renew."],
  "develop-ideas": ["Keep the brief\nand inspiration together.", "Find the\nclient-review date.", "Connect your ideas\nto the brief.", "Set a reminder.\nPlan your draft.", "Check your concepts\nbefore the review."],
  "organize-my-life": ["Keep your travel\ndocuments together.", "Find the passport\nexpiry date.", "Connect your documents\nto the trip.", "Choose when\nto be reminded.", "Check your passport\nbefore it expires."],
  "build-projects": ["Keep specs\nand decisions together.", "Find the target\nrelease date.", "Connect requirements\nto decisions.", "Set a reminder.\nPlan the review.", "Check what is left\nbefore release day."],
  "run-a-business": ["Keep customer\nrecords together.", "Find the\nimportant details.", "Connect the proposal\nto customer needs.", "Plan the delivery.\nAttach the details.", "Check the requirements.\nFinish the plan."],
  "keep-learning": ["Save tutorials\nand course notes.", "Find the ideas\nyou want to try.", "Connect what\nyou are learning.", "Make time\nto practice.", "Try the techniques.\nTrack your progress."],
};

function lines(text: string, length = 24) {
  const words = text.split(" ");
  const result = [""];
  for (const word of words) {
    const last = result.length - 1;
    if ((result[last] + " " + word).trim().length > length) result.push(word);
    else result[last] = (result[last] + " " + word).trim();
  }
  return result.slice(0, 2);
}

function Glyph({ kind = 0 }: { kind?: number }) {
  return <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {kind % 3 === 0 ? <><path d="M5 3h11l4 4v17H5zM15 3v6h5M9 13h7M9 17h7M9 21h4" /></> : kind % 3 === 1 ? <><rect x="4" y="4" width="19" height="20" rx="3" /><circle cx="10" cy="10" r="2" /><path d="m5 21 7-7 4 4 3-3 4 4" /></> : <><path d="M5 12v5M9 8v13M13 4v21M17 9v11M21 12v5" /></>}
  </g>;
}

function Card({ x, y, title, kind = 0, width = 190, angle = 0, className = "" }: { x: number; y: number; title: string; kind?: number; width?: number; angle?: number; className?: string }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle} ${width / 2} 65)`}>
    <g className={className}>
      <rect width={width} height="132" rx="16" fill="var(--surface)" stroke="var(--line)" />
      <rect x="16" y="16" width="35" height="35" rx="10" fill="currentColor" fillOpacity=".12" />
      <g transform="translate(21 20)"><Glyph kind={kind} /></g>
      {lines(title, Math.floor(width / 7.4)).map((line, index) => <text key={index} x="17" y={76 + index * 18} fill="var(--ink)" fontSize="13" fontWeight="550">{line}</text>)}
      <path d={`M17 113h${width - 57}`} stroke="currentColor" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
    </g>
  </g>;
}

function Brand() {
  return <g>
    <rect x="-47" y="-47" width="94" height="94" rx="26" fill="#fff" />
    <svg x="-29" y="-30" width="58" height="60" viewBox="470 458 560 584">
      <path fill="#2563eb" d="M642.67,692.22h0c-19.24,.21-28.57,23.62-14.75,37.01l83.74,81.1v196.36s-206.42,.17-206.42,.17l.17-393.66,205.09-.1,1.16,1.08,79.65,76.39-148.64,1.64Z" />
      <path fill="#2563eb" d="M857.33,807.78h0c19.24-.21,28.57-23.62,14.75-37.01l-83.74-81.1v-196.36s206.42-.17,206.42-.17l-.17,393.66-205.09,.1-1.16-1.08-79.65-76.39,148.64-1.64Z" />
    </svg>
  </g>;
}

function Bell({ x, y, size = 25 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
    <g className={styles.bell} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4M12 1v1" /></g>
  </g>;
}

function ReminderPlan({ workflow, reminder }: { workflow: Workflow; reminder: WorkflowReminder }) {
  return <g data-reminder-state="review-and-set">
    <g transform="translate(94 42)">
      <rect width="572" height="108" rx="18" fill="var(--surface)" stroke="var(--line)" />
      <text x="22" y="27" fill="currentColor" fontSize="10" letterSpacing="1.4">AI-DETECTED DOCUMENT DATE</text>
      <text x="22" y="60" fill="var(--ink)" fontSize="18" fontWeight="600">{reminder.dateLabel}</text>
      <text x="550" y="60" textAnchor="end" fill="currentColor" fontSize="19" fontWeight="600">{reminder.date}</text>
      <text x="22" y="87" fill="var(--soft)" fontSize="12">Source: {reminder.source} · Review this date</text>
    </g>
    <path d="M380 151v31" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" className={styles.flow} />
    <g transform="translate(94 186)">
      <rect width="572" height="113" rx="18" fill="var(--mist)" stroke="currentColor" strokeOpacity=".5" />
      <Bell x={21} y={22} />
      <text x="60" y="31" fill="currentColor" fontSize="10" letterSpacing="1.1">REMINDER · YOU SET THE TIMING</text>
      <text x="22" y="66" fill="var(--ink)" fontSize="17" fontWeight="550">{reminder.title}</text>
      <text x="22" y="92" fill="var(--soft)" fontSize="12">Bring the document back: {reminder.remindAt} · {reminder.leadTime}</text>
    </g>
    <g transform="translate(94 338)">
      <rect width="572" height="113" rx="18" fill="var(--surface)" stroke="var(--line)" strokeDasharray="5 5" />
      <path d="M24 29h14M31 22v14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <text x="51" y="33" fill="var(--soft)" fontSize="10" letterSpacing="1.2">OPTIONAL · CREATE A PLANNER TASK</text>
      {lines(workflow.steps[3].artifact, 58).map((line, i) => <text key={i} x="23" y={67 + i * 20} fill="var(--ink)" fontSize="16" fontWeight="550">{line}</text>)}
      <text x="23" y="97" fill="var(--soft)" fontSize="11">Add work to your plan, with the document attached.</text>
    </g>
    <text x="380" y="483" textAnchor="middle" fill="var(--soft)" fontSize="11">Reminders flag dates. Planner tasks schedule the work.</text>
  </g>;
}

function ReminderReturn({ reminder }: { reminder: WorkflowReminder }) {
  return <g data-reminder-state="upcoming-commitment">
    <g opacity=".5"><Card x={41} y={76} title={reminder.source} width={181} angle={-10} className={styles.floatA} /></g>
    <path d="M201 181Q273 174 307 241" fill="none" stroke="currentColor" strokeOpacity=".5" className={styles.flow} />
    <g transform="translate(157 162)">
      <rect x="8" y="10" width="442" height="230" rx="23" fill="var(--paper)" stroke="var(--line)" />
      <rect width="442" height="230" rx="23" fill="var(--surface)" stroke="currentColor" strokeOpacity=".35" />
      <rect x="24" y="24" width="103" height="25" rx="12.5" fill="currentColor" fillOpacity=".12" />
      <text x="75" y="41" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="1.1">REMINDERS</text>
      <text x="24" y="86" fill="var(--ink)" fontSize="22" fontWeight="550">{reminder.title}</text>
      <text x="24" y="116" fill="currentColor" fontSize="14">{reminder.leadTime} · {reminder.dateLabel}: {reminder.date}</text>
      <text x="24" y="144" fill="var(--soft)" fontSize="12">Reminder: {reminder.remindAt}</text>
      <path d="M24 163h394" stroke="var(--line)" />
      <text x="24" y="199" fill="var(--ink)" fontSize="12">Open source: {reminder.source}</text>
      <path d="m402 188 7 7-7 7m-12-7h18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g transform="translate(570 131)">
      <circle r="65" fill="var(--surface)" stroke="currentColor" strokeOpacity=".2" />
      <circle r="52" fill="currentColor" fillOpacity=".1" />
      <circle r="66" fill="none" stroke="currentColor" strokeOpacity=".4" className={styles.reminderPulse} />
      <Bell x={-21} y={-24} size={43} />
    </g>
    <text x="380" y="454" textAnchor="middle" fill="currentColor" fontSize="11" letterSpacing="1.8">REMINDERS WORK WITHOUT A PLANNER TASK.</text>
  </g>;
}

export default function WorkflowIllustration({ workflow, stage, animate }: { workflow: Workflow; stage: number; animate: boolean }) {
  const uid = useId().replace(/:/g, "");
  const materials = workflow.materials;
  return <svg className={styles.art} viewBox="0 0 760 500" aria-hidden="true" data-animate={animate} data-workflow-scene={stage}>
    <defs>
      <radialGradient id={`${uid}-glow`}><stop stopColor="currentColor" stopOpacity=".2" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
      <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="var(--ink)" fillOpacity=".11" /></pattern>
      <linearGradient id={`${uid}-line`} x1="0" x2="1"><stop stopColor="currentColor" stopOpacity="0" /><stop offset=".5" stopColor="currentColor" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="760" height="500" fill={`url(#${uid}-grid)`} />
    <ellipse cx="395" cy="250" rx="330" ry="240" fill={`url(#${uid}-glow)`} />
    <ellipse cx="385" cy="250" rx="270" ry="185" fill="none" stroke="currentColor" strokeOpacity=".09" transform="rotate(-18 385 250)" />
    {stage === 0 && <>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity=".5" className={styles.flow}><path d="M208 156Q300 145 389 251" /><path d="M526 137Q490 198 410 251" /><path d="M220 370Q322 369 389 275" /></g>
      <g transform="translate(395 260)"><circle r="90" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="24" /><circle r="113" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="120 590" className={styles.orbit} /><g className={styles.breathe}><Brand /></g></g>
      <Card x={57} y={80} title={materials[0]} angle={-9} className={styles.floatA} />
      <Card x={486} y={53} title={materials[1]} kind={1} angle={9} className={styles.floatB} />
      <Card x={112} y={320} title={materials[2]} kind={2} angle={-5} className={styles.floatC} />
      <g transform="translate(484 345)" className={styles.arrive}><rect width="185" height="45" rx="22.5" fill="var(--surface)" stroke="var(--line)" /><circle cx="24" cy="22" r="4" fill="currentColor" /><text x="39" y="27" fill="var(--soft)" fontSize="12">{workflow.reminder ? "Keep the dates, too" : "A place for every idea"}</text></g>
      <text x="395" y="342" textAnchor="middle" fill="currentColor" fontSize="11" letterSpacing="3">YOUR VAULT</text>
    </>}
    {stage === 1 && <>
      <g transform="translate(270 54)"><rect width="220" height="46" rx="23" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".3" /><path d="m24 13 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="currentColor" /><text x="49" y="28" fill="var(--ink)" fontSize="13">AI summaries & sorting</text></g>
      <g className={styles.flow} fill="none" stroke="currentColor" strokeOpacity=".5"><path d="M380 102v33H165v55M380 102v88M380 135h215v55" /></g>
      {materials.map((material, index) => <g key={material} transform={`translate(${65 + index * 218} 184)`}>
        <g className={[styles.floatA, styles.floatB, styles.floatC][index]}>
          <rect x="7" y="10" width="192" height="207" rx="18" fill="var(--paper)" stroke="var(--line)" />
          <rect width="192" height="207" rx="18" fill="var(--surface)" stroke="var(--line)" />
          <rect x="17" y="18" width="36" height="36" rx="10" fill="currentColor" fillOpacity=".14" /><g transform="translate(22 22)"><Glyph kind={index} /></g>
          <text x="17" y="83" fill="currentColor" fontSize="10" letterSpacing="1.7">{["THE SOURCE", "THE CONTEXT", "YOUR NOTES"][index]}</text>
          {lines(material, 22).map((line, n) => <text key={n} x="17" y={110 + n * 19} fill="var(--ink)" fontSize="13">{line}</text>)}
          <path d="M17 160h151M17 173h103" stroke="var(--line)" strokeWidth="4" strokeLinecap="round" />
          <rect x="17" y="185" width="74" height="3" rx="1.5" fill="currentColor" fillOpacity=".65" />
        </g>
      </g>)}
      <path d="M52 273h660" stroke={`url(#${uid}-line)`} strokeWidth="2" className={styles.scan} />
      {workflow.reminder ? <g data-reminder-state="detected-date"><text x="380" y="452" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="1.2">AI-DETECTED DATE · REVIEW IN THE SOURCE</text><text x="380" y="476" textAnchor="middle" fill="var(--ink)" fontSize="13">{workflow.reminder.dateLabel}: {workflow.reminder.date} · {workflow.reminder.source}</text></g> : <text x="380" y="461" textAnchor="middle" fill="var(--soft)" fontSize="12">Organized. Searchable. Ready when you are.</text>}
    </>}
    {stage === 2 && <>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".55" className={styles.flow}><path d="M190 143C270 143 275 230 355 242" /><path d="M584 139C515 139 491 218 427 239" /><path d="M575 374C502 374 478 302 429 280" /></g>
      <circle cx="390" cy="258" r="105" fill="currentColor" fillOpacity=".04" stroke="currentColor" strokeOpacity=".15" className={styles.breathe} />
      <Card x={37} y={64} title={materials[0]} width={185} angle={-5} className={styles.floatA} />
      <Card x={514} y={51} title={materials[1]} width={185} kind={1} angle={6} className={styles.floatB} />
      <Card x={497} y={328} title={materials[2]} width={185} kind={2} angle={-4} className={styles.floatC} />
      <g transform="translate(280 190)"><rect width="225" height="137" rx="24" fill="var(--mist)" stroke="currentColor" strokeOpacity=".65" /><g transform="translate(97 18)" stroke="currentColor" fill="none" strokeWidth="2"><circle cx="0" cy="13" r="4" /><circle cx="25" cy="0" r="4" /><circle cx="28" cy="28" r="4" /><path d="m4 11 17-9M4 15l20 11M26 4l1 20" /></g>{lines(workflow.project, 26).map((line, i) => <text key={i} x="112" y={88 + i * 18} textAnchor="middle" fill="var(--ink)" fontSize="16" fontWeight="600">{line}</text>)}</g>
      <g fill="var(--soft)" fontSize="10" letterSpacing="1"><text x="225" y="179">INFORMS</text><text x="484" y="188">SUPPORTS</text><text x="445" y="355">BUILDS ON</text></g>
      <g transform="translate(60 361)"><rect width="227" height="44" rx="22" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeOpacity=".25" /><circle cx="24" cy="22" r="6" fill="currentColor" /><text x="42" y="27" fill="var(--soft)" fontSize="12">Ask Nova about the whole map</text></g>
    </>}
    {stage === 3 && workflow.reminder && <ReminderPlan workflow={workflow} reminder={workflow.reminder} />}
    {stage === 3 && !workflow.reminder && <>
      <rect x="85" y="77" width="592" height="347" rx="22" fill="var(--paper)" stroke="var(--line)" />
      <path d="M85 136h592" stroke="color-mix(in srgb,var(--ink) 12%,transparent)" /><text x="111" y="113" fill="var(--ink)" fontSize="13" fontWeight="600">MAKE SPACE FOR WHAT’S NEXT</text>
      <circle cx="644" cy="108" r="4" fill="currentColor" />
      {["MON", "TUE", "WED", "THU", "FRI"].map((day, i) => <g key={day}><text x={145 + i * 118} y="166" fill={i === 2 ? "currentColor" : "var(--soft)"} textAnchor="middle" fontSize="11">{day}</text>{i > 0 && <path d={`M${85 + i * 118} 184v218`} stroke="color-mix(in srgb,var(--ink) 8%,transparent)" />}</g>)}
      {[219, 278, 337].map(y => <path key={y} d={`M106 ${y}h550`} stroke="color-mix(in srgb,var(--ink) 8%,transparent)" />)}
      <rect x="324" y="183" width="111" height="216" rx="12" fill="currentColor" fillOpacity=".045" />
      <g transform="translate(220 214)"><g className={styles.schedule}><rect width="274" height="105" rx="15" fill="var(--mist)" stroke="currentColor" strokeOpacity=".65" /><rect x="0" y="14" width="3" height="77" rx="1.5" fill="currentColor" />{lines(workflow.steps[3].artifact, 32).map((line, i) => <text key={i} x="18" y={30 + i * 19} fill="var(--ink)" fontSize="13" fontWeight="550">{line}</text>)}<path d="M20 79h6m4 0h6" stroke="currentColor" strokeWidth="2" /><text x="46" y="83" fill="var(--soft)" fontSize="10">Source material attached</text></g></g>
      <g transform="translate(368 366)"><rect width="223" height="39" rx="19.5" fill="var(--surface)" stroke="var(--line)" /><path d="m18 19 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" /><text x="41" y="24" fill="var(--soft)" fontSize="11">Your plan. Your confirmation.</text></g>
    </>}
    {stage === 4 && workflow.reminder && <ReminderReturn reminder={workflow.reminder} />}
    {stage === 4 && !workflow.reminder && <>
      <g opacity=".45"><Card x={54} y={84} title={materials[0]} width={167} angle={-12} className={styles.floatA} /><Card x={551} y={260} title={materials[1]} width={160} angle={11} className={styles.floatB} /></g>
      <g transform="translate(193 120)"><rect x="10" y="12" width="360" height="260" rx="24" fill="var(--paper)" stroke="var(--line)" /><rect width="360" height="260" rx="24" fill="var(--surface)" stroke="var(--line)" /><rect x="26" y="25" width="71" height="26" rx="13" fill="currentColor" fillOpacity=".14" /><text x="61" y="43" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="2">DONE</text>{lines(workflow.steps[3].artifact, 29).map((line, i) => <text key={i} x="27" y={104 + i * 27} fill="var(--ink)" fontSize="21" fontWeight="550">{line}</text>)}<path d="M28 179h264M28 193h188" stroke="color-mix(in srgb,var(--ink) 15%,transparent)" strokeWidth="5" strokeLinecap="round" /><text x="28" y="233" fill="var(--soft)" fontSize="11">The task is done. The context stays.</text></g>
      <g transform="translate(535 128)"><circle r="66" fill="var(--surface)" stroke="currentColor" strokeOpacity=".25" strokeWidth="1" /><circle r="53" fill="currentColor" fillOpacity=".12" /><circle r="65" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="95 314" className={styles.orbit} /><path d="m-24 1 16 16 32-35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className={styles.check} /></g>
      <g className={styles.confetti} stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="m452 50-5-9M616 89l10-5M600 195l8 8M491 209l-6 9" /><circle cx="571" cy="34" r="3" fill="currentColor" stroke="none" /><circle cx="646" cy="145" r="3" fill="currentColor" stroke="none" /></g>
      <text x="380" y="449" textAnchor="middle" fill="currentColor" fontSize="11" letterSpacing="3">CAPTURE → CONNECT → FOLLOW THROUGH</text>
    </>}
  </svg>;
}
