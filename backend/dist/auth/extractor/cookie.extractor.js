"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieExtractor = void 0;
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.access_token;
    }
    return token;
};
exports.cookieExtractor = cookieExtractor;
//# sourceMappingURL=cookie.extractor.js.map