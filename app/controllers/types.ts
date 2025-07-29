export type ResponseType<T = any> = {
    code: 0|1|2|3,
    data: T,
    msg?: string,
}

export type User_GetListParams = {
    username?: string,
}