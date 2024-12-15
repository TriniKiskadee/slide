'use server'

import {client} from "@/lib/prisma";
import {INSTAGRAM_POST} from "@/hooks/use-automation";

export const createAutomation = async (clerkId: string, id?: string) => {
    return await client.user.update({
        where: {
            clerkId: clerkId,
        },
        data: {
            automations: {
                create: {
                    ...(id && { id }),
                }
            }
        }
    })
}

export const getAutomations = async (clerkId: string) => {
    return await client.user.findUnique({
        where: {
            clerkId: clerkId,
        },
        select: {
            automations: {
                orderBy: {
                    createdAt: 'asc',
                },
                include: {
                    keywords: true,
                    listener: true,
                }
            }
        }
    })
}

export const findAutomation = async (id: string) => {
    return await client.automation.findUnique({
        where: {
            id: id,
        },
        include: {
            keywords: true,
            trigger: true,
            posts: true,
            listener: true,
            User: {
                select: {
                    subscription: true,
                    integrations: true
                }
            }
        }
    })
}

export const updateAutomation = async (id: string, update: {name?: string, active?: boolean}) => {
    return await client.automation.update({
        where: {
            id: id,
        },
        data: {
            name: update.name,
            active: update.active
        }
    })
}

export const addListener = async (automationId: string, listener: 'SMARTAI' | 'MESSAGE', prompt: string, reply?: string) => {
    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            listener: {
                create: {
                    listener: listener,
                    prompt: prompt,
                    commentReply: reply
                }
            }
        }
    })
}

export const addTrigger = async (automationId: string, trigger: string[]) => {
    if (trigger.length === 2){
        return await client.automation.update({
            where: {
                id: automationId,
            },
            data: {
                trigger: {
                    createMany: {
                        data: [
                            {
                                type: trigger[0]
                            },
                            {
                                type: trigger[1]
                            }
                        ]
                    }
                }
            }
        })
    }

    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            trigger: {
                create: {
                    type: trigger[0]
                }
            }
        }
    })
}

export const addKeyword = async (automationId: string, keyword: string) => {
    return client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            keywords: {
                create: {
                    word: keyword,
                },
            },
        },
    })
}

export const deleteKeywordQuery = async (id: string) => {
    return await client.keyword.delete({
        where: {
            id: id,
        }
    })
}

export const addPost = async (automationId: string, posts: INSTAGRAM_POST[]) => {
    return await client.automation.update({
        where: {
            id: automationId,
        },
        data: {
            posts: {
                createMany: {
                    data: posts
                }
            }
        }
    })
}