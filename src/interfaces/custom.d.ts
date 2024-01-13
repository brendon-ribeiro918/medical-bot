export declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    SpeechRecognitionEvent: any;
  }
}

export interface History {
  timestamp: string;
  patient?: string;
  paco?: string;
}
