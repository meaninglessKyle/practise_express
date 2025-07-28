import {PrismaClient} from "@prisma/client";
import { log } from "@root/app/utils/logUtils/logUtil";

export const prisma = new PrismaClient();

prisma.$connect().then(() => {
    log.info("test connect success");
}).catch(reason => {
    log.warn("test connect success, reason: ", reason);
});