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
      { stage: "Capture", title: "Save your material.", copy: capture, artifact: sources[0], detail: `Also saved: ${sources[1]} and ${sources[2]}.`, demo: "capture" },
      { stage: "Organize", title: "Find the key details.", copy: organize, artifact: `${workflow.project} · Organized material`, detail: reminder ? `AI-detected date in ${reminder.source}: ${reminder.dateLabel}, ${reminder.date}. Review it against the source.` : `${sources.join(" · ")} — with summaries and searchable context.`, demo: "capture" },
      { stage: "Connect", title: "Connect your sources.", copy: `Connect your sources on a Vault Map. Ask Nova: “${question}”`, artifact: `${workflow.project} · Vault Map`, detail: `${sources[0]} → connects to → ${sources[1]} → supports → ${sources[2]}`, demo: "vault-map-demo" },
      { stage: "Plan", title: reminder ? "Choose a reminder. Plan a task if needed." : "Schedule your next step.", copy: plan, artifact: task, detail: reminder ? `Detected date: ${reminder.date}. Reminder: ${reminder.remindAt}. Optional Planner task: ${task}.` : `Supporting items: ${sources[0]} + ${sources[1]}.`, demo: "planner-demo" },
      { stage: "Act", title: reminder ? "Act before the deadline." : "Finish with your sources at hand.", copy: result, artifact: reminder ? reminder.title : `Completed · ${task}`, detail: reminder ? `${reminder.dateLabel}: ${reminder.date}. Return to ${reminder.source} when the reminder resurfaces it.` : `The next step is done. Your ${workflow.project.toLowerCase()} notes and supporting items remain connected.`, demo: reminder ? "reminders-demo" : "planner-demo" },
    ],
  };
}

export const workflows: Workflow[] = [
  defineWorkflow({
    id: "study-smarter", label: "Study smarter", audience: "Students & Educators", featured: true,
    summary: "Notes, lectures, assignments, and deadlines",
    description: "Keep lecture notes and assignment briefs together. Find due dates, set reminders and plan study time.",
    project: "Biology assignment", sources: ["Cell biology lecture note", "Assignment brief", "Revision notes"],
    capture: "Save your lecture notes, assignment brief and revision notes in one place.",
    organize: "AI summarizes and sorts your material, and finds the due date in the assignment brief.",
    question: "Which ideas in my notes help answer this assignment?",
    task: "Draft the biology assignment outline",
    plan: "Check the due date and set a reminder. Add a study task in Planner if you need one.",
    result: "Get a reminder two days before submission. Open the brief and check what is left to finish.",
    reminder: { source: "Assignment brief", dateLabel: "Assignment due", date: "27 Nov 2026", title: "Biology assignment due", remindAt: "25 Nov 2026", leadTime: "2 days before" },
  }),
  defineWorkflow({
    id: "organize-research", label: "Organize research", audience: "Researchers & Academics", featured: true,
    summary: "Papers, references, evidence, and projects",
    description: "Compare papers, connect evidence and keep submission deadlines in view.",
    project: "Literature review", sources: ["Research paper", "Submission guidelines", "Literature review outline"],
    capture: "Save your paper, submission guidelines and review outline together.",
    organize: "AI summarizes the material and finds the submission deadline in the guidelines.",
    question: "Where do these sources agree or disagree?",
    task: "Compare the methods in three papers",
    plan: "Review the deadline and set a reminder. Add a task to compare the papers if needed.",
    result: "Get a reminder a week before submission. Open the guidelines and check your review is ready.",
    reminder: { source: "Submission guidelines", dateLabel: "Submission deadline", date: "30 Nov 2026", title: "Research submission due", remindAt: "23 Nov 2026", leadTime: "1 week before" },
  }),
  defineWorkflow({
    id: "manage-work", label: "Manage work", audience: "Working Professionals", featured: true,
    summary: "Meetings, documents, projects, and follow-ups",
    description: "Keep contracts and meeting notes together. Track renewal dates and plan follow-ups.",
    project: "Client renewal", sources: ["Client contract", "Client meeting note", "Renewal brief"],
    capture: "Save the client contract, meeting note and renewal brief together.",
    organize: "AI summarizes the records and finds the renewal date in the contract.",
    question: "What should I check before renewing this contract?",
    task: "Review the client renewal",
    plan: "Check the renewal date and set a reminder. Add a contract-review task if needed.",
    result: "Get a reminder before the contract renews. Open it and review the terms.",
    reminder: { source: "Client contract", dateLabel: "Contract renewal", date: "15 Dec 2026", title: "Client contract renewal", remindAt: "1 Dec 2026", leadTime: "2 weeks before" },
  }),
  defineWorkflow({
    id: "develop-ideas", label: "Develop ideas", audience: "Freelancers & Creators", featured: true,
    summary: "Creative references, notes, drafts, and plans",
    description: "Turn briefs, references and rough ideas into a plan. Keep creative deadlines in view.",
    project: "Campaign concept", sources: ["Creative brief", "Visual references", "Concept notes"],
    capture: "Save the creative brief, visual references and rough concept notes together.",
    organize: "AI summarizes the brief and finds the client-review date.",
    question: "Which ideas fit this brief?",
    task: "Draft three campaign concepts",
    plan: "Set a reminder before the client review. Add a task to draft your concepts if needed.",
    result: "Get a reminder before the review. Open the brief and check your concepts against it.",
    reminder: { source: "Creative brief", dateLabel: "Client review", date: "4 Dec 2026", title: "Campaign concept review", remindAt: "1 Dec 2026", leadTime: "3 days before" },
  }),
  defineWorkflow({
    id: "organize-my-life", label: "Organize my life", audience: "Personal Life & Planning", featured: true,
    summary: "Personal records, trips, dates, and renewals",
    description: "Keep personal documents and bookings together. Find expiry dates and set reminders.",
    project: "Travel readiness", sources: ["Passport copy", "Travel booking", "Trip preparation note"],
    capture: "Save your passport copy, travel booking and trip notes together.",
    organize: "AI organizes your travel documents and finds the passport expiry date.",
    question: "Which documents should I check before this trip?",
    task: "Review passport renewal",
    plan: "Check the expiry date and choose a reminder. Add a renewal task only if you need one.",
    result: "Get a reminder before your passport expires. Open the document and plan your renewal.",
    reminder: { source: "Passport copy", dateLabel: "Passport expires", date: "15 Sep 2027", title: "Passport expiry approaching", remindAt: "15 Jun 2027", leadTime: "3 months before" },
  }),
  defineWorkflow({
    id: "build-projects", label: "Build projects", audience: "Developers & Technical Professionals", featured: true,
    summary: "Technical specifications, decisions, and tasks",
    description: "Connect specs, technical decisions and release plans. Track deadlines and plan the work.",
    project: "API integration", sources: ["Integration specification", "Architecture decision note", "Release plan"],
    capture: "Save the integration spec, architecture note and release plan together.",
    organize: "AI summarizes the technical material and finds the target release date.",
    question: "Which requirements and open questions affect this integration?",
    task: "Review integration readiness",
    plan: "Set a reminder before release day. Add a readiness-review task with the spec attached if needed.",
    result: "Get a reminder before release day. Open the plan and check what still needs attention.",
    reminder: { source: "Release plan", dateLabel: "Target release", date: "11 Dec 2026", title: "API release approaching", remindAt: "4 Dec 2026", leadTime: "1 week before" },
  }),
  defineWorkflow({
    id: "run-a-business", label: "Run a business", audience: "Business Owners & Teams", featured: false,
    summary: "Customer records, procedures, proposals, and delivery",
    description: "Keep customer notes, procedures and proposals together. Plan delivery with the details attached.",
    project: "Customer delivery", sources: ["Customer discussion note", "Delivery procedure", "Proposal draft"],
    capture: "Save the customer discussion, delivery procedure and proposal in your vault.",
    organize: "AI summarizes the customer’s needs and sorts your documents so they are easier to find.",
    question: "What have we committed to deliver?",
    task: "Prepare the customer delivery plan",
    plan: "Add a delivery task in Planner and attach the proposal. Confirm any changes Nova suggests.",
    result: "Open the task, check the customer requirements and finish the delivery plan.",
  }),
  defineWorkflow({
    id: "keep-learning", label: "Keep learning", audience: "Knowledge Workers & Lifelong Learners", featured: false,
    summary: "Articles, videos, courses, and learning projects",
    description: "Save tutorials and course notes. Connect useful ideas and make time to practice.",
    project: "Photography practice", sources: ["Photography course note", "Saved tutorial", "Practice ideas"],
    capture: "Save a tutorial link, course note and ideas you want to try.",
    organize: "AI summarizes and sorts your learning material so it is easy to revisit.",
    question: "Which techniques could I practice next?",
    task: "Practice three composition techniques",
    plan: "Schedule a practice session in Planner and attach your notes. Confirm any changes Nova suggests.",
    result: "Open your notes, try the techniques and mark the session done.",
  }),
];

export const featuredWorkflows = workflows.filter((workflow) => workflow.featured);
export function getWorkflow(id: string) {
  return workflows.find((workflow) => workflow.id === id);
}
