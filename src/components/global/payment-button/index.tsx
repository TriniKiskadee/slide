import React from 'react'
import {Button} from "@/components/ui/button";
import {useSubscription} from "@/hooks/use-subscription";
import {CreditCard, Loader2} from "lucide-react";

const PaymentButton = () => {
    // WIP: Get user subscription details
    // WIP: loading state
    const {onSubscribe, isProcessing} = useSubscription()
    return (
        <Button
            disabled={isProcessing}
            onClick={onSubscribe}
            className={'bg-gradient-to-br from-[#9685DB] via-[#9434E6] to-[#CC3BD4] text-white rounded-full'}
        >
            {isProcessing
                ? <Loader2 className={'animate-spin'} />
                : <CreditCard />
            }
            Upgrade
        </Button>
    )
}
export default PaymentButton
