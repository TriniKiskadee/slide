import React from 'react'
import PaymentCard from "@/components/global/billing/payment-card";

const Billing = () => {
    /* WIP: Fetch billing information for the customer */
    return (
        <div className={'flex lf:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'}>
            <PaymentCard
                label={'FREE'}
                current={'FREE'}
            />
            <PaymentCard
                label={'PRO'}
                current={'FREE'}
            />
        </div>
    )
}
export default Billing
