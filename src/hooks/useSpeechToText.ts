/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { franc } from "franc";
import { useState, useEffect } from "react";

const useSpeechRecognition = () => {
  const isBrowserUnsupported =
    typeof window === "undefined" ||
    !("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const [recognizedText, setRecognizedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaDeviceErr, setMediaDeviceErr] = useState(
    isBrowserUnsupported ? "Unsupported Browser" : ""
  );

  if (isBrowserUnsupported) {
    return {
      isRecording,
      isBrowserUnsupported,
      mediaDeviceErr,
      setMediaDeviceErr,
      startSpeechRecognition: () => {},
      stopSpeechRecognition: () => {},
    };
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = true;

  const checkAudioSettings = async () => {
    // prompt access
    await navigator.mediaDevices.getUserMedia({ audio: true });

    // check available device connection
    const devices: MediaDeviceInfo[] =
      await navigator.mediaDevices.enumerateDevices();
    const hasConnection = devices.some(
      (device) => device.kind === "audioinput"
    );

    if (!hasConnection) {
      throw new Error("connection");
    }
  };

  const startSpeechRecognition = async () => {
    try {
      setMediaDeviceErr("");
      setRecognizedText("");
      await checkAudioSettings();
      setIsRecording(true);
    } catch (err) {
      if (err instanceof Error) {
        // Web API Error instance
        if (err instanceof DOMException) {
          return setMediaDeviceErr(
            "Please allow microphone access. Click the microphone icon on the right side of the address bar."
          );
        }
        return setMediaDeviceErr(err.message);
      }
    }
  };

  const stopSpeechRecognition = () => {
    setIsRecording(false);
    setRecognizedText("");
  };

  const detectLanguage = (transcript: string): string => {
    // Detect the language of the recognized speech
    const detectedLanguage: string = franc(transcript);
    return detectedLanguage;
  };

  const handleSpeechResult = (e: any) => {
    const transcript = Array.from(e.results)
      .map((result: any) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log("detected language:", detectLanguage(transcript));
    setRecognizedText(transcript);
  };

  useEffect(() => {
    if (!recognition) return;

    if (isRecording) {
      recognition.start();
      recognition.addEventListener("result", handleSpeechResult);
    } else {
      recognition.removeEventListener("result", handleSpeechResult);
      recognition.stop();
    }

    recognition.onend = () => {
      setIsRecording(false);
    };

    return () => {
      recognition.removeEventListener("result", handleSpeechResult);
      recognition.stop();
    };
  }, [isRecording]);

  return {
    recognizedText,
    isRecording,
    isBrowserUnsupported,
    mediaDeviceErr,
    setMediaDeviceErr,
    startSpeechRecognition,
    stopSpeechRecognition,
  };
};

export default useSpeechRecognition;
