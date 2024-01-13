import { OutputType, combineMessages, transformArray } from "@/utils/helpers";

import {
  cdsHelperDDXChain,
  cdsHelperQAChain,
  clinicalNoteWriterChain,
  patientInstructorChain,
} from "@/utils/llms";

export async function POST(request: Request) {
  const { historyData } = await request.json();
  const history: OutputType[] = transformArray(historyData);
  const transcript = combineMessages(history);
  const patient_response = await patientInstructorChain.call({
    input: history[history.length - 1]["patient"],
    history: history.slice(0, -1),
  });
  const possible_diagnosis = await cdsHelperDDXChain.call({
    transcript: transcript,
  });
  const possible_question = await cdsHelperQAChain.call({
    transcript: transcript,
  });
  const summary = await clinicalNoteWriterChain.call({
    transcript: transcript,
  });

  const time = new Date().toISOString();
  historyData.push({ timestamp: time, paco: patient_response.text });

  console.log(
    "historyData===========>",
    history,
    "transcript===========>",
    transcript,
    "patient_response===========>",
    historyData,
    "possible_diagnosis===========>",
    possible_diagnosis,
    "possible_question===========>",
    possible_question,
    "summary===========>",
    summary
  );

  const data = {
    patient_response_history: historyData,
    possible_diagnosis: possible_diagnosis.text,
    possible_question: possible_question.text,
    summary: summary.text,
  };
  return Response.json({ data });
}
