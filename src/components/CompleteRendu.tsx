import Image from "next/image";
import CopyImg from "@/assets/images/copy.svg";

export default function CompleteRendu() {
  return (
    <div className="relative h-[100%] w-[100%] overflow-y-auto">
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
          <ul>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Cephalees
                </p>
              </div>
            </li>
          </ul>
        </li>
        <li className="">
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
          <ul>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Douleurs musculaires
                </p>
              </div>
            </li>
          </ul>
        </li>
        <li className="">
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
          <ul>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Presence de maux de tete
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Douleurs cervicales
                </p>
              </div>
            </li>
          </ul>
        </li>
        <li className="">
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
          <ul>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Absence de traitment medicamenteux
                </p>
              </div>
            </li>
          </ul>
        </li>
        <li className="">
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
          <ul>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Recommendation de prise de doliprane
                </p>
              </div>
            </li>
          </ul>
        </li>
        <li className="">
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
          <ul>
            <li>
              <div className="flex items-center">
                <p className="text-black-2 text-fs-5 font-[500] leading-[95%]">
                  -
                </p>
                <p className="ml-[5px] text-black-2 text-fs-5 font-[500] leading-[95%]">
                  Doliprane
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
