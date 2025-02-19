import {ApiClient, ApiResponse} from "./BaseApi";

export interface AuthResponse {
    token: string;
}

export interface SignInDto {
    email: string;
    password: string;
}

export class AuthApi extends ApiClient {
    async signIn(credentials: SignInDto): Promise<ApiResponse<AuthResponse>> {
        const response = await this.requestApi<AuthResponse>('POST', '/api/signin', credentials, false);
        if (response.data?.token) {
            this.token = response.data.token;
        }
        return response;
    }

    async signOut(): Promise<ApiResponse<void>> {
        return this.requestApi<void>('POST', '/api/signout');
    }

    async signInWithGitHub(code: string): Promise<ApiResponse<AuthResponse>> {
        return this.requestApi<AuthResponse>('GET', `/api/oauth?code=${code}`, undefined, false);
    }
}
