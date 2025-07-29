import type {RequestHandler} from "express-serve-static-core";
import {userModel} from "@root/app/models/user.model";
import type {User} from "@root/app/models/types";
import {responseJudgeValid, responseSucc} from "@root/app/utils/responseUtils/responseUtils";
import {Valid} from "@root/app/utils/validUtils/valid";
import {User_GetListParams} from "@root/app/controllers/types";

export const userCntrllr: {
    getList: RequestHandler,
    add: RequestHandler,
    del: RequestHandler,
    edit: RequestHandler,
} = {
    getList: async function (req, res) {
        const validResult = Valid.object({
            username: Valid.string().omit().lte(20),
        }).valid<User_GetListParams>(req.query);
        if (responseJudgeValid(res, validResult)) return;
        const list: User[] = await userModel.getList(validResult.parseObj);
        responseSucc(res, list);
    },
    add: function (_req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
    },
    del: function (_req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
    },
    edit: function (_req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
    },
};



