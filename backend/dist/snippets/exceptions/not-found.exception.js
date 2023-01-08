"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const common_1 = require("@nestjs/common");
class NotFoundException extends common_1.HttpException {
    constructor() {
        super('Not Found!', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map