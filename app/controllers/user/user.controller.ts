import type {RequestHandler} from "express-serve-static-core";

export const userCntrllr: {
    getList: RequestHandler,
    add: RequestHandler,
    del: RequestHandler,
    edit: RequestHandler,
} = {
    getList: function (req, res) {
        // TODO replace to get from Model and response
        res.send("ok");
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



