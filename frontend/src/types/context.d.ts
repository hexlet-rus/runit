import type { UseQueryResult } from "@tanstack/react-query";
import { Languages, FetchedSnippet } from "./slices";
import { TRPCClientErrorLike } from "@trpc/client";
import { NewSnippet } from "../../../src/db/schema/schema";

interface TemporaryType {
    id?: number;
    slug?: string;
    name?: string;
    code?: string;
    language?: Languages | string | null;
    userId?: number;
    created_at?: string;
    updated_at?: string;
}

type SaveSnippetContext = (code: string, snippetName: string, template: Languages | string) => Promise<number>;
type RenameSnippetContext = (id: number, data: { code: string, name: string }) => void;
type UpdateSnippetContext = (id: number, data: { code: string, name: string }) => void;
type DeleteSnippetContext = (ids: Array<number> | number) => Promise<{ success: boolean, ids: number[] | number }>;
type GenEmbedFrameContext = (link: string) => string;
type GenViewSnippetLinkContext = (username: string, slug: string) => string;
type GetSnippetDataContext = (id: number) => FetchedSnippet | TRPCClientErrorLike;
type GetSnippetDataByViewParamsContext = (data: { username: string, slug: string }) => FetchedSnippet | TRPCClientErrorLike;
type HasViewSnippetParamsContext = (data: { username: string, slug: string }) => boolean;
type GenEmbedSnippetLinkContext = (ownerUsername: string, slug: string) => string;
type getDefaultSnippetNameContext = () => string;


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
  getDefaultSnippetName: GetDefaultSnippetNameContext
}