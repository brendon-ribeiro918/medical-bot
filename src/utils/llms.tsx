// Assuming appropriate types and interfaces are imported or defined elsewhere

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const gpt4 = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.2,
  streaming: true,
  verbose: true,
  timeout: 100000,
  openAIApiKey: process.env.OPEN_AI_KEY,
});

// Prompt Templates
const clinicalNoteWriterTemplate = new PromptTemplate({
  inputVariables: ["transcript"],
  template: `Based on the conversation transcript provided below, generate a clinical note in the following format:
        Reason for Visit:
        Symptoms:
        History of Presenting Illness:
        Current Treatment:
        To have:
        Prescription: List current medications and note if they are being continued, or if any new ones have been added.
        Please consider any information in the transcript that might be relevant to each of these sections, and generate fluently in the patient's language of choice, such as English and French.
        
        ### Example
        Conversation Transcript:
        Patient: “I've been taking the Glycomet-GP 1 as you prescribed, doctor, but I'm still feeling quite unwell. My blood pressure readings are all over the place and my sugar levels are high.”
        Doctor: “I see, we may need to adjust your medications. Let's add Jalra-OD and Telmis to your regimen and see how you respond.”
        Clinical Note:
        Reason for Visit: Uncontrolled Diabetes and Hypertension
        Symptoms: 
          For uncontrolled diabetes:
          -Increased thirst
          -Frequent urination
          -Fatigue
          -Blurred vision
          -Slow healing of wounds
          -Tingling or numbness in the hands or feet
          -Unexplained weight loss
          -Irritability
          For uncontrolled hypertension:
          -Headaches
          -Shortness of breath
          -Nosebleeds
          -Dizziness
          -Chest pain
          -Visual changes
          -Irregular heartbeat
        History of Presenting Illness: The patient has been adhering to their current medication regimen but the diabetes and hypertension seem uncontrolled.
        Current Treatment: Glycomet-GP 1 (tablet) | Glimepiride and Metformin
        To have: None
        Prescription:
        [Continue] Glycomet-GP 1 (tablet) | Glimepiride and Metformin
        [Added] Jalra-OD 100mg (tablet) | Vildagliptin
        [Added] Telmis 20 (Tablet)
        Now, based on the following conversation, please generate a clinical note:
        
        ### Conversation Transcript
        {transcript}`,
});

const cdsHelper = new PromptTemplate({
  inputVariables: ["transcript"],
  template: `Based on the provided transcript snippets from a doctor-patient consultation, please parse the information and generate a differential diagnosis, as well as potential questions the doctor could ask to facilitate the diagnosis process. The results should be organized in the following format:
        Differential Diagnosis: List each possible diagnosis with a model confidence score from 0-100, 100 being most confident.
        Questions to Ask: Provide a list of relevant questions the doctor could ask to further clarify the diagnosis.
        Please consider the patient's stated symptoms, their medical history, and any other relevant information presented in the transcript, and generate fluently in the patient's language of choice, such as English and French. The consultation snippets are as follows:
        
        {transcript}`,
});

const cdsHelperDDXPrompt = new PromptTemplate({
  inputVariables: ["transcript"],
  template: `##DDX model
        Based on the provided transcript snippets from a doctor-patient consultation, parse the information to generate a differential diagnosis. The results should be organized as follows:
        Differential Diagnosis: List each possible diagnosis with a model confidence score from 0-100 (example: [30]), 100 being most confident.
        Please consider the patient's stated symptoms, their medical history, and any other relevant information presented in the transcript, and generate fluently in the patient's language of choice, such as English and French. The consultation snippets are as follows:
        
        {transcript}
        Differential Diagnosis:`,
});

const cdsHelperQAPrompt = new PromptTemplate({
  inputVariables: ["transcript"],
  template: `##Doctor QA model
        Based on the provided transcript snippets from a doctor-patient consultation, internally generate a differential diagnosis based on the patient's stated symptoms, their medical history, and any other relevant information presented in the transcript. Then, suggest potential questions the doctor could ask to facilitate the diagnosis process. The questions should be aimed at clarifying the diagnosis or gathering more information to refine the differential diagnosis.
        The differential diagnosis should not be output. Please generate fluently in the patient's language of choice, such as English and French. The results should be formatted as follows:
        Questions to Ask: Provide a list of top 3 relevant questions the doctor could ask to further clarify the diagnosis. The question is succinct and short.
        The consultation snippets are as follows:
        
        {transcript}
        Questions to Ask:`,
});

const patientInstructionsTemplate = new PromptTemplate({
  inputVariables: ["history", "input"],
  template: `As a medical chatbot named Paco, your task is to answer patient questions about their prescriptions. You should provide complete, scientifically-grounded, and actionable answers to queries, based on the provided recent clinical note.
        Remember to introduce yourself as Paco only at the start of the conversation. You can communicate fluently in the patient's language of choice, such as English and French. If the patient asks a question unrelated to the diagnosis or medications in the clinical note, your response should be, 'I cannot answer this question.'
        
        ### Recent Prescription
        
        Let's begin the conversation:
        {history}
        Patient: {input}
        Paco:`,
});

//LLM chains
const cdsHelperChain = new LLMChain({
  llm: gpt4,
  prompt: cdsHelper,
  verbose: true,
});

const cdsHelperDDXChain = new LLMChain({
  llm: gpt4,
  prompt: cdsHelperDDXPrompt,
  verbose: true,
});

const cdsHelperQAChain = new LLMChain({
  llm: gpt4,
  prompt: cdsHelperQAPrompt,
  verbose: true,
});

const clinicalNoteWriterChain = new LLMChain({
  llm: gpt4,
  prompt: clinicalNoteWriterTemplate,
  verbose: true,
});

const patientInstructorChain = new LLMChain({
  llm: gpt4,
  prompt: patientInstructionsTemplate,
  verbose: true,
});

export {
  gpt4,
  clinicalNoteWriterTemplate,
  cdsHelper,
  cdsHelperDDXPrompt,
  cdsHelperQAPrompt,
  patientInstructionsTemplate,
  cdsHelperChain,
  cdsHelperDDXChain,
  cdsHelperQAChain,
  clinicalNoteWriterChain,
  patientInstructorChain,
};
