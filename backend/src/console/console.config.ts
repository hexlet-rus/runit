/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import { Console } from 'node:console';

export const createContext = (logger: Console, alertLogs: Array<any>) => {
  return {
    console: {
      log: (data: any, ...args: any[]) => {
        logger.log(data, ...args);
      },
      table: (tabularData: Record<string, unknown>, ...properties: any[]) => {
        logger.table(tabularData, ...properties);
      },
      assert: (value: any, ...message: any[]) => {
        logger.assert(value, ...message);
      },
      count: (label: any) => {
        logger.count(label);
      },
      countReset: (label: any) => {
        logger.countReset(label);
      },
      debug: (data: any, ...args: any[]) => {
        logger.debug(data, ...args);
      },
      dir: (obj: any, options: Record<string, unknown>) => {
        logger.dir(obj, options);
      },
      dirxml: (...data: any[]) => {
        logger.dirxml(...data);
      },
      info: (data: any, ...args: any[]) => {
        logger.info(data, ...args);
      },
      error: (data: any, ...args: any[]) => {
        logger.error(data, ...args);
      },
      group: (...label: any[]) => {
        logger.group(...label);
      },
      groupCollapsed: (...label: any[]) => {
        logger.groupCollapsed(...label);
      },
      groupEnd: () => {
        logger.groupEnd();
      },
      time: (label: any) => {
        logger.time(label);
      },
      timeEnd: (label: any) => {
        logger.timeEnd(label);
      },
      timeLog: (label: any) => {
        logger.timeLog(label);
      },
      trace: (message: any, ...args: any[]) => {
        logger.trace(message, ...args);
      },
      warn: (data: any, ...args: any[]) => {
        logger.warn(data, ...args);
      },
    },
    alert: (value: any) => {
      alertLogs.push(value);
    },
  };
};
