import {ApiClient, ApiResponse} from "./BaseApi";

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
}

export class UsersApi extends ApiClient {
    async getAllUsers(): Promise<ApiResponse<User[]>> {
        return this.requestApi<User[]>('GET', '/api/users');
    }

    async getUserById(id: number): Promise<ApiResponse<User>> {
        return this.requestApi<User>('GET', `/api/users/${id}`);
    }

    async getUserByUsername(username: string): Promise<ApiResponse<User>> {
        return this.requestApi<User>('GET', `/api/users/${username}`);
    }

    async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
        return this.requestApi<User>('POST', '/api/users', userData, false);
    }

    async updateUser(id: number, userData: Partial<CreateUserDto>): Promise<ApiResponse<User>> {
        return this.requestApi<User>('PUT', `/api/users/${id}`, userData);
    }

    async deleteUser(id: number): Promise<ApiResponse<void>> {
        return this.requestApi<void>('DELETE', `/api/users/${id}`);
    }

    async getProfile(): Promise<ApiResponse<User>> {
        return this.requestApi<User>('GET', '/api/users/profile');
    }

    async recoverUser(email: string, frontendUrl: string): Promise<ApiResponse<{ hash: string }>> {
        return this.requestApi<{ hash: string }>('POST', '/api/users/recover', { email, frontendUrl }, false);
    }

    async checkRecoveryHash(hash: string): Promise<ApiResponse<void>> {
        return this.requestApi<void>('GET', `/api/users/recover/${hash}`);
    }

    async resetPassword(hash: string, password: string): Promise<ApiResponse<void>> {
        return this.requestApi<void>('POST', `/api/users/recover/${hash}`, { password });
    }
}
