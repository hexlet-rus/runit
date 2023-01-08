"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const createContext = (logger, alertLogs) => {
    return {
        console: {
            log: (data, ...args) => {
                logger.log(data, ...args);
            },
            table: (tabularData, ...properties) => {
                logger.table(tabularData, ...properties);
            },
            assert: (value, ...message) => {
                logger.assert(value, ...message);
            },
            count: (label) => {
                logger.count(label);
            },
            countReset: (label) => {
                logger.countReset(label);
            },
            debug: (data, ...args) => {
                logger.debug(data, ...args);
            },
            dir: (obj, options) => {
                logger.dir(obj, options);
            },
            dirxml: (...data) => {
                logger.dirxml(...data);
            },
            info: (data, ...args) => {
                logger.info(data, ...args);
            },
            error: (data, ...args) => {
                logger.error(data, ...args);
            },
            group: (...label) => {
                logger.group(...label);
            },
            groupCollapsed: (...label) => {
                logger.groupCollapsed(...label);
            },
            groupEnd: () => {
                logger.groupEnd();
            },
            time: (label) => {
                logger.time(label);
            },
            timeEnd: (label) => {
                logger.timeEnd(label);
            },
            timeLog: (label) => {
                logger.timeLog(label);
            },
            trace: (message, ...args) => {
                logger.trace(message, ...args);
            },
            warn: (data, ...args) => {
                logger.warn(data, ...args);
            },
        },
        alert: (value) => {
            alertLogs.push(value);
        },
    };
};
exports.createContext = createContext;
//# sourceMappingURL=console.config.js.map