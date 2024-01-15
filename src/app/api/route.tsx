import { OutputType, combineMessages, transformArray } from "@/utils/helpers";

import {
  cdsHelperDDXChain,
  cdsHelperQAChain,
  clinicalNoteWriterChain,
} from "@/utils/llms";

export async function POST(request: Request) {
  const { historyData } = await request.json();
  const history: OutputType[] = transformArray(historyData);
  const transcript = combineMessages(history);

  const possible_diagnosis = await cdsHelperDDXChain.call({
    transcript: transcript,
  });
  const possible_question = await cdsHelperQAChain.call({
    transcript: transcript,
  });
  const summary = await clinicalNoteWriterChain.call({
    transcript: transcript,
  });

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
    possible_diagnosis: possible_diagnosis.text,
    possible_question: possible_question.text,
    summary: summary.text,
  };
  return Response.json({ data });
}
