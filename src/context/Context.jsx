import { createContext, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();
import { useState } from "react";

const ContextProvider =(props) =>{

  const[input,setInput] = useState("");
  const[recentPrompts,setRecentPrompts] = useState("");
  const[previousPrompts,setPreviousPrompts] = useState([]);
  const[showResult,setShowResult] = useState(false);
  const[loading,setLoading] = useState(false);
  const[resultData,setResultData] = useState("");

  const onSent = async (prompt) => {
    
    setResultData("");
    setLoading(true);
    setShowResult(true);
     await runChat(input)
    const response = await runChat(input);
    setResultData(response);
    setLoading(false);
    const updatedPrompts = [...previousPrompts, { prompt: input, response: response }];
    setPreviousPrompts(updatedPrompts);
    setInput("");
    console.log(previousPrompts);
  }

  const contextValue = {  
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,

  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
}

// const ContextProvider = (props) => {

//   const onSent = async (prompt) => {
    
//     const res = await fetch("/api/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt }),
//     });
//     const data = await res.json();
//     console.log(data.text);
//   };

//   useEffect(() => {
//     onSent("what is react js?");
//   }, []);

//   const contextValue = { onSent };

//   return (
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

export default ContextProvider;
