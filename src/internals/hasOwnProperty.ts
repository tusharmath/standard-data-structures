/**
 * Type guard for hasOwnProperty
 */
export const hasOwnProperty = <K extends string | number>(o: unknown, k: K): o is {
    [k0 in K]: unknown;
} => typeof o === 'object' && o !== null && o.hasOwnProperty(k)
