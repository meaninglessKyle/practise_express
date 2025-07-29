import {
    FinalValidRes,
    ValidResult, ValidRuleFunc,
} from "@root/app/utils/validUtils/types";

// noinspection JSUnusedGlobalSymbols
export class Valid {
    private schema: Record<string, SerializeValidRules<any>>;

    constructor(schemaObj: Record<string, SerializeValidRules<any>>) {
        this.schema = schemaObj;
    }

    public valid<T = any>(reqObj: any): FinalValidRes<T> {
        const parseObj: T = {} as T;
        const results: ValidResult[] = [];
        Object.keys(this.schema).forEach(key => {
            const runRuleResult = this.schema[key].runRules(reqObj?.[key], key);
            results.push(runRuleResult);
            // IMPROVE LATER add type guard
            // @ts-ignore
            parseObj[key] = runRuleResult.val;
        });
        return {
            parseObj, results,
            isPass: results.every(r => r.isPass),
        }
    }

    /** static methods */
    public static number() {
        return new ValidNumber();
    }

    public static string() {
        return new ValidString();
    }

    public static bool() {
        return new ValidBool();
    }

    public static object(oriObj: Record<string, SerializeValidRules<any>>) {
        return new Valid(oriObj);
    }
}


export class SerializeValidRules<T> {
    protected rules: ValidRuleFunc<T>[] = [];
    protected bAllowOmit = false;
    protected serializeVal(_str: string|T, _key: string): ValidResult<T> {
        throw new Error("should override this method is ChildClass");
    }
    public runRules(str: string, key: string): ValidResult {
        const serializeResult = this.serializeVal(str, key);
        if (!serializeResult.isPass) {
            return {
                key,
                val: str,
                isPass: serializeResult.isPass,
                msg: serializeResult.msg,
            };
        }
        // has passed serialize
        const val = serializeResult.val;
        // iter the rules
        let msg = "";
        let isPass = true;
        for (let i = 0; i < this.rules.length; i++) {
            const ruleResult = this.rules[i](val, key);
            if (!ruleResult.isPass) {
                msg = ruleResult.msg;
                isPass = false;
                break;
            }
        }
        return {key, val, isPass, msg};
    }
    public omit() {
        this.bAllowOmit = true;
        return this;
    }
}


// noinspection JSUnusedGlobalSymbols
class ValidNumber extends SerializeValidRules<number> {
    public override serializeVal(str: string, key: string) {
        const result = {key, val: -1, isPass: false, msg: `${key} is not a number`};
        if (str === "" || str === null || str === undefined) {
            return result;
        }
        const v = Number(str);
        result.val = v;
        if (isNaN(v)) {
            return result;
        }
        result.isPass = true;
        result.msg = '';
        return result;
    }
    public lt(max: number) {
        this.rules.push(function (n, key) {
            const isPass = n < max;
            const msg = isPass ? '' : `${key} should be less than ${max}`;
            return {isPass, msg};
        });
        return this;
    }
}

// noinspection JSUnusedGlobalSymbols
class ValidString extends SerializeValidRules<string> {
    public override serializeVal(str: string, key: string) {
        const result = {key, val: "", isPass: false, msg: `${key} is not a string`};
        if (str === null || str === undefined) {
            if (this.bAllowOmit) { // allow to be omit
                result.isPass = true;
                result.msg = "";
            }
            return result;
        }
        // has passed
        result.val = str;
        result.isPass = true;
        result.msg = "";
        return result;
    }
    public lt(max: number) {
        this.rules.push(function (s, key) {
            const isPass = s.length < max;
            const msg = isPass ? '' : `${key} should be less than ${max}`;
            return {isPass, msg};
        });
        return this;
    }
    public lte(max: number) {
        this.rules.push(function (s, key) {
            const isPass = s.length <= max;
            const msg = isPass ? '' : `${key} should be less than equal ${max}`;
            return {isPass, msg};
        });
        return this;
    }
}

class ValidBool extends SerializeValidRules<boolean> {
    public override serializeVal(str: string|boolean, key: string){
        const result = {
            key, val: false, isPass: false,
            msg: `${key} should be one of below: true|false`
        };
        if ((typeof str).toLowerCase() === 'boolean') {
            result.val = str as boolean;
            result.isPass = true;
            result.msg = "";
            return result;
        }
        if ((typeof str).toLowerCase() !== 'string') {
            return result;
        }
        const str_isStr = str as string;
        if (!/(^true$)|(^false$)/.test(str_isStr.toLowerCase())) {
            return result;
        }
        // noinspection RedundantConditionalExpressionJS
        result.val = str_isStr.toLowerCase() === 'false' ? false : true;
        result.isPass = true;
        result.msg = "";
        return result;
    }
}

