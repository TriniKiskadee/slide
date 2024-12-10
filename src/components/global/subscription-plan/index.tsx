import React from 'react'
import {useQueryUser} from "@/hooks/user-queries";

type SubscriptionPlanProps = {
    type: 'FREE' | 'PRO'
    children: React.ReactNode
}

const SubscriptionPlan = ({type, children}: SubscriptionPlanProps) => {
    const {data} = useQueryUser()

    return data?.data?.subscription?.plan === type && children
}
export default SubscriptionPlan
