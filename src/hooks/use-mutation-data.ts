'use client'

import {MutationKey, MutationFunction, useQueryClient, useMutation, useMutationState} from "@tanstack/react-query";
import {toast} from "sonner";

export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    onSuccess?: () => void,
) => {
    const client = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey,
        mutationFn,
        onSuccess: (data) => {
            if (onSuccess) onSuccess()
            {data?.status === 200 ? (
                toast.success('Success', {
                    description: data.data
                })
            ) : (
                toast.error('Error', {
                    description: data.data
                })
            )}
        },
        onSettled: async () => {
            await client.invalidateQueries({ queryKey: [queryKey] })
        },
    })

    return { mutate, isPending }
}

export const useMutationDataState = (mutationKey: MutationKey) => {
    const data = useMutationState({
        filters: {mutationKey},
        select: (mutation) => {
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            }
        },
    })

    const latestVariable = data[data.length - 1]
    return {
        latestVariable,
    }
}