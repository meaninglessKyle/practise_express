import {config} from "@root/configs/config";
import {LOG_LEVEL} from "@root/app/utils/logUtils/types";

const logLevel = config.logLevel;
// IMPROVE LATER: log.[error/warn] ... haven't used yet. remove [below noinspection line] when all log methods used
// noinspection JSUnusedGlobalSymbols
/**
 * ----------------------------------------------------
 * IMPROVE LATER: the function to manage log
 * E.g. use npm pkg like xxx
 * ----------------------------------------------------
 * log
 * */
export const log = {
    fatal(...params: any[]) {
        if (logLevel < LOG_LEVEL.FATAL) {
            return;
        }
        console.error(...params);
    },
    error(...params: any[]) {
        if (logLevel < LOG_LEVEL.ERROR) {
            return;
        }
        console.error(...params);
    },
    warn(...params: any[]) {
        if (logLevel < LOG_LEVEL.WARN) {
            return;
        }
        console.warn(...params);
    },
    info(...params: any[]) {
        if (logLevel < LOG_LEVEL.INFO) {
            return;
        }
        console.log(...params);
    },
    debug(...params: any[]) {
        if (logLevel < LOG_LEVEL.DEBUG) {
            return;
        }
        console.log(...params);
    },
    verbose(...params: any[]) {
        if (logLevel < LOG_LEVEL.VERBOSE) {
            return;
        }
        console.log(...params);
    },
}
