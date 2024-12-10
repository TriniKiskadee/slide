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