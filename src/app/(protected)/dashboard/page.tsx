import React from 'react'
import {onboardUser} from "@/actions/user";
import {redirect} from "next/navigation";

interface DashboardPageProps {}

const DashboardPage = async ({}: DashboardPageProps) => {
    const user = await onboardUser()
    if (user.status === 200 || user.status === 201) {
        return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}`)
    }

    return redirect("/sign-in")
}
export default DashboardPage
