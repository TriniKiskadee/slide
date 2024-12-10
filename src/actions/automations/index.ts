'use server'

import {onCurrentUser} from "@/actions/user";
import {
    addListener, addTrigger,
    createAutomation,
    findAutomation,
    getAutomations,
    updateAutomation
} from "@/actions/automations/queries";

export const createAutomations = async (id?: string) => {
    const user = await onCurrentUser()
    try {
        const create = await createAutomation(user.id, id)
        if (create) return {
            status: 200,
            data: 'Automation created successfully.',
        }

        return {
            status: 404,
            data: 'Oops! Something went wrong',
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            data: 'Internal Server Error',
        }
    }
}

export const getAllAutomations = async () => {
    const user = await onCurrentUser()
    try {
        const automations = await getAutomations(user.id)
        if (automations) return {
            status: 200,
            data: automations.automations
        }

        return {
            status: 404,
            data: []
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            data: []
        }
    }
}

export const getAutomationInfo = async (id: string) => {
    await onCurrentUser()
    try {
        const automations = await findAutomation(id)
        if (automations) return {
            status: 200,
            data: automations
        }

        return {
            status: 404
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
        }
    }
}

export const updateAutomationName = async (automationId: string, data: { name?: string, active?: boolean, automation?: string }) => {
    await onCurrentUser()
    try {
        const update = await updateAutomation(automationId, data)
        if (update) {
            return {
                status: 200,
                data: 'Automation updated successfully.',
            }
        }

        return {
            status: 404,
            data: 'Oops! Could not find automation.',
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            data: 'Internal Server Error',
        }
    }
}

export const saveListener = async (automationId: string, listener: 'SMARTAI' | 'MESSAGE', prompt: string, reply?: string) => {
    await onCurrentUser()
    try {
        const create = await addListener(automationId, listener, prompt, reply)
        if (create) return {
            status: 200,
            data: 'Listener created'
        }

        return {
            status: 404,
            data: 'Can\'t create listener.',
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            data: 'Internal Server Error',
        }
    }
}

export const saveTrigger = async (automationId: string, trigger: string[]) => {
    await onCurrentUser()
    try {
        const create = await addTrigger(automationId, trigger)
        if (create) return {
            status: 200,
            data: 'Trigger saved'
        }

        return {
            status: 404,
            data: 'Trigger could not be saved'
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            data: 'Internal Server Error',
        }
    }
}