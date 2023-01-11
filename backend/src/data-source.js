"use strict";
exports.__esModule = true;
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
var data_source_config_1 = require("./data-source.config");
exports.dataSource = new typeorm_1.DataSource((0, data_source_config_1["default"])());
