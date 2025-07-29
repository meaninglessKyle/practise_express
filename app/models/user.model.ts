import {prisma} from "@root/app/models/index";
import {User, UserCreateInput} from "./types";
import {User_GetListParams} from "@root/app/controllers/types";
import {model_OmitEmpty} from "@root/app/utils/modelUtils/modelUtils";

export const userModel: {
    getList: (params: User_GetListParams) => Promise<User[]>,
    create: (data: UserCreateInput) => Promise<User>,
} = {
    getList: async function(params) {
        const users = await prisma.user.findMany({
            where: {username: {contains: model_OmitEmpty(params?.username)}}
        });
        return users;
    },
    create: async function(data) {
        const res = await prisma.user.create({data});
        return res;
    },
};
