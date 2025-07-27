import "module-alias/register";
import express from "express";
import {config} from "@root/configs/config";
import {log} from "@root/app/utils/logUtils/logUtil";
import path from "node:path";
import * as process from "node:process";
import {router} from "@root/app/routes";


const app = express();


// the static files, E.g. *.html, *.js *.css etc.
app.use("/public", express.static(path.resolve(process.cwd(), "public")));

// routes
app.use("/api", router);


app.listen(config.port, () => {
    log.info(`server running http://localhost:${config.port}`);
});


