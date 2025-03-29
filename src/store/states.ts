import { signal } from "@preact/signals-react";

// a state to store comparing values
export const compareArray = signal<string[]>([])
// state for storing the refs(use sets causing it stored only unique refs)
export const CardRefs = signal<Set<HTMLDivElement>>(new Set())
