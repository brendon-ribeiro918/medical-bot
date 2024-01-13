export const fetchData = (
  bodyData: any,
  setHistoryState: React.Dispatch<React.SetStateAction<any>>,
  setAADState: React.Dispatch<React.SetStateAction<any>>,
  setSummary: React.Dispatch<React.SetStateAction<any>>
) => {
  window
    .fetch("https://medical-bot.netlify.app/api", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.text().then((data) => {
        const resObj = JSON.parse(data);
        console.log("response_data===========>", resObj.data);
        setHistoryState(resObj.data.patient_response_history);
        setAADState({
          possible_diagnosis: resObj.data.possible_diagnosis,
          possible_question: resObj.data.possible_question,
        });
        setSummary(resObj.data.summary);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
