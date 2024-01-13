"use client";

import Image from "next/image";
import StopImg from "@/assets/images/stop.svg";
import StartImg from "@/assets/images/mic.svg";
import useSpeechRecognition from "@/hooks/useSpeechToText";
import { useState } from "react";

interface Props {
  setTabIndex: Function;
  setRrecordAllowed: Function;
  setIsNewRecord: Function;
}

export default function HeaderBar({
  setTabIndex,
  setRrecordAllowed,
  setIsNewRecord,
}: Props) {
  const [isRecording, setIsRecording] = useState(true);
  const { stopSpeechRecognition, startSpeechRecognition } =
    useSpeechRecognition();

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
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-fs-4 text-blue font-montserrat font-[600]">
        Doc Copilot
      </h1>
      {isRecording ? (
        <button
          className="flex items-center p-[9px] bg-red rounded-br-3"
          onClick={() => onStop()}
        >
          <Image src={StopImg} alt="No Stop image" />
          <p className="pl-[8px] text-white text-fs-1 font-[500] leading-[95%]">
            Arrêter la consultation
          </p>
        </button>
      ) : (
        <button
          className="flex items-center p-[9px] bg-blue rounded-br-3"
          onClick={() => onStart()}
        >
          <Image src={StartImg} alt="No Start image" />
          <p className="pl-[8px] text-white text-fs-1 font-[500] leading-[95%]">
            Nouvel enregistrement
          </p>
        </button>
      )}
    </div>
  );
}
