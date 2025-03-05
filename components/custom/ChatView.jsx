// "use client";
// import { MessagesContext } from '@/context/MessagesContext';
// import { UserDetailContext } from '@/context/UserDetailContext';
// import { api } from '@/convex/_generated/api';
// import Colors from '@/data/Colors';
// import Lookup from '@/data/Lookup';
// import Prompt from '@/data/Prompt';
// import axios from 'axios';
// import { useConvex, useMutation } from 'convex/react';
// import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import React, { useContext, useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { useSidebar } from '../ui/sidebar';
// import { toast } from 'sonner';

// export const countToken = (inputText) => {
//     return inputText?.trim().split(/\s+/).filter(word => word).length || 0;
// };

// function ChatView() {
//     const { id } = useParams();
//     const convex = useConvex();
//     const { userDetail, setUserDetail } = useContext(UserDetailContext);
//     const { messages = [], setMessages } = useContext(MessagesContext); // Ensure messages is never undefined
//     const [userInput, setUserInput] = useState('');
//     const [loading, setLoading] = useState(false);
//     const UpdateMessages = useMutation(api.workspace.UpdateMessages);
//     const { toggleSidebar } = useSidebar();
//     const UpdateTokens = useMutation(api.users.UpdateToken);

//     useEffect(() => {
//         if (id) {
//             GetWorkspaceData();
//         }
//     }, [id]);

//     const GetWorkspaceData = async () => {
//         try {
//             const result = await convex.query(api.workspace.GetWorkspace, { workspaceId: id });
//             setMessages(result?.messages || []);
//             console.log(result);
//         } catch (error) {
//             console.error("Error fetching workspace data:", error);
//         }
//     };

//     useEffect(() => {
//         if (messages?.length > 0) {
//             const lastMessage = messages[messages.length - 1];
//             if (lastMessage?.role === 'user') {
//                 GetAiResponse();
//             }
//         }
//     }, [messages]);

//     const GetAiResponse = async () => {
//         setLoading(true);
//         try {
//             const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
//             const result = await axios.post('/api/ai-chat', { prompt: PROMPT });

//             const aiResp = {
//                 role: 'ai',
//                 content: result.data.result,
//             };

//             const newMessages = [...messages, aiResp];
//             setMessages(newMessages);

//             await UpdateMessages({
//                 messages: newMessages,
//                 workspaceId: id,
//             });

//             const token = Math.max(0, (Number(userDetail?.token || 0) - countToken(JSON.stringify(aiResp))));
//             setUserDetail(prev => ({ ...prev, token }));

//             await UpdateTokens({
//                 userId: userDetail?._id,
//                 token,
//             });
//         } catch (e) {
//             console.error("Error fetching AI response:", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onGenerate = (input) => {
//         if ((userDetail?.token || 0) < 10) {
//             toast(Lookup.NOT_ENOUGH_TOKENS_TEXT);
//             return;
//         }

//         setMessages(prev => [...prev, { role: 'user', content: input }]);
//         setUserInput('');
//     };

//     return (
//         <div className='relative h-[85vh] flex flex-col'>
//             <div className='flex-1 overflow-y-scroll scrollbar-hide pl-5'>
//                 {messages?.length > 0 && messages.map((msg, index) => (
//                     <div key={index}
//                         className='p-3 rounded-lg mb-4 flex gap-2 items-center leading-7'
//                         style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
//                         {msg?.role === 'user' && (
//                             <Image src={userDetail?.picture} alt='userImage'
//                                 width={35} height={35} className='rounded-full' />
//                         )}
//                         <ReactMarkdown className='flex flex-col'>{msg.content}</ReactMarkdown>
//                     </div>
//                 ))}
//                 {loading &&
//                     <div className='p-5 rounded-lg mb-2 flex gap-2 items-center'
//                         style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
//                         <Loader2Icon className='animate-spin' />
//                         <h2>{Lookup.GENERATING_RESPONSE_TEXT}</h2>
//                     </div>
//                 }
//             </div>

//             {/* Input Section */}
//             <div className='flex gap-2 items-end p-3'>
//                 {userDetail && (
//                     <Image src={userDetail?.picture}
//                         className='rounded-full cursor-pointer'
//                         onClick={toggleSidebar}
//                         alt='user' width={30} height={30} />
//                 )}
//                 <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
//                     style={{ backgroundColor: Colors.BACKGROUND }}>
//                     <div className='flex gap-2'>
//                         <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
//                             value={userInput}
//                             onChange={(event) => setUserInput(event.target.value)}
//                             className='outline-none bg-transparent w-full h-32 max-h-56 resize-none' />
//                         {userInput && (
//                             <ArrowRight
//                                 onClick={() => onGenerate(userInput)}
//                                 className='bg-[#008d78] p-2 h-10 w-10 rounded-md cursor-pointer' />
//                         )}
//                     </div>
//                     <div>
//                         <Link className='h-5 w-5' />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ChatView;


"use client";
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import Prompt from '@/data/Prompt';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSidebar } from '../ui/sidebar';
import { toast } from 'sonner';

export const countToken = (inputText) => {
    return inputText?.trim().split(/\s+/).filter(word => word).length || 0;
};

function ChatView() {
    const { id } = useParams();
    const convex = useConvex();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { messages = [], setMessages } = useContext(MessagesContext);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const UpdateMessages = useMutation(api.workspace.UpdateMessages);
    const { toggleSidebar } = useSidebar();
    const UpdateTokens = useMutation(api.users.UpdateToken);

    useEffect(() => {
        if (id) {
            GetWorkspaceData();
        }
    }, [id]);

    const GetWorkspaceData = async () => {
        try {
            const result = await convex.query(api.workspace.GetWorkspace, { workspaceId: id });
            setMessages(result?.messages || []);
        } catch (error) {
            console.error("Error fetching workspace data:", error);
        }
    };

    useEffect(() => {
        if (messages?.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage?.role === 'user') {
                GetAiResponse();
            }
        }
    }, [messages]);

    const GetAiResponse = async () => {
        setLoading(true);
        try {
            const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
            const result = await axios.post('/api/ai-chat', { prompt: PROMPT });

            const aiResp = {
                role: 'ai',
                content: result.data.result,
            };

            const newMessages = [...messages, aiResp];
            setMessages(newMessages);

            await UpdateMessages({
                messages: newMessages,
                workspaceId: id,
            });

            const token = Math.max(0, (Number(userDetail?.token || 0) - countToken(JSON.stringify(aiResp))));
            setUserDetail(prev => ({ ...prev, token }));

            await UpdateTokens({
                userId: userDetail?._id,
                token,
            });
        } catch (e) {
            console.error("Error fetching AI response:", e);
        } finally {
            setLoading(false);
        }
    };

    const onGenerate = (input) => {
        if ((userDetail?.token || 0) < 10) {
            toast(Lookup.NOT_ENOUGH_TOKENS_TEXT);
            return;
        }

        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setUserInput('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent new line
            if (userInput.trim() !== '') {
                onGenerate(userInput);
            }
        }
    };

    return (
        <div className='relative h-[85vh] flex flex-col'>
            <div className='flex-1 overflow-y-scroll scrollbar-hide pl-5'>
                {messages?.length > 0 && messages.map((msg, index) => (
                    <div key={index}
                        className='p-3 rounded-lg mb-4 flex gap-2 items-center leading-7'
                        style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
                        {msg?.role === 'user' && (
                            <Image src={userDetail?.picture} alt='userImage'
                                width={35} height={35} className='rounded-full' />
                        )}
                        <ReactMarkdown className='flex flex-col'>{msg.content}</ReactMarkdown>
                    </div>
                ))}
                {loading &&
                    <div className='p-5 rounded-lg mb-2 flex gap-2 items-center'
                        style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
                        <Loader2Icon className='animate-spin' />
                        <h2>{Lookup.GENERATING_RESPONSE_TEXT}</h2>
                    </div>
                }
            </div>

            {/* Input Section */}
            <div className='flex gap-2 items-end p-3'>
                {userDetail && (
                    <Image src={userDetail?.picture}
                        className='rounded-full cursor-pointer'
                        onClick={toggleSidebar}
                        alt='user' width={30} height={30} />
                )}
                <div className='p-5 border rounded-xl max-w-xl w-full mt-3'
                    style={{ backgroundColor: Colors.BACKGROUND }}>
                    <div className='flex gap-2'>
                        <textarea placeholder={Lookup.INPUT_PLACEHOLDER}
                            value={userInput}
                            onChange={(event) => setUserInput(event.target.value)}
                            onKeyDown={handleKeyDown}
                            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none' />
                        {userInput && (
                            <ArrowRight
                                onClick={() => onGenerate(userInput)}
                                className='bg-[#008d78] p-2 h-10 w-10 rounded-md cursor-pointer' />
                        )}
                    </div>
                    <div>
                        <Link className='h-5 w-5' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatView;
