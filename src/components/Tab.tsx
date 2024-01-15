interface TabProps {
  tabIndex: number;
  setTabIndex: Function;
  recordAllowed: boolean;
}

export default function Tab({
  tabIndex,
  setTabIndex,
  recordAllowed,
}: TabProps) {
  return (
    <ul className="flex w-[100%] rounded-br-4 bg-black-4 py-[2px] px-[2px]">
      <li
        className={`w-[125px] py-[12px] cursor-pointer bg-${
          tabIndex === 0 ? "white" : "black-4"
        } rounded-${tabIndex === 0 ? "br-4" : "0px"}`}
        onClick={() => setTabIndex(0)}
      >
        <p
          className={`text-center text-${
            tabIndex === 0 ? "blue" : "black-2"
          } text-fs-5 font-[600]`}
          style={{}}
        >
          Transcript
        </p>
      </li>
      <li
        className={`w-[94px] py-[12px] cursor-pointer bg-${
          tabIndex === 1 ? "white" : "black-4"
        } rounded-${tabIndex === 1 ? "br-4" : "0px"}`}
        onClick={() => setTabIndex(1)}
      >
        <p
          className={`text-center text-${
            tabIndex === 1 ? "blue" : "black-2"
          } text-fs-5 font-[600]`}
        >
          AAD
        </p>
      </li>
      <li
        className={`py-[12px] cursor-pointer bg-${
          tabIndex === 2 ? "white" : "black-4"
        } rounded-${tabIndex === 2 ? "br-4" : "0px"} ${
          recordAllowed ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{ width: "calc(100% - 220px)" }}
        onClick={() => {
          if (!recordAllowed) {
            setTabIndex(2);
          }
        }}
      >
        <p
          className={`text-center text-${
            tabIndex === 2 ? "blue" : "black-2"
          } text-fs-5 font-[600]`}
        >
          Complete-rendu
        </p>
      </li>
    </ul>
  );
}
