import {LOG_LEVEL} from "@root/app/utils/logUtils/types";

export interface Config {
    port: number, // server's port
    prefix: string, // server's url prefix, E.g. "foo/bar" -> `//localhost:${port}/${"foo/bar"}`
    logLevel: LOG_LEVEL,
}
