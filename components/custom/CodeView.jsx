"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { MessagesContext } from '@/context/MessagesContext';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { countToken } from './ChatView';
import { UserDetailContext } from '@/context/UserDetailContext';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from '@/context/ActionContext';
import { toast } from 'sonner';
function CodeView() {
  const { id } = useParams();
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE)
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles)
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const { action, setAction } = useContext(ActionContext);

  // const [aiResponseReceived, setAiResponseReceived] = useState(false);

  // useEffect(() => {
  //   if (aiResponseReceived) {
  //     setActiveTab('preview'); // Switch to preview after AI response
  //     setAiResponseReceived(false); // Reset state
  //   }
  // }, [aiResponseReceived]);


  useEffect(() => {
    id && GetFiles();
  }, [id])

  useEffect(() => {
    action && setActiveTab('preview');
  }, [action])


  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData }
    setFiles(mergedFiles);
    setLoading(false)
  }

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GenerateAiCode();
      }
    }
  }, [messages])

  const GenerateAiCode = async () => {
    setLoading(true)
    try {
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
      const result = await axios.post('/api/gen-ai-code', {
        prompt: PROMPT
      });
      console.log(result.data);
      const aiResp = result.data;

      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files }
      setFiles(mergedFiles);
      await UpdateFiles({
        workspaceId: id,
        files: aiResp?.files
      });

      const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      //Update Tokens in Database 
      await UpdateTokens({
        userId: userDetail?._id,
        token: token
      })
      setUserDetail(prev => ({
        ...prev,
        token: token
      }))

      setActiveTab('code')
      setLoading(false);

      // setAiResponseReceived(true);
    }
    catch (e) {
      toast("Hubo un problema. Error: ", e)
      setLoading(false);
    }
  }

  return (
    <div className='relative'>
      <div className='bg-[#181818] w-full p-2 border rounded-t-md'>
        <div className='flex items-center flex-wrap shrink-0 bg-black p-1 justify-center rounded-full w-[166px] gap-1'>
          <h2
            onClick={() => setActiveTab('code')}
            className={`text-sm cursor-pointer p-1 px-2
            ${activeTab == 'code' && 'text-[#008d78] bg-[#008d78] bg-opacity-25 rounded-full'}`}>
            {Lookup.CODE_TEXT}</h2>
          <h2
            onClick={() => setActiveTab('preview')}
            className={`text-sm cursor-pointer p-1 px-2
            ${activeTab == 'preview' && 'text-[#008d78] bg-[#008d78] bg-opacity-25 rounded-full'}`}>
            {Lookup.PREVIEW_TEXT}</h2>
        </div>
      </div>
      <SandpackProvider
        files={files}
        template="react" theme={'dark'}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY
          }
        }}
        options={{
          externalResources: ['https://cdn.tailwindcss.com']
        }}
      >
        <SandpackLayout>
          {activeTab == 'code' ? <>
            <SandpackFileExplorer style={{ height: '80vh' }} />
            <SandpackCodeEditor style={{ height: '80vh' }} />
          </> :
            <>
              <SandpackPreviewClient showNavigator={true} showRefresh={true}/>
            </>}

        </SandpackLayout>
      </SandpackProvider>

      {loading && <div className='p-10 bg-black opacity-30
      absolute top-0 rounded-lg w-full h-full flex items-center justify-center'>
        <Loader2Icon className='animate-spin h-10 w-10 text-white mr-2' />
        <h2 className='text-white'>{Lookup.GENERATING_FILES_TEXT}</h2>
      </div>}

    </div>
  )
}

export default CodeView