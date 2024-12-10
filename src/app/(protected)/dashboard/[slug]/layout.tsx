import React from 'react'
import Sidebar from "@/components/global/sidebar";
import Infobar from "@/components/global/infobar";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {PrefetchUserAutomations, PrefetchUserProfile} from "@/react-query/prefetch"

type DashboardLayoutProps = {
    children: React.ReactNode
    params: {
        slug: string
    }
}

const DashboardLayout = async ({children, params}: DashboardLayoutProps) => {
    // Query
    /// WIP: Query Client fetch data

    const query = new QueryClient()

    await PrefetchUserProfile(query)

    await PrefetchUserAutomations(query)

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className={'p-3'}>
                {/* Sidebar */}
                <Sidebar slug={params.slug}/>
                {/* Navbar*/}
                <div className={'lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'}>
                    <Infobar slug={params.slug}/>
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )
}
export default DashboardLayout
