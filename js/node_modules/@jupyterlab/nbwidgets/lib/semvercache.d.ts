/**
 * A cache using semver ranges to retrieve values.
 */
export declare class SemVerCache<T> {
    set(key: string, version: string, object: T): void;
    get(key: string, semver: string): T;
    private _cache;
}
