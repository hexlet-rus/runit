"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const data_source_config_1 = require("./data-source.config");
exports.dataSource = new typeorm_1.DataSource((0, data_source_config_1.default)());
//# sourceMappingURL=data-source.js.map