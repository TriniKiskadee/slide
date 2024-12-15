import {NextRequest, NextResponse} from "next/server";
import {
    createChatHistory, getChatHistory,
    getKeywordAutomation,
    getKeywordPost,
    matchKeyword,
    trackResponses
} from "@/actions/webhook/queries";
import {sendDM} from "@/lib/fetch";
import {client} from "@/lib/prisma";
import {openai} from "@/lib/openai";
import automation from "@/redux/slices/automation";
import {findAutomation} from "@/actions/automations/queries";

export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get('hub.challenge');
    return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
    const webhook_payload = await req.json()
    let matcher
    try {
        if (webhook_payload.entry[0].messaging) {
            matcher = await matchKeyword(webhook_payload.entry[0].messaging[0].message.text)
        }

        if (webhook_payload.entry[0].changes) {
            matcher = await matchKeyword(webhook_payload.entry[0].changes[0].value.text)
        }

        if (matcher && matcher.automationId) {
            // We have a keyword match

            // message
            if (webhook_payload.entry[0].messaging) {
                const automation = await getKeywordAutomation(matcher.automationId, true)

                if (automation && automation.trigger) {
                    if(automation.listener && automation.listener.listener === 'MESSAGE') {
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            automation.listener.prompt,
                            automation.User?.integrations[0].token!,
                        )

                        if (direct_message.status === 200) {
                            const tracked = await trackResponses(automation.id, 'DM')
                            if (tracked) {
                                return NextResponse.json(
                                    {message: 'Message sent'},
                                    {status: 200}
                                )
                            }
                        }
                    }

                    if(automation.listener && automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO') {
                        /* TODO: 8:36:50 */
                        const smart_ai_message = await openai.chat.completions.create({
                            model: 'gpt-4o',
                            messages: [
                                {
                                    role: 'assistant',
                                    content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                                }
                            ]
                        })
                        if (smart_ai_message.choices[0].message.content) {
                            const receiver = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                webhook_payload.entry[0].messaging[0].message.text,
                            )
                            const sender = createChatHistory(
                                automation.id,
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                            )

                            await client.$transaction([receiver, sender])

                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].messaging[0].sender.id,
                                smart_ai_message.choices[0].message.content,
                                automation.User?.integrations[0].token!
                            )
                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'DM')
                                if (tracked) {
                                    return NextResponse.json(
                                        {message: 'Message sent'},
                                        {status: 200}
                                    )
                                }
                            }
                        }
                    }
                }
            }

            if (webhook_payload.entry[0].changes && webhook_payload.entry[0].changes.field === 'comments') {
                const automation = await getKeywordAutomation(matcher.automationId, false)

                const automations_post = await getKeywordPost(webhook_payload.entry[0].changes[0].value.media.id, automation?.id!)

                if (automation && automations_post && automation.trigger) {
                    if (automation.listener) {
                        if (automation.listener.listener === 'MESSAGE') {
                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.from.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!,
                            )
                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'COMMENT')
                                if (tracked) {
                                    return NextResponse.json(
                                        {message: 'Message sent'},
                                        {status: 200}
                                    )
                                }
                            }
                        }
                        if (automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO') {
                            const smart_ai_message = await openai.chat.completions.create({
                                model: 'gpt-4o',
                                messages: [
                                    {
                                        role: 'assistant',
                                        content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                                    }
                                ]
                            })
                            if (smart_ai_message.choices[0].message.content) {
                                const reciever = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text,
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content,
                                )

                                await client.$transaction([reciever, sender])

                                const direct_message = await sendDM(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content,
                                    automation.User?.integrations[0].token!,
                                )
                                if (direct_message.status === 200) {
                                    const tracked = await trackResponses(automation.id, 'COMMENT')
                                    if (tracked) {
                                        return NextResponse.json(
                                            {message: 'Message sent'},
                                            {status: 200}
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!matcher) {
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging[0].recipient.id,
                webhook_payload.entry[0].messaging[0].sender.id,
            )
            if (customer_history.history.length > 0) {
                const automation = await findAutomation(customer_history.automationId!)
                if (automation?.User?.subscription?.plan === 'PRO' && automation.listener?.listener === 'SMARTAI') {
                    const smart_ai_message = await openai.chat.completions.create({
                        model: 'gpt-4o',
                        messages: [
                            {
                                role: 'assistant',
                                content: `${automation.listener?.prompt}: Keep response under 2 sentences`,
                            },
                            ...customer_history.history,
                            {
                                role: 'user',
                                content: webhook_payload.entry[0].messaging[0].message.text,
                            },
                        ],
                    })
                    if (smart_ai_message.choices[0].message.content) {
                        const reciever = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text,
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                        )

                        await client.$transaction([reciever, sender])

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!,
                        )
                        if (direct_message.status === 200) {
                            return NextResponse.json(
                                {message: 'Message sent'},
                                {status: 200}
                            )
                        }
                    }
                }
            }

            return NextResponse.json(
                {message: 'No automation set'},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: 'No automation set'},
            {status: 404}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {message: 'No automation set'},
            {status: 500}
        )
    }
}
