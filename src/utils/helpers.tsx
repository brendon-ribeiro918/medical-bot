export type InputType = { timestamp: string; [key: string]: string };
export type OutputType = { [key: string]: string };
export type MessageObject = { patient?: string; paco?: string };

export const transformArray = (inputArray: InputType[]): OutputType[] => {
  return inputArray.map(({ timestamp, ...rest }) => rest);
};

export const combineMessages = (arr: MessageObject[]): string => {
  const patientMessage = arr.find((obj) => obj.patient)?.patient;
  const pacoMessage = arr.find((obj) => obj.paco)?.paco;
  return `${patientMessage ?? ""}. ${pacoMessage ?? ""}`.trim();
};

export const extractData = (
  text: string,
  start: string,
  end: string
): string => {
  const startIndex = text.indexOf(start);
  let endIndex: number;
  if (end === "") {
    endIndex = text.length;
  } else {
    endIndex = text.indexOf(end, startIndex + start.length);
  }
  if (startIndex !== -1 && endIndex !== -1) {
    return text.substring(startIndex + start.length, endIndex).trim();
  } else {
    return "Data not found";
  }
};
