import {ResponseType} from "@root/app/controllers/types";
import {FinalValidRes} from "@root/app/utils/validUtils/types";
import {Response} from "express";


export function responseSucc<T>(
    res: Response, data: T
) {
    res.send({
        code: 0,
        data,
        msg: 'success',
    } as ResponseType<T>);
}

/**
 *
 * @param res
 * @param validResult
 * @return {boolean} is has return by this func, if return true, code below this func should not run
 */
export function responseJudgeValid<T = any>(
    res: Response, validResult: FinalValidRes<T>,
): boolean {
    if (!validResult.isPass) {
        res.send({
            code: 1,
            data: null,
            msg: validResult.results
                .filter(r => !r.isPass)
                .map(r => r.msg)
                .join("\r\n")
        });
        return true;
    }
    return false;
}

