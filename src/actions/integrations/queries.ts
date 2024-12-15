'use server'

import {client} from "@/lib/prisma";

export const updateIntegrations = async (token: string, expire: Date, id: string) => {
    return await client.integrations.update({
        where: {
            id: id,
        },
        data: {
            token: token,
            expiresAt: expire,
        }
    })
}

export const getIntegration = async (clerkId: string) => {
    return await client.user.findUnique({
        where: {
            id: clerkId
        },
        select: {
            integrations: {
                where: {
                    name: 'INSTAGRAM',
                }
            },
        }
    })
}

export const createIntegration = async (clerkId: string, token: string, expire: Date, igId?: string) => {
    return await client.user.update({
        where: {
            clerkId: clerkId,
        },
        data: {
            integrations: {
                create: {
                    token: token,
                    expiresAt: expire,
                    instagramId: igId,
                }
            }
        },
        select: {
            firstname: true,
            lastname: true,
        }
    })
}