import {APIRequestContext, APIResponse} from '@playwright/test';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export class ApiClient {
    protected request: APIRequestContext;
    protected baseUrl: string;
    protected token: string | null;

    constructor(request: APIRequestContext, baseUrl: string, token: string | null = null) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.token = token;
    }

    protected async requestApi<T>(
        method: HttpMethod,
        endpoint: string,
        data?: Record<string, any>,
        auth: boolean = true
    ): Promise<ApiResponse<T>> {
        const headers: Record<string, string> = {'Content-Type': 'application/json'};
        let body: string;

        if (auth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        if (data) {
            body = JSON.stringify(data);
        }

        const response: APIResponse = await this.request.fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers,
            data: body,
        });


        const responseBody = await response.json();
        return {
            data: response.ok ? responseBody : undefined,
            error: response.ok ? undefined : responseBody.message || response.statusText,
            status: response.status(),
        };
    }
}
