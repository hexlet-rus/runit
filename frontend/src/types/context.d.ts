import { URL } from "url";
import { Languages, FetchedSnippet } from "./slices";

type SaveSnippetContext = (code: string, snippetName: string, template: Languages | string) => number;
type RenameSnippetContext = (id: number, data: { code: string, name: string }) => void;
type UpdateSnippetContext = (id: number, data: { code: string, name: string }) => void;
type DeleteSnippetContext = (ids: Array<number> | number) => void;
type GenEmbedFrameContext = (link: string) => `<iframe${string}>`;
type GenViewSnippetLinkContext = (username: string, slug: string) => string;
type GetSnippetDataContext = (id: number) => FetchedSnippet;
type GetSnippetDataByViewParamsContext = (data: { username: string, slug: string }) => FetchedSnippet;
type HasViewSnippetParamsContext = (data: { username: string, slug: string }) => string;
type GenEmbedSnippetLinkContext = (ownerUsername: string, slug: string) => string;
type getDefaultSnippetNameContext = () => Promise<string>;

export interface ICreateSnippetsContext {
  saveSnippet: SaveSnippetContext,
  renameSnippet: RenameSnippetContext,
  updateSnippet: UpdateSnippetContext,
  deleteSnippet: DeleteSnippetContext,
  genEmbedFrame: GenEmbedFrameContext,
  genViewSnippetLink: GenViewSnippetLinkContext,
  getSnippetData: GetSnippetDataContext,
  getSnippetDataByViewParams: GetSnippetDataByViewParamsContext,
  hasViewSnippetParams: HasViewSnippetParamsContext,
  genEmbedSnippetLink: GenEmbedSnippetLinkContext,
  getDefaultSnippetName: getDefaultSnippetNameContext
}