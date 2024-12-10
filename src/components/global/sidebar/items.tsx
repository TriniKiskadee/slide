import React from 'react'
import {SIDEBAR_MENU} from "@/constants/menu";
import Link from "next/link";
import {cn} from "@/lib/utils";

type ItemProps = {
    page: string
    slug: string
}

const Items = ({page, slug}: ItemProps) => {
    return (
        SIDEBAR_MENU.map((item) => (
            <Link
                key={item.id}
                href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
                className={cn(
                    'capitalize flex gap-x-2 rounded-full p-3',
                    page === item.label && 'bg-[#0f0f0f]',
                    page === slug && item.label === 'home'
                        ? 'bg-[#0f0f0f]'
                        : 'text-[#9B9CA0]'
                )}
            >
                {item.icon}
                {item.label}
            </Link>
        ))
    )
}
export default Items