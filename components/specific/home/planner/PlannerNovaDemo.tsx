import { useEffect, useRef } from "react";
import { ArrowUp, Check, LoaderCircle, RotateCcw, Sparkles, X } from "lucide-react";
import NovaRobot from "./NovaRobot";
import { activeNovaBatch } from "./plannerProject";
import styles from "./PlannerInterface.module.css";

export const plannerNovaOpen = (time: number) => Boolean(activeNovaBatch(time));
export default function PlannerNovaDemo({ time, seek }: { time: number; seek: (time: number, resume?: boolean) => void }) {
    const batch = activeNovaBatch(time)!;
    const list = useRef<HTMLDivElement>(null);
    const sent = time >= batch.sentAt, response = time >= batch.responseAt, confirmed = time >= batch.confirmAt;
    const applied = batch.proposals.filter(proposal => time >= proposal.applyAt).length;
    const complete = applied === batch.proposals.length;
    const draft = time >= batch.draftAt ? batch.prompt : "";
    useEffect(() => { if (response) list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "instant" }); }, [batch.id, response, confirmed]);
    return <section className={`nv-planner-nova__panel ${styles.novaPanel}`} role="dialog" aria-label="Nova for your planner" data-nova-batch={batch.id}>
        <header className="nv-planner-nova__head"><span className="nv-planner-nova__badge"><NovaRobot size={28} followPointer={false}/></span><div><h2>Nova</h2><p>Ask about your planner, or tell Nova what to change.</p></div><button className="nv-planner-nova__icon" type="button" onClick={() => seek(batch.openAt)} aria-label="Restart Nova conversation"><RotateCcw/></button><button className="nv-planner-nova__icon" type="button" data-planner-target="nova-close" onClick={() => seek(batch.closeAt)} aria-label="Close Planner Nova"><X/></button></header>
        <div className="nv-planner-nova__list" ref={list}>
            {!sent && <div className="nv-planner-nova__empty"><p>Try asking Nova</p><div><button type="button" onClick={() => seek(batch.sentAt)}>{batch.id === "plan" ? "Plan several tasks and dates in one request" : "Update several tasks together"}</button></div></div>}
            {sent && <article className="nv-planner-nova__msg nv-planner-nova__msg--user"><p>{batch.prompt}</p></article>}
            {sent && !response && <div className="nv-planner-nova__status"><Sparkles/>Thinking…</div>}
            {response && <article className="nv-planner-nova__msg nv-planner-nova__msg--assistant"><p>{batch.response}</p><div className="nv-planner-nova__proposals">{batch.proposals.map(proposal => {
                const done = time >= proposal.applyAt;
                return <div key={proposal.id} data-planner-proposal={proposal.id} className={`nv-planner-nova__proposal is-${done ? "applied" : confirmed ? "applying" : "pending"}`}><span>{proposal.label}</span>{done ? <em><Check aria-hidden="true"/>Done</em> : confirmed ? <LoaderCircle className="animate-spin" aria-label="Applying"/> : <div><button type="button" onClick={() => seek(batch.closeAt)}>Dismiss</button><button type="button" className="is-primary" onClick={() => seek(batch.confirmAt, true)}>Confirm</button></div>}</div>;
            })}{!confirmed && <div className="nv-planner-nova__bulk"><button type="button" onClick={() => seek(batch.closeAt)}>Dismiss all</button><button type="button" className="is-primary" data-planner-target="nova-confirm-all" onClick={() => seek(batch.confirmAt, true)}>Confirm all {batch.proposals.length}</button></div>}</div>{confirmed && <p className="nv-planner-nova__status" role="status">{complete ? <Check/> : <LoaderCircle className="animate-spin"/>}{complete ? `All ${applied} changes applied.` : `Applying your changes… ${applied} of ${batch.proposals.length} complete`}</p>}</article>}
        </div>
        <div className="nv-planner-nova__composer"><textarea readOnly rows={3} value={sent ? "" : draft} data-planner-target="nova-compose" placeholder="Ask Nova about your planner…" aria-label="Planner Nova message"/><button type="button" data-planner-target="nova-send" aria-label="Send Planner Nova message" onClick={() => seek(batch.sentAt)}><ArrowUp/></button></div>
        <p className="nv-planner-nova__note">Each message uses credits. Nothing changes until you confirm.</p>
    </section>;
}
