import {APIRequestContext, Page} from '@playwright/test';
import {ApiFacade} from "../api";
import {AuthResponse} from "../api/AuthAPI";
import {expect} from "@playwright/test"
import {CreateUserDto, User} from "../api/UsersAPI";
import {step} from "../helpers/alluerStep";

export class AuthSteps {
    private api: ApiFacade;
    private readonly request: APIRequestContext;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.request = page.request;
        this.api = new ApiFacade(this.request);
    }

    @step('Авторизация чере апи: $0')
    async signIn(email: string, password: string): Promise<AuthResponse> {
        const res = await this.api.authApi.signIn({email, password});
        expect(res.status).toBe(200);

        return res.data;
    }

    @step('Регистрация через апи $0')
    async signUp(data: CreateUserDto): Promise<User> {
        const res = await this.api.usersApi.createUser(data)
        expect(res.status).toBe(201)

        return res.data;
    }

    @step('Очистка кук')
    async signOut(): Promise<void> {
        await this.page.context().clearCookies();
    }
}
