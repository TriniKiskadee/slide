import {useQueryAutomationPosts} from "@/hooks/user-queries";
import {useAutomationPosts} from "@/hooks/use-automation";
import TriggerButton from "@/components/global/automations/trigger-button";
import {InstagramPostProps} from "@/types/posts.type";
import {CheckCheck} from "lucide-react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Loader from "@/components/global/loader";

type PostButtonProps = {
    id: string;
};

const PostButton = ({id}: PostButtonProps) => {
    const {data} = useQueryAutomationPosts()
    const {
        posts,
        onSelectPost,
        mutate,
        isPending
    } = useAutomationPosts(id)

    return (
        <TriggerButton label={'Attach a post'}>
            {data?.status === 200 ? (
                <div className={'flex flex-col gap-y-3 w-full'}>
                    <div className={'flex flex-wrap w-full gap-3'}>
                        {data.data.data.map((post: InstagramPostProps) => (
                            <div
                                key={post.id}
                                className={'relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden'}
                                onClick={() =>
                                    onSelectPost({
                                        postId: post.id,
                                        media: post.media_url,
                                        mediaType: post.media_type,
                                        caption: post.caption,
                                    })
                                }
                            >
                                {posts.find((p) => p.postId === post.id) && (
                                    <CheckCheck
                                        fill={'white'}
                                        stroke={'black'}
                                        className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'}
                                    />
                                )}
                                <Image
                                    src={post.media_url}
                                    alt={'post image'}
                                    fill
                                    sizes={'100vw'}
                                    className={cn(
                                        'hover:opacity-75 transition duration-100',
                                        posts.find((p) => p.postId === post.id) &&
                                            'opacity-75'
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={mutate}
                        disabled={posts.length === 0}
                        className={'bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]'}
                    >
                        <Loader state={isPending}>
                            Attach Post
                        </Loader>
                    </Button>
                </div>
            ) : (
                <p className={'text-text-secondary text-center'}>
                    No posts found!
                </p>
            )}
        </TriggerButton>
    );
};
export default PostButton;