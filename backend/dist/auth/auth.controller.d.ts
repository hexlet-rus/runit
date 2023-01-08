import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, response: Response): Promise<void>;
    logout(response: Response): Promise<void>;
}
