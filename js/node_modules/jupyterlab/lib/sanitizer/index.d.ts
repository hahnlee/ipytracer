export interface ISanitizer {
    /**
     * Sanitize an HTML string.
     */
    sanitize(dirty: string): string;
}
/**
 * The default instance of an `ISanitizer` meant for use by user code.
 */
export declare const defaultSanitizer: ISanitizer;
