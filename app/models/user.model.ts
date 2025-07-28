import {prisma} from "@root/app/models/index";
import {User, Prisma} from "@prisma/client";
export {User} from "@prisma/client";

export const userModel: {
    getList: () => Promise<User[]>,
    create: (data: Prisma.UserCreateInput) => Promise<User>,
} = {
    getList: async function() {
        const users = await prisma.user.findMany({
            where: {username: {contains: "a"}}
        });
        return users;
    },
    create: async function(data) {
        const res = await prisma.user.create({data});
        return res;
    },
};
