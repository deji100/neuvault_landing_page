import { ArrowDownUp, CalendarDays, ChartPie, Check, ChevronDown, ChevronLeft, ChevronRight, Columns3, FileSearch, FileText, Filter, GripVertical, Info, LayoutList, MoreHorizontal, NotebookPen, Paperclip, Plus, Repeat, Rows3, Search, Share, X } from "lucide-react";
import { DesktopSidebar } from "../capture/DesktopInterface";
import { DEVELOPMENT_NOTE_TITLE } from "../capture/captureTimeline";
import { type PlannerView } from "./usePlannerTour";
import PlannerNovaDemo, { plannerNovaOpen } from "./PlannerNovaDemo";
import NovaRobot from "./NovaRobot";
import styles from "./PlannerInterface.module.css";
const TASK = "Review API architecture";
import { BASE_ITEMS as BASE, plannerItemsAt, type PlannerItem as Item } from "./plannerProject";
function DocumentIcon({title,small=false}:{title:string;small?:boolean}) {
    const kindClass=title.endsWith(".pdf")?"nv-doc-kind--pdf":"nv-doc-kind--note";
    return <span className={`nv-doc-kind ${kindClass} ${small?"nv-doc-kind--sm":"nv-doc-kind--md"}`} aria-hidden="true">{title.endsWith(".pdf")?<FileText/>:<NotebookPen/>}</span>;
}
const PRIORITY_CLASS = { high: "nv-planner-item__priority--high", medium: "nv-planner-item__priority--medium", none: "" };
function Card({ item, compact = false, target, hidden = false }: {
    item: Item;
    compact?: boolean;
    target?: string;
    hidden?: boolean;
}) {
    return <div className={`nv-planner-item${compact ? " nv-planner-item--compact" : " nv-planner-item--stacked"}${item.done ? " is-closed" : ""}`} data-priority={item.priority} data-kind={item.kind ?? "task"} data-planner-target={target} style={hidden ? { opacity: .2 } : undefined} data-planner-item={item.id}>
  <div className="nv-planner-item__body"><span className="nv-planner-item__title">{item.done && <Check className="nv-planner-item__done"/>}{item.title}</span>{!compact && <span className="nv-planner-item__meta"><span>{item.day ? `Nov ${item.day} · ` : ""}{item.time || "No date"}</span>{item.repeat && <span className="nv-planner-item__chip"><Repeat />Repeats</span>}{item.attachments && <span className="nv-planner-item__chip"><Paperclip />{item.attachments}</span>}{item.priority !== "none" && <span className={`nv-planner-item__priority ${PRIORITY_CLASS[item.priority]}`}>{item.priority}</span>}</span>}</div>
  {!compact && item.source && <div className="nv-planner-item__doc"><DocumentIcon title={item.source} small/><span className="nv-planner-item__doc-text">{item.source}</span></div>}
 </div>;
}
function timeInMinutes(value: string) {
    const match = value.match(/(\d+):(\d+)/);
    return match ? ((Number(match[1]) % 12) + (value.includes("PM") ? 12 : 0)) * 60 + Number(match[2]) : 0;
}
function Agenda({ items }: {
    items: Item[];
}) {
    const columns = [{ title: "No date", color: "gray", rows: items.filter(x => x.day === null) }, { title: "This week", color: "blue", rows: [] }, { title: "Next week", color: "gray", rows: items.filter(x => x.day !== null && !x.done).sort((a, b) => (a.day ?? 0) - (b.day ?? 0) || timeInMinutes(a.time) - timeInMinutes(b.time)) }, { title: "Done", color: "green", rows: items.filter(x => x.done) }];
    return <div className="nv-planner-board nv-planner-agenda-board" aria-label="Agenda">{columns.map(col => <section className="nv-planner-board__column nv-planner-agenda-board__column" data-color={col.color} key={col.title}><header><span className="nv-planner-board__dot"/><h2>{col.title}</h2><span className="nv-planner-board__count">{col.rows.length}</span><Plus size={14}/></header><div className="nv-planner-board__rows">{col.title === "This week" && <><p className="nv-planner-agenda-board__sub is-today">Today</p><p className="nv-planner-agenda-board__none">Nothing due today.</p></>}{col.rows.map(item => <Card item={item} key={item.id}/>)}</div></section>)}</div>;
}
function Week({ items, dragging }: {
    items: Item[];
    dragging: boolean;
}) {
    return <div className="nv-planner-week-layout"><aside className="nv-planner-tray nv-planner-tray--column"><div className="nv-planner-tray__head"><ChevronDown /><strong>To schedule</strong><span>1</span></div><p className="nv-planner-tray__hint">Drag a card onto a day to give it a date.</p><Card item={BASE[4]}/></aside><div className="nv-planner-week-main"><div className="nv-planner-week">{[9, 10, 11, 12, 13, 14, 15].map((day, index) => <section className={`nv-planner-week__day${day === 10 && dragging ? " is-drop-target" : ""}`} data-planner-target={`day-${day}`} key={day}><header><span>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span><strong>{day}</strong><span>Nov</span><Plus size={14}/></header><div className="nv-planner-week__rows">{items.filter(item => item.day === day && !item.done).map(item => <Card item={item} compact key={item.id} target={item.id === "review" ? "week-task" : undefined} hidden={item.id === "review" && dragging}/>)}</div></section>)}</div></div></div>;
}
function Month({ items, open }: {
    items: Item[];
    open: () => void;
}) {
    // November 2026 starts on Sunday. The desktop calendar starts on Monday.
    const days = Array.from({ length: 42 }, (_, i) => { const date = new Date(Date.UTC(2026, 9, 26 + i)); return { day: date.getUTCDate(), outside: date.getUTCMonth() !== 10 }; });
    return <div className="nv-planner-month"><div className="nv-planner-month__weekdays">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <span key={d}>{d}</span>)}</div><div className="nv-planner-month__grid">{days.map(({ day, outside }, index) => <div key={index} className={`nv-planner-month__day${outside ? " is-outside" : ""}${day === 8 && !outside ? " is-today" : ""}`}><span className="nv-planner-month__date">{day}</span><span className="nv-planner-month__chips">{!outside && items.filter(x => x.day === day && !x.done).map(item => <button className="nv-planner-month__chip" data-priority={item.priority} data-kind={item.kind ?? "task"} data-planner-target={item.id === "review" ? "month-task" : undefined} type="button" onClick={open} key={item.id}>{item.title}</button>)}</span></div>)}</div></div>;
}
function Board({ items, stage, dragging }: {
    items: Item[];
    stage: string;
    dragging: boolean;
}) {
    const columns = [{ id: "open", name: "To do", color: "gray" }, { id: "doing", name: "In progress", color: "blue" }, { id: "done", name: "Done", color: "green" }];
    return <div className="nv-planner-board" aria-label="Board">{columns.map(col => { const rows = items.filter(item => item.id === "review" ? stage === col.id : (item.stage ?? (item.done ? "done" : "open")) === col.id); return <section className={`nv-planner-board__column${dragging && col.id === (stage === "open" ? "doing" : "done") ? " is-drop-target" : ""}`} data-color={col.color} data-planner-target={`stage-${col.id}`} data-board-stage={col.id} key={col.id}><header><GripVertical className="nv-planner-board__grip"/><span className="nv-planner-board__dot"/><h2>{col.name}</h2><span className="nv-planner-board__count">{rows.length}</span><Plus size={14}/><MoreHorizontal size={14}/></header><div className="nv-planner-board__rows">{rows.map(item => <Card item={item} target={item.id === "review" ? "board-task" : undefined} hidden={item.id === "review" && dragging} key={item.id}/>)}{!rows.length && <p className="nv-planner-board__empty">Drop cards here</p>}</div></section>; })}<section className="nv-planner-board__column nv-planner-board__column--add"><span className="nv-planner-board__add"><Plus />Add column</span></section></div>;
}
function Connected({ time, editing }: {
    time: number;
    editing: boolean;
}) {
    const note = editing || time >= 10100, pdf = editing || time >= 11900;
    return <section className="nv-planner-attachments"><div className="nv-planner-attachments__head"><p><Paperclip />Connected{note && <span>{pdf ? 2 : 1}</span>}</p><div><span className="nv-planner-link-button" data-planner-target="attach"><Plus />Add from vault</span></div></div>{note ? <ul className="nv-planner-attachments__list">{[DEVELOPMENT_NOTE_TITLE, ...(pdf ? ["API architecture.pdf"] : [])].map(title => <li key={title}><span className="nv-planner-attachment" data-planner-target={title === DEVELOPMENT_NOTE_TITLE ? "connected-note" : undefined}><DocumentIcon title={title}/><span className="nv-planner-attachment__text"><span>{title}</span><small>{title.endsWith(".pdf") ? "PDF" : "Note"}</small></span></span><X size={14}/></li>)}</ul> : <div className="nv-planner-attachments__empty"><Paperclip /><p>Connect the file, note, recording or link this is about.</p><span>Add from vault</span></div>}</section>;
}
function ItemSheet({ time, editing, close }: {
    time: number;
    editing: boolean;
    close: () => void;
}) {
    const title = editing ? TASK : TASK.slice(0, Math.max(0, Math.floor((time - 3200) / 75)));
    const dated = editing || time >= 6500;
    return <div className="nv-planner-sheet-layer"><div className="nv-planner-sheet-backdrop"/><section className="nv-planner-sheet" role="dialog" aria-label={editing ? "Edit planner task" : "Add to planner"}><header><div><p>{editing ? "Manual" : "New item"}</p><h2>{editing ? "Edit item" : "Add to planner"}</h2></div><button type="button" data-planner-target="sheet-close" onClick={close} aria-label="Close planner task"><X /></button></header><div className="nv-planner-sheet__body nv-planner-sheet__body--split"><div className="nv-planner-sheet__main"><label className="nv-planner-field nv-planner-field--title"><span>Title</span><input readOnly tabIndex={-1} value={title} placeholder="What needs doing?" data-planner-target="title"/></label><div className="nv-planner-sheet__row"><div className="nv-planner-segment"><button type="button" role="radio" aria-checked="true" tabIndex={-1}>Task</button><button type="button" role="radio" aria-checked="false" tabIndex={-1}>Event</button></div><label className="nv-planner-check"><input type="checkbox" checked={!dated} readOnly tabIndex={-1}/><span>All day</span></label></div><p className="nv-planner-sheet__hint">A task is something to get done, by a date if you add one.</p><div className="nv-planner-sheet__row nv-planner-sheet__row--dates"><label className="nv-planner-field"><span>Due</span><input type="date" readOnly tabIndex={-1} value={dated ? editing ? "2026-11-10" : "2026-11-09" : ""} data-planner-target="date"/></label>{dated && <label className="nv-planner-field"><span>Time</span><input type="time" readOnly tabIndex={-1} value={time >= 7200 ? "10:00" : "09:00"} data-planner-target="time"/></label>}</div><div className="nv-planner-sheet__row nv-planner-sheet__row--selects">{[["Repeats", "Never"], ["Priority", dated ? "High" : "None"], ["Status", "To do"]].map(([label, value]) => <label className="nv-planner-field" key={label}><span>{label}</span><select value={value} onChange={() => { }} tabIndex={-1}><option>{value}</option></select></label>)}</div><div className="nv-planner-field nv-planner-field--notes"><span className="nv-planner-field__label-row"><label>Notes</label><span>Expand</span></span><textarea readOnly tabIndex={-1} rows={3} value={time >= 7600 ? "Review validation, retry safety, and the migration plan before the staging release." : ""} placeholder="Anything to remember"/></div></div><div className="nv-planner-sheet__side"><Connected time={time} editing={editing}/></div></div><footer><span /><div><button type="button" onClick={close}>Cancel</button><button type="button" className="is-primary" data-planner-target="save" onClick={close}>{editing ? "Save" : "Add"}</button></div></footer></section></div>;
}
function Picker({ kind }: {
    kind: "note" | "pdf";
}) {
    return <div className="nv-planner-sheet-layer nv-planner-picker-layer"><div className="nv-planner-sheet-backdrop"/><section className="nv-planner-sheet nv-planner-picker" role="dialog" aria-label="Connect anything from your vault"><header><div><p>From your vault</p><h2>Connect anything</h2></div><X /></header><div className="nv-planner-picker__search"><Search /><input readOnly value="" placeholder="Search your vault" tabIndex={-1}/></div><div className="nv-planner-picker__list">{[DEVELOPMENT_NOTE_TITLE, "API architecture.pdf", "Release checklist"].filter(title => kind !== "pdf" || title !== DEVELOPMENT_NOTE_TITLE).map((title, index) => <div className="nv-planner-picker__row" key={title} data-planner-target={index === 0 ? `pick-${kind}` : undefined}><DocumentIcon title={title}/><span><strong>{title}</strong><small>Vault - Software Development</small></span></div>)}</div></section></div>;
}
export default function PlannerInterface({ active, time, view, dialog, picker, moved, stage, dragging, showView, seek }: {
    active: boolean;
    time: number;
    view: PlannerView;
    dialog: "create" | "edit" | null;
    picker: "note" | "pdf" | null;
    moved: boolean;
    stage: string;
    dragging: boolean;
    showView: (view: PlannerView) => void;
    seek: (time: number, resume?: boolean) => void;
}) {
    const items = plannerItemsAt(time, moved, stage);
    return <div className={`updv-dark ${styles.shell}`} data-planner-view={view}><DesktopSidebar active={active} page="planner" onOpenPlanner={() => seek(0)}/><div className={`nv-planner-tokens ${styles.page}`}><main className="nv-planner"><header className={`nv-recent-header nv-standard-page-header ${styles.header}`}><div><h1>Planner</h1><span>Your tasks and dates in one place, with the document behind each one.</span></div><div className="nv-planner__header-actions"><label className="nv-planner-narrow__search nv-planner__header-search"><Search /><input placeholder="Search your planner" readOnly tabIndex={-1}/></label><span className="nv-planner-pop__button"><ChartPie />Overview<ChevronDown /></span><span className="nv-planner-pop__button"><FileSearch />Plan from reminders<ChevronDown /></span><span className="nv-planner-pop__button"><Share /></span><span className={styles.info}><Info /></span></div></header><div className="nv-planner__content"><div className="nv-planner__toolbar"><div className="nv-planner-segment nv-planner-segment--views" role="tablist" aria-label="Planner view">{[{ id: "agenda", label: "Agenda", Icon: LayoutList }, { id: "week", label: "Week", Icon: Columns3 }, { id: "month", label: "Month", Icon: CalendarDays }, { id: "board", label: "Board", Icon: Rows3 }].map(({ id, label, Icon }) => <button key={id} type="button" role="tab" aria-selected={view === id} data-planner-target={`tab-${id}`} onClick={() => showView(id as PlannerView)}><Icon />{label}</button>)}</div>{(view === "week" || view === "month") && <div className="nv-planner__range"><span className={styles.rangeArrow}><ChevronLeft /></span><span>Today</span><span className={styles.rangeArrow}><ChevronRight /></span><span>{view === "week" ? "Nov 9 – Nov 15" : "November 2026"}</span></div>}<div className="nv-planner__toolbar-spacer"/><span className={styles.filter}><Filter />Filter<ChevronDown /></span><span className={styles.filter}><ArrowDownUp />Default<ChevronDown /></span></div><div className="nv-planner__quick-row"><div className="nv-planner-quick-add"><CalendarDays /><input placeholder={'Add a task, e.g. “Pay rent Friday”'} readOnly tabIndex={-1}/></div><button type="button" className="nv-planner__add" data-planner-target="new" onClick={() => seek(2700)}><Plus />New</button></div><div className="nv-planner__view">{view === "agenda" ? <Agenda items={items}/> : view === "week" ? <Week items={items} dragging={dragging}/> : view === "month" ? <Month items={items} open={() => seek(26500)}/> : <Board items={items} stage={stage} dragging={dragging}/>}</div></div><button type="button" className={styles.nova} data-planner-target="nova-open" aria-label="Open Planner Nova" onClick={() => seek(time >= 68000 ? 73500 : 44500)}><NovaRobot size={40} followPointer={false}/></button>{plannerNovaOpen(time) && <PlannerNovaDemo time={time} seek={seek}/>}{dialog && <ItemSheet time={time} editing={dialog === "edit"} close={() => seek(dialog === "edit" ? 29900 : 13200)}/>}{picker && <Picker kind={picker}/>}</main></div></div>;
}
