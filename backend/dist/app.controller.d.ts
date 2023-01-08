import { AppService } from './app.service';
import { Output } from './console/interfaces/output.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getLogs(code: any): Promise<Output>;
}
