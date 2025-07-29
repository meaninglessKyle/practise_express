
/**
 * for model to omit the val equal "empty"
 * e.g. "", null, undefined [] ...
 * */
export function model_OmitEmpty(obj: any) {
    const objType = (typeof obj).toLowerCase();
    if (objType === "string") {
        return obj === "" ? undefined : obj;
    }
    if (objType === "undefined") return undefined;
    if (objType === 'object') {
        if (obj === null) return undefined;
        if (Array.isArray(obj)) {
            return obj.length === 0 ? undefined : obj;
        }
        return obj;
    }
    return obj;
}
