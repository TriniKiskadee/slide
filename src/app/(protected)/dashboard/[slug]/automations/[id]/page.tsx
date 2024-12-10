import React from 'react'
import AutomationBreadCrumb from "@/components/global/breadcrumbs/automation-breadcrumbs";
import {Warning} from "@/icons";
import Trigger from "@/components/global/automations/trigger";
import {getAutomationInfo} from "@/actions/automations";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {PrefetchUserAutomation} from "@/react-query/prefetch";


type AutomationIdPageProps = {
    params: {
        id: string
    }
}

export async function generateMetadata({params}: AutomationIdPageProps) {
    const info = await getAutomationInfo(params.id)

    return {
        title: info.data?.name
    }
}


const AutomationIdPage = async ({params}: AutomationIdPageProps) => {
    const query = new QueryClient()
    await PrefetchUserAutomation(query, params.id)


    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className={'flex flex-col items-center gap-y-20'}>
                <AutomationBreadCrumb id={params.id}/>
                <div className={'w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3'}>
                    <div className={'flex gap-x-2'}>
                        <Warning/>
                        When...
                    </div>
                    <Trigger id={params.id}/>
                </div>
            </div>
        </HydrationBoundary>
    )
}
export default AutomationIdPage