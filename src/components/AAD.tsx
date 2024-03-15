import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  result: any;
}

export default function AAD({ result }: Props) {
  return (
    <div className="relative h-[100%] w-[100%]">
      <div className="min-h-[325px]">
        <div className="bg-blue p-[16px]">
          <h1 className="text-white text-fs-5 font-[600] leading-[95%]">
            Questionnaire
          </h1>
        </div>
        {result ? (
          <div className="p-[20px] w-[100%] h-[270px] border-x-[1px] border-b-[1px] border-black-4 border-solid overflow-y-auto overflow-x-hidden">
            <pre className="text-black-1 text-fs-2 font-[400] font-mulish whitespace-pre-line leading-150 break-words">
              {result.possible_question}
            </pre>
          </div>
        ) : (
          <div className="mt-2 h-[270px] flex justify-center items-center ">
            <ClipLoader
              loading={true}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
      <div className="min-h-[290px] mt-[16px]">
        <div className="bg-blue p-[16px]">
          <h1 className="text-white text-fs-5 font-[600] leading-[95%]">
            Diagnostic Probable
          </h1>
        </div>
        {result ? (
          <div className="p-[20px] w-[100%] h-[235px] border-x-[1px] border-b-[1px] border-black-4 border-solid overflow-y-auto overflow-x-hidden">
            <pre className="text-black-1 text-fs-2 font-[400] font-mulish whitespace-pre-line leading-150 break-words">
              {result?.possible_diagnosis}
            </pre>
          </div>
        ) : (
          <div className="mt-2 h-[235px] flex justify-center items-center">
            <ClipLoader
              loading={true}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
}
