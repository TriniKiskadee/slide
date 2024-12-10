import React from 'react'
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type GradientButtonProps = {
    children: React.ReactNode
    type: 'BUTTON' | 'LINK'
    href?: string
    className?: string
}

const GradientButton = ({children, type, href, className}: GradientButtonProps) => {
    const gradients = 'bg-gradient-to-r from-indigo-500 via-purple-500 rounded-xl p-[2px]'

    switch (type) {
        case 'BUTTON':
            return (
                <div className={gradients}>
                    <Button className={cn(
                        'rounded-xl',
                        className
                    )}>
                        {children}
                    </Button>
                </div>
            )
        case 'LINK':
            return (
                <div className={gradients}>
                    <Link
                        href={href!}
                        className={cn(
                            'rounded-xl',
                            className
                        )}
                    >
                        {children}
                    </Link>
                </div>
            )
        default:
            return null
    }
}
export default GradientButton
