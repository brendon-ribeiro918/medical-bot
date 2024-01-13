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
