import {APIRequestContext} from "@playwright/test";
import {AuthApi} from "./AuthAPI";
import {UsersApi} from "./UsersAPI";
import {SnippetsApi} from "./SnipetsAPI";
import playwrightConfig from "../../playwright.config";

export class ApiFacade {
    authApi: AuthApi;
    usersApi: UsersApi;
    snippetsApi: SnippetsApi;
    token: string | null = null;
    baseUrl = playwrightConfig.use.baseURL

    constructor(request: APIRequestContext) {
        this.authApi = new AuthApi(request, this.baseUrl);
        this.usersApi = new UsersApi(request, this.baseUrl);
        this.snippetsApi = new SnippetsApi(request, this.baseUrl);
    }
}