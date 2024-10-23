"use client"

// import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import useClipboard from "react-use-clipboard";

export default function SpeechToText() {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      const startListening = () => SpeechRecognition.startListening({ continuous: true,language: 'en-IN' });
      const [textToCopy, setTextToCopy] = useState('');
    //   const [isCopied, setCopied] = useClipboard(textToCopy, {
    //     successDuration:1000
    // });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);



  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">Speech to Text</h1>

        <div onClick={() =>  setTextToCopy(transcript)} className="w-full h-40 p-4 border border-gray-300 rounded-md mb-4 bg-gray-100 overflow-y-auto">
          {transcript}
        </div>

        <button onClick={startListening}  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2">
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}  className="bg-red-500 hover-bg-red-600 text-white py-2 px-4 rounded-md mr-2">
          Stop
        </button>
        {/* <button onClick={setCopied}  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
        {isCopied ? 'Copied!' : 'Copy to clipboard'}
        </button> */}
      </div>
    </div>
  );
}