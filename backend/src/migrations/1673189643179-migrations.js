"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.migrations1673189643179 = void 0;
var migrations1673189643179 = /** @class */ (function () {
    function migrations1673189643179() {
        this.name = 'migrations1673189643179';
    }
    migrations1673189643179.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"users\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"login\" varchar NOT NULL, \"email\" varchar NOT NULL, \"password\" varchar NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT \"UQ_2d443082eccd5198f95f2a36e2c\" UNIQUE (\"login\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE UNIQUE INDEX \"IDX_97672ac88f789774dd47f7c8be\" ON \"users\" (\"email\") ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"snippets\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" varchar NOT NULL DEFAULT ('Untitled'), \"code\" varchar NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"userId\" integer)")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"temporary_snippets\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" varchar NOT NULL DEFAULT ('Untitled'), \"code\" varchar NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"userId\" integer, CONSTRAINT \"FK_8fdfc80b4a5bf0ac48946a2ca1f\" FOREIGN KEY (\"userId\") REFERENCES \"users\" (\"id\") ON DELETE CASCADE ON UPDATE NO ACTION)")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"temporary_snippets\"(\"id\", \"name\", \"code\", \"created_at\", \"updated_at\", \"userId\") SELECT \"id\", \"name\", \"code\", \"created_at\", \"updated_at\", \"userId\" FROM \"snippets\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"snippets\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"temporary_snippets\" RENAME TO \"snippets\"")];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    migrations1673189643179.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"snippets\" RENAME TO \"temporary_snippets\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"snippets\" (\"id\" integer PRIMARY KEY AUTOINCREMENT NOT NULL, \"name\" varchar NOT NULL DEFAULT ('Untitled'), \"code\" varchar NOT NULL, \"created_at\" datetime NOT NULL DEFAULT (datetime('now')), \"updated_at\" datetime NOT NULL DEFAULT (datetime('now')), \"userId\" integer)")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("INSERT INTO \"snippets\"(\"id\", \"name\", \"code\", \"created_at\", \"updated_at\", \"userId\") SELECT \"id\", \"name\", \"code\", \"created_at\", \"updated_at\", \"userId\" FROM \"temporary_snippets\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"temporary_snippets\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"snippets\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_97672ac88f789774dd47f7c8be\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"users\"")];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return migrations1673189643179;
}());
exports.migrations1673189643179 = migrations1673189643179;
