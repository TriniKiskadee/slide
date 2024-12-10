import React from 'react'
import {Button} from "@/components/ui/button";
import Loader from "@/components/global/loader";
import {ActiveAutomation} from "@/icons/active-automation";

const ActivateAutomationButton = () => {
    // WIP: setup optimistic UI
    // WIP: fetch automation data

    return (
        <Button className={'lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4'}>
            {/* WIP: set the loading state*/}
            <Loader state={false}>
                <ActiveAutomation />
                <p>
                    {/*{data?.data?.active ? 'Disable' : 'Activate'}*/}
                    Activate
                </p>
            </Loader>
        </Button>
    )
}
export default ActivateAutomationButton
