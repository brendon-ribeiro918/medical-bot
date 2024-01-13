import {
  MessageObject,
  OutputType,
  combineMessages,
  transformArray,
} from "@/utils/helpers";

import {
  cdsHelperChain,
  cdsHelperDDXChain,
  cdsHelperQAChain,
  clinicalNoteWriterChain,
  patientInstructorChain,
} from "@/utils/llms";
import { stateStore } from "@/utils/state";

export async function POST(request: Request) {
  const { historyData } = await request.json();
  const history: OutputType[] = transformArray(historyData);
  const transcript = combineMessages(history);
  const patient_response = await patientInstructorChain.call({
    input: history[history.length - 1]["patient"],
    history: history.slice(0, -1),
    // doctor_summary: stateStore["doctorSummary"],
  });
  const possible_diagnosis = await cdsHelperDDXChain.call({
    transcript: transcript,
  });
  const possible_question = await cdsHelperQAChain.call({
    transcript: transcript,
  });

  const time = new Date().toISOString();
  historyData.push({ timestamp: time, paco: patient_response.text });

  console.log(
    "history from memory",
    history,
    111,
    transcript,
    222,
    historyData,
    333,
    possible_diagnosis,
    444,
    possible_question
  );

  const data = {
    patient_response_history: historyData,
    possible_diagnosis: possible_diagnosis.text,
    possible_question: possible_question.text,
  };
  return Response.json({ data });
  // const data = await res.json()
}
