import {Config} from "@root/configs/types";
import defaultEnv from "@root/.env";
import developmentEnv from "@root/.env.development";
import productionEnv from "@root/.env.production";
import * as process from "node:process";
import {LOG_LEVEL} from "@root/app/utils/logUtils/types";


/**
 * ----------------------------------------------------
 * IMPROVE LATER: the function to get environment variables
 * E.g. use npm pkg like dotenv
 * ----------------------------------------------------
 *
 * the system's config, include but not limited to
 * port, url prefix, etc.
 * it can override params by /.env.*
 * and run by -> node ./.../app.js ENV=*
 * E.g.
 * node ./.../app.js ENV=development
 * /.env.development will override the params
 * */

const ENV: 'development'|'production'|undefined = process.env.ENV as any;


export const config: Config = {
    port: 3000,
    prefix: "",
    logLevel: ENV === "development" ? LOG_LEVEL.VERBOSE :
        ENV === "production" ? LOG_LEVEL.INFO : LOG_LEVEL.VERBOSE,
};

const ENV2EnvFromFile: Record<any, Config> = {
    "default": defaultEnv,
    "development": developmentEnv,
    "production": productionEnv,
};

// @ts-ignore
const envFromFile: Config = ENV2EnvFromFile[ENV] || ENV2EnvFromFile.default;

(Object.keys(envFromFile) as (keyof Config)[]).forEach(key => {
    if (config.hasOwnProperty(key)) {
        // IMPROVE LATER: ts problem: make type guard for "config[key]"
        // @ts-ignore
        config[key] = envFromFile[key];
    }
});
