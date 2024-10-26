export const enum PRIORITIES {
 CRITICAL = "Critical",
 MODERATE = "Moderate",
 OPTIONAL = "Optional",
}

export const enum PRIORITY_ORDER {
 CRITICAL = 1,
 MODERATE = 2,
 OPTIONAL = 3,
}

export type TodoType = {
 id?: number;
 name: string;
 priority: number;
};

export const PRIORITY_NAMES = new Map([
 [1, PRIORITIES.CRITICAL],
 [2, PRIORITIES.MODERATE],
 [3, PRIORITIES.OPTIONAL],
]);
