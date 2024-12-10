'use client'

import React from 'react'
import {usePaths} from "@/hooks/use-nav";
import {PAGE_BREAD_CRUMBS} from "@/constants/pages";
import {Menu} from "lucide-react";
import Sheet from "@/components/global/nav-sheet";
import Items from "@/components/global/sidebar/items";
import {Separator} from "@/components/ui/separator";
import ClerkAuthState from "@/components/global/clerk-auth-state";
import SubscriptionPlan from "@/components/global/subscription-plan";
import UpgradeCard from "@/components/global/sidebar/upgrade";
import {LogoSmall} from "@/svgs/logo-small";
import CreateAutomation from "@/components/global/create-automation";
import Search from "@/components/global/infobar/search";
import Notifications from "@/components/global/infobar/notifications";
import MainBreadCrumb from "../breadcrumbs/main-breadcrumb";

type InfobarProps = {
    slug: string
}

const Infobar = ({slug}: InfobarProps) => {
    const {page} = usePaths()
    const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

    return (
        currentPage && (
            <div className={'flex flex-col'}>
                <div className={'flex gap-x-3 lg:gap-x-5 justify-end'}>
                    <span className={'lg:hidden flex items-center flex-1 gap-x-2'}>
                        <Sheet
                            trigger={<Menu/>}
                            className={'lg:hidden'}
                            side={'left'}
                        >
                            <div
                                className={'flex flex-col gap-y-5 w-full h-full p-3 bg-[#0E0E0E] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl'}>
                                <div className={'flex gap-x-2 items-center p-5 justify-center'}>
                                    <LogoSmall/>
                                </div>
                                <div className={'flex flex-col py-3'}>
                                    <Items
                                        page={page}
                                        slug={slug}
                                    />
                                </div>
                                <div className={'px-16'}>
                                    <Separator
                                        orientation={'horizontal'}
                                        className={'bg-[#333336]'}
                                    />
                                </div>
                                <div className={'px-3 flex flex-col gap-y-5'}>
                                    <div className={'flex gap-x-2'}>
                                        <ClerkAuthState/>
                                        <p className={'text-[#9B9CA0]'}>
                                            Profile
                                        </p>
                                    </div>
                                </div>
                                <SubscriptionPlan type={'FREE'}>
                                    <div className={'flex-1 flex flex-col justify-end'}>
                                        <UpgradeCard/>
                                    </div>
                                </SubscriptionPlan>
                            </div>
                        </Sheet>
                    </span>
                    <Search />
                    <CreateAutomation />
                    <Notifications />
                </div>
                <MainBreadCrumb
                    page={page === slug ? 'Home' : page}
                    slug={slug}
                />
            </div>
        )
    )
}
export default Infobar
