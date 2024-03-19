"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { History } from "@/interfaces/custom";
import SubmitImg from "@/assets/images/submit.svg";
import useSpeechRecognition from "@/hooks/useSpeechToText";
import { fetchData } from "@/utils/api";

interface Props {
  recordAllowed: boolean;
  setAADResult: React.Dispatch<React.SetStateAction<any>>;
  setSummary: React.Dispatch<React.SetStateAction<any>>;
  isNewRecord: boolean;
  setIsNewRecord: Function;
}

export default function Transcript({
  recordAllowed,
  setAADResult,
  setSummary,
  isNewRecord,
  setIsNewRecord,
}: Props) {
  const [history, setHistory] = useState<History[]>([]);
  const [val, setVal] = useState<string>("");
  const [speaker, setSpeaker] = useState<string>("Patient"); // ["Patient", "Paco"]
  const [isReady, setIsReady] = useState<boolean>(false);
  const {
    recognizedText,
    isRecording,
    startSpeechRecognition,
    stopSpeechRecognition,
  } = useSpeechRecognition();

  const addScript = () => {
    if (recordAllowed) {
      setVal("");
      setSpeaker((prev) => (prev === "Patient" ? "Paco" : "Patient"));
      const speakerKey = speaker === "Patient" ? "patient" : "paco";
      setHistory((prev) => [
        ...prev,
        { timestamp: new Date().toISOString(), [speakerKey]: val },
      ]);
      setIsReady(true);
    }
  };
  useEffect(() => {
    if (!recordAllowed) {
      stopSpeechRecognition();
    }
  }, [recordAllowed, stopSpeechRecognition]);

  useEffect(() => {
    if (isNewRecord) {
      setIsNewRecord(false);
      setHistory([]);
      setIsReady(false);
      setAADResult(undefined);
      setSummary(undefined);
    }
  }, [isNewRecord, setIsNewRecord, setAADResult, setSummary]);

  useEffect(() => {
    if (isRecording) {
      setIsReady(false);
    }
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording && recordAllowed) {
      if (recognizedText) {
        const time = new Date().toISOString();
        setHistory((prev) => [
          ...prev,
          { timestamp: time, patient: recognizedText },
        ]);
        setIsReady(true);
      }
      startSpeechRecognition();
    }
  }, [
    isRecording,
    recordAllowed,
    recognizedText,
    history,
    startSpeechRecognition,
  ]);

  useEffect(() => {
    if (isReady && history.length > 0) {
      setIsReady(false);
      fetchData({ historyData: history }, setAADResult, setSummary);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, history]);

  return (
    <div className="relative h-[100%] w-[100%]">
      <div
        className="px-[45px] mx-[auto] overflow-y-auto"
        style={{ height: "calc(100% - 60px)" }}
      >
        <ul>
          {history?.map((item: History) => {
            const current_time = new Date().toISOString();
            const delta_time =
              new Date(current_time).getTime() -
              new Date(item.timestamp).getTime();
            const minutesAgo = Math.floor(delta_time / (1000 * 60));
            return (
              <li key={item.timestamp} className="mt-2">
                <h1 className="text-black-0 text-fs-5 font-[600] leading-[95%]">
                  {minutesAgo}m ago
                </h1>
                <p className="mt-[5px] text-black-3 text-fs-2 font-[400] leading-[95%">
                  {item.patient || item.paco}
                </p>
              </li>
            );
          })}
        </ul>
        {!isReady && recognizedText && (
          <div>
            <h1 className="text-black-0 text-fs-5 font-[600] leading-[95%]">
              0m ago
            </h1>
            <p className="mt-[5px] text-black-3 text-fs-2 font-[400] leading-[95%">
              {recognizedText}
            </p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 px-[25px] w-[100%] h-[60px]">
        <div className="flex justify-center items-center w-[100%] h-[100%]">
          <div className="flex justify-between items-center w-[100%]">
            <input
              className={`w-[305px] px-[8px] py-[11px] bg-black-5 text-black-0 text-fs-3 font-[600] leading-[95%] rounded-br-2 ${
                !recordAllowed ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              placeholder="Enter your sentence"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              disabled={!recordAllowed}
            />
            <button
              className={`flex justify-center items-center w-[40px] h-[40px] bg-black-5 ${
                !recordAllowed ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => addScript()}
              disabled={!recordAllowed}
            >
              <Image src={SubmitImg} alt="No Submit image" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
