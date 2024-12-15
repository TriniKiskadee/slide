import {redirect} from "next/navigation";
import {onIntegrate} from "@/actions/integrations";

type InstagramCallbackPageProps = {
    searchParams: {
        code: string
    }
};

const InstagramCallbackPage = async ({searchParams: {code}}: InstagramCallbackPageProps) => {
    if (code) {
        console.log(`Instagram code: ${code}`)
        const user = await onIntegrate(code.split('#_')[0])
        if (user.status === 200) {
            return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`)
        }
    }

    return redirect('/sign-up')
};
export default InstagramCallbackPage;
