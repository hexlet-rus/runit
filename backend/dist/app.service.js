"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const vm = require("node:vm");
const node_console_1 = require("node:console");
const node_stream_1 = require("node:stream");
const console_config_1 = require("./console/console.config");
let AppService = class AppService {
    async run(code) {
        const alertLogs = [];
        const stdout = new node_stream_1.Transform({
            transform(chunk, enc, cb) {
                cb(null, chunk);
            },
        });
        const logger = new node_console_1.Console({ stdout });
        const context = (0, console_config_1.createContext)(logger, alertLogs);
        vm.createContext(context);
        try {
            const script = new vm.Script(code);
            script.runInContext(context);
            const terminal = (stdout.read() || '').toString().split('\n');
            return { terminal, alertLogs };
        }
        catch (err) {
            const lineOfError = err.stack
                .split('evalmachine.<anonymous>:')[1]
                .substring(0, 1);
            const errorMsg = `${err.message} at line ${lineOfError}`;
            return { terminal: [errorMsg], alertLogs };
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map