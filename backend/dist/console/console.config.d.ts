import { Console } from 'node:console';
export declare const createContext: (logger: Console, alertLogs: Array<any>) => {
    console: {
        log: (data: any, ...args: any[]) => void;
        table: (tabularData: Record<string, unknown>, ...properties: any[]) => void;
        assert: (value: any, ...message: any[]) => void;
        count: (label: any) => void;
        countReset: (label: any) => void;
        debug: (data: any, ...args: any[]) => void;
        dir: (obj: any, options: Record<string, unknown>) => void;
        dirxml: (...data: any[]) => void;
        info: (data: any, ...args: any[]) => void;
        error: (data: any, ...args: any[]) => void;
        group: (...label: any[]) => void;
        groupCollapsed: (...label: any[]) => void;
        groupEnd: () => void;
        time: (label: any) => void;
        timeEnd: (label: any) => void;
        timeLog: (label: any) => void;
        trace: (message: any, ...args: any[]) => void;
        warn: (data: any, ...args: any[]) => void;
    };
    alert: (value: any) => void;
};
