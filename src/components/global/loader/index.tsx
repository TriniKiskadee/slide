import React from 'react'
import {cn} from "@/lib/utils";
import {Spinner} from "@/components/global/loader/spinner";

type LoaderProps = {
    state: boolean
    className?: string
    children?: React.ReactNode
    color?: string
}

const Index = ({state, className, color, children}: LoaderProps) => {
    return (
        state ? (
            <div className={cn(className)}>
                <Spinner color={color}/>
            </div>
        ) : (
            children
        )
    )
}
export default Index
