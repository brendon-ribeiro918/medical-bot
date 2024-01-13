import Image from "next/image";
import CopyImg from "@/assets/images/copy.svg";
import { extractData } from "@/utils/helpers";

interface Props {
  result: any;
}

export default function CompleteRendu({ result }: Props) {
  console.log("summary_result", result);
  return (
    <div className="relative h-[100%] w-[100%] overflow-y-auto">
      {result && (
        <ul className="">
          <li className="">
            <div className="flex">
              <h1 className="text-blue text-fs-5 font-[600] leading-[95%] uppercase">
                motif de visite
              </h1>
              <div className="ml-[5px]">
                <button>
                  <Image src={CopyImg} alt="No Copy image" />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <pre className="text-black-2 text-fs-5 font-[500] font-mulish whitespace-pre-line leading-150 break-words">
                {extractData(result, "Reason for Visit:", "Symptoms:")}
              </pre>
            </div>
          </li>
          <li className="mt-4">
            <div className="flex">
              <h1 className="text-blue text-fs-5 font-[600] leading-[95%] uppercase">
                Symptômes
              </h1>
              <div className="ml-[5px]">
                <button>
                  <Image src={CopyImg} alt="No Copy image" />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <pre className="text-black-2 text-fs-5 font-[500] font-mulish whitespace-pre-line leading-150 break-words">
                {extractData(
                  result,
                  "Symptoms:",
                  "History of Presenting Illness:"
                )}
              </pre>
            </div>
          </li>
          <li className="mt-4">
            <div className="flex">
              <h1 className="text-blue text-fs-5 font-[600] leading-[95%] uppercase">
                HISTOIRE DE LA MALADIE
              </h1>
              <div className="ml-[5px]">
                <button>
                  <Image src={CopyImg} alt="No Copy image" />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <pre className="text-black-2 text-fs-5 font-[500] font-mulish whitespace-pre-line leading-150 break-words">
                {extractData(
                  result,
                  "History of Presenting Illness:",
                  "Current Treatment:"
                )}
              </pre>
            </div>
          </li>
          <li className="mt-4">
            <div className="flex">
              <h1 className="text-blue text-fs-5 font-[600] leading-[95%] uppercase">
                Traitements en cours
              </h1>
              <div className="ml-[5px]">
                <button>
                  <Image src={CopyImg} alt="No Copy image" />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <pre className="text-black-2 text-fs-5 font-[500] font-mulish whitespace-pre-line leading-150 break-words">
                {extractData(result, "Current Treatment:", "To have:")}
              </pre>
            </div>
          </li>
          <li className="mt-4">
            <div className="flex">
              <h1 className="text-blue text-fs-5 font-[600] leading-[95%] uppercase">
                Conduite a tenir
              </h1>
              <div className="ml-[5px]">
                <button>
                  <Image src={CopyImg} alt="No Copy image" />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <pre className="text-black-2 text-fs-5 font-[500] font-mulish whitespace-pre-line leading-150 break-words">
                {extractData(result, "To have:", "Prescription:")}
              </pre>
            </div>
          </li>
          <li className="mt-4">
            <div className="flex">
              <h1 className="text-blue text-fs-5 font-[600] leading-[95%] uppercase">
                Prescription
              </h1>
              <div className="ml-[5px]">
                <button>
                  <Image src={CopyImg} alt="No Copy image" />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <pre className="text-black-2 text-fs-5 font-[500] font-mulish whitespace-pre-line leading-150 break-words">
                {extractData(result, "Prescription:", "")}
              </pre>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
