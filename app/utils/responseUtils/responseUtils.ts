import {ResponseType} from "@root/app/controllers/types";


export function responseSucc<T>(data: T): ResponseType<T> {
    return {
        code: 0,
        data,
        msg: 'success',
    };
}

