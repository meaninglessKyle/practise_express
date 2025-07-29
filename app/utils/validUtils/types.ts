

export type ValidResult<T = any> = {key: string, val: T, isPass: boolean, msg: string};


export type ValidRuleFunc<T> = ((v: T, key: string) => Omit<ValidResult, "val"|"key">);

export type FinalValidRes<T = any> = {
    parseObj: T,
    results: ValidResult<T[keyof T]>[],
    isPass: boolean,
}

