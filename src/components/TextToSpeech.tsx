"use client"

import React, { useEffect, useState } from 'react'
import { sayInput, populateVoiceList } from '@/app/api/voice/route';

const selectValues = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

interface voiceProps {
  voiceURI: string;
  name: string;
  lang: string;
  default: boolean;
}

const TextToSpeech = () => {
    const [textInput, setTextInput] = useState('');
    const [voiceList, setVoiceList] = useState<any>([]);
    const [voiceOptions, setVoiceOptions] = useState([]);
    const [voice, setVoice] = useState('Alex');
    const [pitch, setPitch] = useState<number>(1);
    const [rate, setRate] = useState<number>(1);

    useEffect(() => {
        const fetchVoices = () => {
          try {
            setVoiceList(window.speechSynthesis.getVoices().sort((a: any, b: any) => a.name.localeCompare(b.name)))
          } catch (err) {
            console.log(err);
          }
        };
        fetchVoices();
      }, []);
    
      useEffect(() => {
        setVoiceOptions(
          voiceList.length ? (
            voiceList?.map(({ name, lang }: voiceProps, i: number) => (
              <option value={name} key={i}>
                {name} - {lang}
              </option>
            ))
          ) : (
            <option value='Alex'>Alex - en-US</option>
          )
        );
      }, [voiceList]);
    
      useEffect(() => {
        setVoice((prevVoice: any) =>
          voiceList.length > 0
            ? voiceList?.filter((voice: any) => voice.default)[0].name
            : prevVoice
        );
      }, [voiceList]);
    
      const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        textInput.length && sayInput(textInput, voice, pitch, rate);
      };
    

  return (
    <div className='flex flex-col text-center bg-white p-8 rounded-lg shadow-lg '>
        <h1 className="text-3xl font-bold mb-4 text-center">Text to Speech</h1>

      <form autoComplete='off' onSubmit={handleSubmit} className='space-y-6 '>

        <div className="flex flex-row justify-center items-center">

            {/* Voice Selection */}
            <div className='w-1/4 min-w-[150px] mx-auto'>
            <label htmlFor='voices-id' className='block mb-2 text-sm font-medium text-gray-900'>
                Voices
            </label>
            <select
                id='voices-id'
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className='block w-full p-2.5 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
            >
                {voiceOptions}
            </select>
            </div>

            {/* Rate Selection */}
            <div className='w-1/6 min-w-[75px] mx-auto'>
            <label htmlFor='rate-id' className='block mb-2 text-sm font-medium text-gray-900'>
                Rate
            </label>
            <select
                id='rate-id'
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className='block w-full p-2.5 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
            >
                {selectValues.map((value, i) => (
                <option value={value} key={i}>
                    {value}
                </option>
                ))}
            </select>
            </div>

            {/* Pitch Selection */}
            <div className='w-1/6 min-w-[75px] mx-auto'>
            <label htmlFor='pitch-id' className='block mb-2 text-sm font-medium text-gray-900'>
                Pitch
            </label>
            <select
                id='pitch-id'
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className='block w-full p-2.5 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
            >
                {selectValues.map((value, i) => (
                <option value={value} key={i}>
                    {value}
                </option>
                ))}
            </select>
            </div>
           
        </div>

        {/* Input Text */}
        <div className='w-full'>
          <label htmlFor='text-input' className='block mb-2 text-sm font-medium text-gray-900'>
            Input Text
          </label>
          <textarea
            id='text-input'
            rows={8}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className='block p-2.5 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        {/* Button Group */}
        <div className='flex justify-center space-x-4'>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
          >
            Talk to me
          </button>
          <button
            type='button'
            className='px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300'
            onClick={() => window.speechSynthesis.pause()}
          >
            Pause
          </button>
          <button
            type='button'
            className='px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300'
            onClick={() => window.speechSynthesis.resume()}
          >
            Resume
          </button>
          <button
            type='button'
            className='px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300'
            onClick={() => window.speechSynthesis.cancel()}
          >
            Stop
          </button>
        </div>
      </form>
    </div>
  )
}

export default TextToSpeech
