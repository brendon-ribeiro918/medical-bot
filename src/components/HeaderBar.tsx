"use client";

import Image from "next/image";
import StopImg from "@/assets/images/stop.svg";
import StartImg from "@/assets/images/mic.svg";
import useSpeechRecognition from "@/hooks/useSpeechToText";
import { useState, ChangeEvent } from "react";

interface Props {
  setTabIndex: Function;
  setRrecordAllowed: Function;
  setIsNewRecord: Function;
  setLanguage: Function;
}

export default function HeaderBar({
  setTabIndex,
  setRrecordAllowed,
  setIsNewRecord,
  setLanguage,
}: Props) {
  const [selectedOption, setSelectedOption] = useState("english");
  const [isRecording, setIsRecording] = useState(false);
  const { stopSpeechRecognition, startSpeechRecognition } =
    useSpeechRecognition(selectedOption);

  const onStop = () => {
    setIsRecording(false);
    setRrecordAllowed(false);
    stopSpeechRecognition();
  };
  const onStart = () => {
    setIsRecording(true);
    setIsNewRecord(true);
    setRrecordAllowed(true);
    setTabIndex(0);
    startSpeechRecognition();
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    stopSpeechRecognition();
    setSelectedOption(e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-fs-5 text-blue font-montserrat font-[800]">
        Doc Copilot
      </h1>
      <div className="ml-20">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-1 rounded-br-1 leading-tight focus:outline-none focus:shadow-outline text-black-1 font-mulish font-[500] text-fs-1"
        >
          <option value="english">English</option>
          <option value="french">French</option>
        </select>
      </div>
      {isRecording ? (
        <button
          className="flex items-center p-[9px] bg-red rounded-br-3"
          onClick={() => onStop()}
        >
          <Image src={StopImg} alt="No Stop image" />
          <p className="pl-[8px] text-white text-fs-1 font-[500] leading-[95%]">
            Stop consultation
          </p>
        </button>
      ) : (
        <button
          className="flex items-center p-[9px] bg-blue rounded-br-3"
          onClick={() => onStart()}
        >
          <Image src={StartImg} alt="No Start image" />
          <p className="pl-[8px] text-white text-fs-1 font-[500] leading-[95%]">
            New recording
          </p>
        </button>
      )}
    </div>
  );
}
