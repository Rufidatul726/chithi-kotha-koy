// page.tsx from app [base page]

import Navbar from "@/components/Navbar";
import SpeechToText from "@/components/SpeechToText";
import TextToSpeech from "@/components/TextToSpeech";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function HomePage() {
  const authSession = await getServerAuthSession();

  return (  
  <main>
    {authSession?.user && (
      <>
      <Navbar user={authSession?.user}/>
      <div className="flex justify-between items-center p-4 m-5">
          <SpeechToText/>
          <TextToSpeech/>
      </div>
      </>
    )} 
    {!authSession?.user && ( 
      <div className="flex w-screen h-screen justify-center items-center p-4 m-5"> 
        <Link className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white" href="/auth">
          Authenticate Here!
        </Link> 
      </div>
      
    )}
  </main>
  );
}