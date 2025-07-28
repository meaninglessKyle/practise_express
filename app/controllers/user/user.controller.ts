import type {RequestHandler} from "express-serve-static-core";
import {userModel} from "@root/app/models/user.model";
import type {User} from "@root/app/models/user.model";
import {responseSucc} from "@root/app/utils/responseUtils/responseUtils";

export const userCntrllr: {
    getList: RequestHandler,
    add: RequestHandler,
    del: RequestHandler,
    edit: RequestHandler,
} = {
    getList: async function (_req, res) {
        const list: User[] = await userModel.getList();
        res.send(responseSucc(list));
    },
    add: function (req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
    },
    del: function (req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
    },
    edit: function (req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
    },
};



