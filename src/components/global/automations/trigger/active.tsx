import {InstagramBlue, PlaneBlue} from "@/icons";

type ActiveTriggerProps = {
    type: string
    keywords: {
        id: string
        word: string
        automationId: string | null
    }[]
};

const ActiveTrigger = ({type, keywords}: ActiveTriggerProps) => {

    return (
        <div className={'bg-background-80 p-3 rounded-xl w-full'}>
            <div className={'flex gap-x-2 items-center'}>
                {type === 'COMMENT'
                    ? <InstagramBlue />
                    : <PlaneBlue />
                }
                <p className={'text-lg'}>
                    {type === 'COMMENT'
                        ? 'User comments on my post'
                        : 'User sends me a direct message'
                    }
                </p>
            </div>
            <p className={'text-text-secondary'}>
                {type === 'COMMENT'
                    ? 'If the user comments on a video that is setup to listen for keywords, this automation will fire'
                    : 'If the user sends you a message that contains a keywords, this automation will fire'
                }
            </p>
            <div className={'flex gap-2 mt-5 flex-wrap'}>
                {keywords.map((keyword) => (
                    <div
                        key={keyword.id}
                        className={'bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full'}
                    >
                        <p>
                            {keyword.word}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ActiveTrigger;