import prismaClient from "@/lib/_db/prisma"
import getUserFromCookies from "@/lib/services/helper";
import { generateToken } from "@/lib/services/jwt";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";
export default async function loginUser(_:any,args:{
    userCred:string,
    password:string
}) {
    try{
        const cookieStore=await cookies();
        const user=await prismaClient.user.findFirst({
            where:{
                 OR:[
                    {
                        email:args.userCred
                    },
                    {
                        username:args.userCred
                    }
                 ]
            }
        })
        if(!user) return false;
        if(user.password==args.password){
            const token=generateToken({id:user.id})
            cookieStore.set("token",token);
            return true;
        }else{
            return false;
        }
    }catch(error){
        return false;
    }
}

export async function createUser(_:any,args:{
    name:string,
    email:string,
    username:string,
    password:string,
    role:RoleType
    avatar:string
}){
    try{
        const user=await getUserFromCookies();
        if(!user) return null;
        if(user.role !="admin") return null;
        const createdUser=await prismaClient.user.create({
            data:args
        })
        return createdUser
    }catch(error){
        return null;
    }

}

export async function updateUserProfile(_:any,args:{
    name:string,
    username:string,
    email:string,
    avatar:string,
    userId:string,
}){
    try{
        const user=await getUserFromCookies();
        const dataToSave={
            name:args.name,
            username:args.username,
            email:args.email,
            avatar:args.avatar
        }
        if(user?.role!='admin' && user?.id != args.userId) return false;
        await prismaClient.user.update({
            where:{
                id:args.userId
            },
            data:dataToSave
        })
        return true;
    }catch(error){
        return false;
    }

}

export async function getAllUsers(_:any,args:{
    role :"staff" |"manager"
}){
    const roleToFind=args?.role || ""
    try{
        const users=await prismaClient.user.findMany({
            where:{
                role:{
                    not:"admin"
                }
            }
        })
        return users
    }
    catch(error){
        return null;
    }
}