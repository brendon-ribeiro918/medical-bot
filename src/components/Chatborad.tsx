"use client";

import { useState } from "react";
import Image from "next/image";

import HeaderBar from "@/components/HeaderBar";
import Tab from "@/components/Tab";
import Transcript from "@/components/Transcript";
import AAD from "@/components/AAD";
import CompleteRendu from "@/components/CompleteRendu";
import CancelImg from "@/assets/images/cancel.svg";

export default function Chatborad() {
  const [language, setLanguage] = useState("english");
  const [tabIndex, setTabIndex] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [AADResult, setAADResult] = useState();
  const [summary, setSummary] = useState();
  const [recordAllowed, setRrecordAllowed] = useState(false);

  return (
    <div className="font-mulish relative w-[410px] h-[810px] bg-white rounded-br-1 overflow-hidden">
      <div className="absolute top-[5px] right-[5px] flex justify-center align-center w-[20px] h-[20px] rounded-full hover:bg-black-2">
        <button>
          <Image src={CancelImg} alt="No Cancel image" />
        </button>
      </div>
      <div className="mt-[30px] px-[22px]">
        <HeaderBar
          setTabIndex={setTabIndex}
          setRrecordAllowed={setRrecordAllowed}
          setIsNewRecord={setIsNewRecord}
          setLanguage={setLanguage}
        />
      </div>
      <div className="mt-[16px] w-[370px] mx-[auto]">
        <Tab
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          recordAllowed={recordAllowed}
        />
      </div>
      <div
        className={`mt-[25px] w-[100%] absolute transition-all duration-[1000ms] ease-out`}
        style={{
          height: "calc(100% - 155px)",
          left: tabIndex === 0 ? "0px" : "-100%",
        }}
      >
        <Transcript
          setAADResult={setAADResult}
          setSummary={setSummary}
          recordAllowed={recordAllowed}
          isNewRecord={isNewRecord}
          setIsNewRecord={setIsNewRecord}
          language={language}
        />
      </div>
      <div
        className={`my-[25px] px-[25px] w-[100%] absolute transition-all duration-[1000ms] ease-out`}
        style={{
          height: "calc(100% - 155px)",
          right: tabIndex === 1 ? "0px" : "-100%",
        }}
      >
        <AAD result={AADResult} />
      </div>
      <div
        className={`my-[35px] px-[35px] w-[100%] absolute transition-all duration-[1000ms] ease-out`}
        style={{
          height: "calc(100% - 190px)",
          left: tabIndex === 2 ? "0px" : "-100%",
        }}
      >
        <CompleteRendu result={summary} />
      </div>
    </div>
  );
}
