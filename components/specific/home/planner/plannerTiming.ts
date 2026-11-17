// Retimes the authored scenes together so views, cursor, proposals and seeking
// stay synchronized. Equal send/response markers remove simulated AI latency.
const markers = [
  [0, 0], [2400, 300], [13200, 8500], [14000, 9000],
  [16200, 9600], [16800, 9800], [18400, 9800], [19000, 10100],
  [20500, 10500], [23000, 11000], [25900, 11800], [28300, 12800],
  [29900, 13300], [31000, 13800], [33400, 14500], [35200, 14500],
  [35800, 14800], [38000, 15400], [39600, 15400], [40200, 15700],
  [43000, 16400], [44500, 17000], [45600, 17000], [54000, 19000],
  [56000, 19000], [62000, 23000], [62800, 23000], [63600, 23000],
  [64400, 23000], [65200, 23000], [68000, 23800], [73500, 25000],
  [74700, 25000], [81000, 26500], [83000, 26500], [89000, 29500],
  [89800, 29500], [90600, 29500], [91400, 29500], [94000, 30300],
  [100000, 35000], [106000, 40000],
] as const;

export function plannerTime(authoredMs: number): number {
  if (authoredMs <= 0) return 0;
  const index = markers.findIndex(([source]) => source >= authoredMs);
  if (index < 0) return markers[markers.length - 1][1];
  const [source, target] = markers[index];
  const [previousSource, previousTarget] = markers[index - 1];
  // Match the progress slider's 100ms granularity, including manual seeks.
  return Math.round((previousTarget + (authoredMs - previousSource) / (source - previousSource) * (target - previousTarget)) / 100) * 100;
}

export const PLANNER_DURATION = plannerTime(106000);
