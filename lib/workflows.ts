export const workflowStages = ["Capture", "Organize", "Connect", "Plan", "Act"] as const;
export type WorkflowStage = (typeof workflowStages)[number];
export type WorkflowStep = {
  stage: WorkflowStage;
  title: string;
  copy: string;
  artifact: string;
  detail: string;
  demo: "capture" | "vault-map-demo" | "planner-demo" | "reminders-demo";
};
export type WorkflowReminder = {
  source: string;
  dateLabel: string;
  date: string;
  title: string;
  remindAt: string;
  leadTime: string;
};
export type Workflow = {
  id: string;
  label: string;
  audience: string;
  summary: string;
  description: string;
  project: string;
  featured: boolean;
  materials: [string, string, string];
  reminder?: WorkflowReminder;
  steps: WorkflowStep[];
};

type WorkflowExample = Omit<Workflow, "steps" | "materials"> & {
  sources: [string, string, string];
  capture: string;
  organize: string;
  question: string;
  task: string;
  plan: string;
  result: string;
};

function defineWorkflow(example: WorkflowExample): Workflow {
  const { sources, capture, organize, question, task, plan, result, reminder, ...workflow } = example;
  return {
    ...workflow,
    materials: sources,
    reminder,
    steps: [
      { stage: "Capture", title: "Bring the starting material together.", copy: capture, artifact: sources[0], detail: `Also saved: ${sources[1]} and ${sources[2]}.`, demo: "capture" },
      { stage: "Organize", title: "Make the useful details easier to find.", copy: organize, artifact: `${workflow.project} · Organized material`, detail: reminder ? `AI-detected date in ${reminder.source}: ${reminder.dateLabel}, ${reminder.date}. Review it against the source.` : `${sources.join(" · ")} — with summaries and searchable context.`, demo: "capture" },
      { stage: "Connect", title: "See how the pieces fit.", copy: `Bring the related items into a Vault Map. Ask Nova: “${question}” Review the answer alongside your source material.`, artifact: `${workflow.project} · Vault Map`, detail: `${sources[0]} → connects to → ${sources[1]} → supports → ${sources[2]}`, demo: "vault-map-demo" },
      { stage: "Plan", title: reminder ? "Review the date. Choose when it returns." : "Give the next step a place in your plan.", copy: reminder ? `${plan} The reminder and Planner task are separate choices.` : `${plan} Attach the relevant source items to the task. If Nova proposes changes, review and confirm them before they apply.`, artifact: task, detail: reminder ? `Detected date: ${reminder.date}. Reminder: ${reminder.remindAt}. Optional Planner task: ${task}.` : `Supporting items: ${sources[0]} + ${sources[1]}.`, demo: "planner-demo" },
      { stage: "Act", title: reminder ? "Return to the commitment before it is due." : "Follow through with the context at hand.", copy: result, artifact: reminder ? reminder.title : `Completed · ${task}`, detail: reminder ? `${reminder.dateLabel}: ${reminder.date}. Return to ${reminder.source} when the reminder resurfaces it.` : `The next step is done. Your ${workflow.project.toLowerCase()} notes and supporting items remain connected.`, demo: reminder ? "reminders-demo" : "planner-demo" },
    ],
  };
}

export const workflows: Workflow[] = [
  defineWorkflow({
    id: "study-smarter", label: "Study smarter", audience: "Students & Educators", featured: true,
    summary: "Notes, lectures, assignments, and deadlines",
    description: "Connect course materials and study plans, surface assignment dates from your documents, and set reminders so deadlines do not slip past.",
    project: "Biology assignment", sources: ["Cell biology lecture note", "Assignment brief", "Revision notes"],
    capture: "Save your assignment brief with its submission deadline, lecture notes and revision material. The important date is already in the document you need to keep.",
    organize: "AI helps organize your course materials and identifies the assignment due date in the brief. Review the detected date against the original document.",
    question: "Which concepts in these notes relate to the assignment?",
    task: "Draft the biology assignment outline",
    plan: "Review the detected deadline and set a reminder two days before it. If you want to schedule study time, create a Planner task to draft your outline with the brief attached.",
    result: "The reminder brings your assignment brief back two days before submission. Revisit the requirements and your notes, then finish the work with time to spare—even if you never created a task.",
    reminder: { source: "Assignment brief", dateLabel: "Assignment due", date: "27 Nov 2026", title: "Biology assignment due", remindAt: "25 Nov 2026", leadTime: "2 days before" },
  }),
  defineWorkflow({
    id: "organize-research", label: "Organize research", audience: "Researchers & Academics", featured: true,
    summary: "Papers, references, evidence, and projects",
    description: "Connect papers and evidence to a research question, keep submission dates in view, and choose reminders alongside your research plan.",
    project: "Literature review", sources: ["Research paper", "Submission guidelines", "Literature review outline"],
    capture: "Import a research paper and the submission guidelines containing the deadline. Keep your review outline with the sources you will use to write it.",
    organize: "AI helps organize the research material and identifies the submission deadline in the guidelines. Check the detected date before deciding when to be reminded.",
    question: "Where do these sources agree, and what questions remain open?",
    task: "Compare the methods in three papers",
    plan: "Set a reminder a week before the submission deadline you reviewed. You can also create a Planner task to compare the papers, with the guidelines and evidence attached.",
    result: "A week before submission, the reminder returns you to the guidelines. Check what is still needed and revisit the papers and outline before sending your work.",
    reminder: { source: "Submission guidelines", dateLabel: "Submission deadline", date: "30 Nov 2026", title: "Research submission due", remindAt: "23 Nov 2026", leadTime: "1 week before" },
  }),
  defineWorkflow({
    id: "manage-work", label: "Manage work", audience: "Working Professionals", featured: true,
    summary: "Meetings, documents, projects, and follow-ups",
    description: "Keep contracts and meeting notes connected, find renewal dates in the documents you save, and return to commitments before they become urgent.",
    project: "Client renewal", sources: ["Client contract", "Client meeting note", "Renewal brief"],
    capture: "Save the client contract containing its renewal date. Keep the meeting note and renewal brief alongside it, so the commitment has its supporting context.",
    organize: "AI helps organize the client records and identifies the contract’s renewal date. Review it in the source contract rather than relying on memory.",
    question: "What should I review before renewing this client contract?",
    task: "Review the client renewal",
    plan: "Set a reminder two weeks before the renewal date you reviewed. If you need time for the review, create a separate Planner task with the contract and meeting note attached.",
    result: "The reminder brings the contract back before renewal. Open the source, review the terms and follow up with the client while there is still time to make a decision.",
    reminder: { source: "Client contract", dateLabel: "Contract renewal", date: "15 Dec 2026", title: "Client contract renewal", remindAt: "1 Dec 2026", leadTime: "2 weeks before" },
  }),
  defineWorkflow({
    id: "develop-ideas", label: "Develop ideas", audience: "Freelancers & Creators", featured: true,
    summary: "Creative references, notes, drafts, and plans",
    description: "Connect a creative brief with inspiration and drafts, surface its review date, and use reminders and optional Planner tasks to keep production moving.",
    project: "Campaign concept", sources: ["Creative brief", "Visual references", "Concept notes"],
    capture: "Save the creative brief with its client-review date. Collect visual references and capture rough concept notes beside the brief.",
    organize: "AI helps organize your references and identifies the review date in the creative brief. Check that date alongside the project requirements.",
    question: "Which ideas in these notes best fit the brief?",
    task: "Draft three campaign concepts",
    plan: "Set a reminder three days before the client review. If you want a production schedule, create a Planner task for the concepts and attach the brief and references.",
    result: "The reminder resurfaces the brief before the creative milestone. Check your concepts against the requirements and prepare the review materials, with the original inspiration close at hand.",
    reminder: { source: "Creative brief", dateLabel: "Client review", date: "4 Dec 2026", title: "Campaign concept review", remindAt: "1 Dec 2026", leadTime: "3 days before" },
  }),
  defineWorkflow({
    id: "organize-my-life", label: "Organize my life", audience: "Personal Life & Planning", featured: true,
    summary: "Personal records, trips, dates, and renewals",
    description: "Keep personal documents and bookings connected, surface expiry dates, and choose when a reminder should bring an important record back to your attention.",
    project: "Travel readiness", sources: ["Passport copy", "Travel booking", "Trip preparation note"],
    capture: "Save a passport copy containing its expiry date, your travel booking and a preparation note. A date you could forget is now part of the material you keep.",
    organize: "AI helps organize the travel material and identifies the passport’s expiry date. Review it in the document before choosing a reminder schedule.",
    question: "What personal documents should I review before this trip?",
    task: "Review passport renewal",
    plan: "Set a reminder three months before the passport expiry date you reviewed. You can keep just that reminder, or create a Planner task to work through renewal preparations.",
    result: "Your chosen reminder brings the passport back before it expires, even if you never made a task. Open the document and review your renewal options before it slips your mind.",
    reminder: { source: "Passport copy", dateLabel: "Passport expires", date: "15 Sep 2027", title: "Passport expiry approaching", remindAt: "15 Jun 2027", leadTime: "3 months before" },
  }),
  defineWorkflow({
    id: "build-projects", label: "Build projects", audience: "Developers & Technical Professionals", featured: true,
    summary: "Technical specifications, decisions, and tasks",
    description: "Connect specifications and technical decisions with implementation work, surface release dates from project documents, and choose reminders before important milestones.",
    project: "API integration", sources: ["Integration specification", "Architecture decision note", "Release plan"],
    capture: "Save the integration specification, architecture note and release plan containing the target release date. Keep the milestone with the decisions behind it.",
    organize: "AI helps organize the technical material and identifies the target release date in the release plan. Check that date against the current project documents.",
    question: "Which requirements and open questions affect this integration?",
    task: "Review integration readiness",
    plan: "Set a reminder a week before the release date you reviewed. If you want to schedule the readiness review, create a Planner task and attach the specification and architecture note.",
    result: "Before the release milestone, the reminder resurfaces the release plan. Revisit the requirements and decisions, check readiness and act on what still needs attention.",
    reminder: { source: "Release plan", dateLabel: "Target release", date: "11 Dec 2026", title: "API release approaching", remindAt: "4 Dec 2026", leadTime: "1 week before" },
  }),
  defineWorkflow({
    id: "run-a-business", label: "Run a business", audience: "Business Owners & Teams", featured: false,
    summary: "Customer records, procedures, proposals, and delivery",
    description: "Organize the information behind your business commitments in your own workspace, from customer discussions and procedures to proposals and delivery tasks.",
    project: "Customer delivery", sources: ["Customer discussion note", "Delivery procedure", "Proposal draft"],
    capture: "Save your customer discussion note, delivery procedure, and working proposal in your own vault.",
    organize: "Use AI to help summarize the customer’s needs and organize your operating documents, so you can find the right context when planning work.",
    question: "What delivery commitments appear in these notes and documents?",
    task: "Prepare the customer delivery plan",
    plan: "Create a Planner task to prepare the delivery plan and schedule a follow-up with the customer.",
    result: "Review the customer requirements and your procedure, prepare the delivery plan, and complete the task. Keep the original information available for follow-up.",
  }),
  defineWorkflow({
    id: "keep-learning", label: "Keep learning", audience: "Knowledge Workers & Lifelong Learners", featured: false,
    summary: "Articles, videos, courses, and learning projects",
    description: "Bring saved articles, videos, and course notes into a connected learning project. Turn a useful idea into something you can practice and finish.",
    project: "Photography practice", sources: ["Photography course note", "Saved tutorial", "Practice ideas"],
    capture: "Save a tutorial link and course note. Add a short note with the ideas you want to try during your next practice session.",
    organize: "Use AI to help summarize your learning material and organize saved resources. Keep the ideas you want to practice easy to revisit.",
    question: "Which techniques in these notes could I practice next?",
    task: "Practice three composition techniques",
    plan: "Schedule a practice session in Planner and decide which techniques to try first.",
    result: "Open your task, revisit the tutorial and notes, and try the techniques. Add a reflection note and mark the session complete.",
  }),
];

export const featuredWorkflows = workflows.filter((workflow) => workflow.featured);
export function getWorkflow(id: string) {
  return workflows.find((workflow) => workflow.id === id);
}
