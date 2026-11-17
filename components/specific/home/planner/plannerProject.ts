import { plannerTime as at } from "./plannerTiming";

export type PlannerItem = {
    id: string;
    title: string;
    day: number | null;
    time: string;
    priority: "high" | "medium" | "none";
    kind?: "event";
    repeat?: boolean;
    done?: boolean;
    attachments?: number;
    source?: string;
    stage?: "open" | "doing" | "done";
};
export const BASE_ITEMS: PlannerItem[] = [
    { id: "tests", title: "Write retry and idempotency tests", day: 11, time: "11:00 AM", priority: "high", source: "API architecture.pdf" },
    { id: "sync", title: "Weekly engineering sync", day: 9, time: "9:00 AM – 9:30 AM", priority: "none", kind: "event", repeat: true },
    { id: "design", title: "API design review", day: 12, time: "2:00 PM – 3:00 PM", priority: "medium", kind: "event" },
    { id: "staging", title: "Deploy the API to staging", day: 13, time: "3:00 PM", priority: "high" },
    { id: "metrics", title: "Choose queue monitoring metrics", day: null, time: "", priority: "none" },
    { id: "spec", title: "Draft the API specification", day: 6, time: "All day", priority: "none", done: true },
];
type Proposal = {
    id: string;
    type: "CREATE_ITEM" | "UPDATE_ITEM" | "MOVE_TO_STAGE" | "COMPLETE_ITEM";
    label: string;
    applyAt: number;
    item?: PlannerItem;
    itemId?: string;
    patch?: Partial<PlannerItem>;
};
export const NOVA_BATCHES: {
    id: string; openAt: number; draftAt: number; sentAt: number; responseAt: number;
    confirmAt: number; closeAt: number; prompt: string; response: string; proposals: Proposal[];
}[] = [
    {
        id: "plan", openAt: at(44500), draftAt: at(45600), sentAt: at(54000), responseAt: at(56000),
        confirmAt: at(62000), closeAt: at(68000),
        prompt: "Create Test duplicate API requests for Nov 12 at 11 AM and Review staging logs for Nov 13 at 2 PM. Add a release-readiness review on Nov 13, 4–4:30 PM, and move the staging deployment to Nov 16 at 10 AM.",
        response: "I’ve prepared four changes: two tasks, a review event, and a rescheduled deployment. Review them together, then confirm the whole batch once.",
        proposals: [
            { id: "create-tests", type: "CREATE_ITEM", label: "Create Test duplicate API requests · Nov 12, 11:00 AM", applyAt: at(62800), item: { id: "nova-tests", title: "Test duplicate API requests", day: 12, time: "11:00 AM", priority: "high" } },
            { id: "create-logs", type: "CREATE_ITEM", label: "Create Review staging logs · Nov 13, 2:00 PM", applyAt: at(63600), item: { id: "nova-logs", title: "Review staging logs", day: 13, time: "2:00 PM", priority: "medium" } },
            { id: "create-review", type: "CREATE_ITEM", label: "Add Release-readiness review · Nov 13, 4:00–4:30 PM", applyAt: at(64400), item: { id: "nova-readiness", title: "Release-readiness review", day: 13, time: "4:00 PM – 4:30 PM", priority: "medium", kind: "event" } },
            { id: "reschedule-staging", type: "UPDATE_ITEM", label: "Reschedule Deploy the API to staging · Nov 13 → Nov 16, 10:00 AM", applyAt: at(65200), itemId: "staging", patch: { day: 16, time: "10:00 AM" } },
        ],
    },
    {
        id: "progress", openAt: at(73500), draftAt: at(74700), sentAt: at(81000), responseAt: at(83000),
        confirmAt: at(89000), closeAt: at(94000),
        prompt: "Move Test duplicate API requests and Review staging logs to In progress, and mark Write retry and idempotency tests complete.",
        response: "I’ll move both tasks to In progress and complete the retry-and-idempotency task. One confirmation applies all three changes.",
        proposals: [
            { id: "move-tests", type: "MOVE_TO_STAGE", label: "Move Test duplicate API requests → In progress", applyAt: at(89800), itemId: "nova-tests", patch: { stage: "doing" } },
            { id: "move-logs", type: "MOVE_TO_STAGE", label: "Move Review staging logs → In progress", applyAt: at(90600), itemId: "nova-logs", patch: { stage: "doing" } },
            { id: "complete-retries", type: "COMPLETE_ITEM", label: "Complete Write retry and idempotency tests", applyAt: at(91400), itemId: "tests", patch: { done: true, stage: "done" } },
        ],
    },
];
export function plannerItemsAt(time: number, moved: boolean, stage: string): PlannerItem[] {
    let items: PlannerItem[] = [...BASE_ITEMS, ...(time >= at(13200) ? [{ id: "review", title: "Review API architecture", day: moved ? 10 : 9, time: "10:00 AM", priority: "high" as const, attachments: 2, done: stage === "done" }] : [])];
    for (const batch of NOVA_BATCHES) for (const proposal of batch.proposals) {
        if (time < proposal.applyAt) continue;
        if (proposal.item) items = [...items.filter(item => item.id !== proposal.item!.id), proposal.item];
        else items = items.map(item => item.id === proposal.itemId ? { ...item, ...proposal.patch } : item);
    }
    // Put the new batch together where its results are visible on the board.
    return [...items.filter(item => item.id.startsWith("nova-")), ...items.filter(item => !item.id.startsWith("nova-"))];
}
export const activeNovaBatch = (time: number) => NOVA_BATCHES.find(batch => time >= batch.openAt && time < batch.closeAt);
