import { INotebookModel } from './model';
/**
 * Trust the notebook after prompting the user.
 *
 * @param model - The notebook model.
 *
 * @param host - The host node for the confirmation dialog (defaults to body).
 *
 * @returns a promise that resolves when the transaction is finished.
 *
 * #### Notes
 * No dialog will be presented if the notebook is already trusted.
 */
export declare function trustNotebook(model: INotebookModel, host?: HTMLElement): Promise<void>;
