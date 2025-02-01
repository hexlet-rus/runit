import {ApiClient, ApiResponse} from "./BaseApi";

export interface Snippet {
    id: number;
    name: string;
    code: string;
    language: 'ruby' | 'java' | 'php' | 'python' | 'javascript' | 'html';
}

export class SnippetsApi extends ApiClient {
    async getAllSnippets(): Promise<ApiResponse<Snippet[]>> {
        return this.requestApi<Snippet[]>('GET', '/api/snippets');
    }

    async createSnippet(name: string, code: string, language: Snippet['language']): Promise<ApiResponse<Snippet>> {
        return this.requestApi<Snippet>('POST', '/api/snippets', { name, code, language });
    }

    async getSnippetById(id: number): Promise<ApiResponse<Snippet>> {
        return this.requestApi<Snippet>('GET', `/api/snippets/${id}`);
    }

    async updateSnippet(id: number, name: string, code: string): Promise<ApiResponse<Snippet>> {
        return this.requestApi<Snippet>('PUT', `/api/snippets/${id}`, { name, code });
    }

    async deleteSnippet(id: number): Promise<ApiResponse<void>> {
        return this.requestApi<void>('DELETE', `/api/snippets/${id}`);
    }

    async generateSnippetName(): Promise<ApiResponse<{ name: string }>> {
        return this.requestApi<{ name: string }>('GET', '/api/snippets/name');
    }

    async getSnippetByUsernameAndSlug(username: string, slug: string): Promise<ApiResponse<Snippet>> {
        return this.requestApi<Snippet>('GET', `/api/snippets/${username}/${slug}`);
    }
}
