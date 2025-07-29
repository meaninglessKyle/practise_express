import {PrismaClient} from "@prisma/client";
import { log } from "@root/app/utils/logUtils/logUtil";

export const prisma = new PrismaClient({
    log: [
        {emit: "event", level: "query"},
        {emit: "stdout", level: "error"},
        {emit: "stdout", level: "warn"},
        {emit: "stdout", level: "info"},
    ]
});

prisma.$on("query", e => {
    log.info(`Query-----${e.timestamp}`);
    log.info("Query: " + e.query);
    log.info("Params: " + e.params);
    log.info("Duration: " + e.duration + "ms");
});

prisma.$connect().then(() => {
    log.info("test connect success");
}).catch(reason => {
    log.warn("test connect success, reason: ", reason);
});