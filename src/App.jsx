import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  
  

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("loading ...");
    try {
      const response = await axios({
       
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAy4ZdxG-4YzHfWsy_XW7sIwlR3e4DRL-4",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question + "in typescript" }] }],
        },
        
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }
  return (
    <div className="bg-gray-900 h-screen flex justify-between">
      <div className="p-3">
        <form onSubmit={generateAnswer} className="h-full m-auto text-center rounded bg-gray-700 py-2 ">
         <h2 className='text-gray-200 text-2xl p-20'>Text To Code</h2>
          <textarea
            required
            className="border rounded w-11/12 h-11/12 my-2 min-h-fit p-4  mt-50"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Generate Code in Typescript or Javascript"
          ></textarea>
          <button
            type="submit"
            className="bg-gray-900 text-gray-200  mt-70 p-3 rounded-md hover:bg-gray-300 hover:text-gray-900 transition-all duration-300"
            disabled={generatingAnswer}
          >
            Generate Code 
          </button>
        </form>

        {/* <div className="w-full h-full  m-auto text-left rounded bg-gray-700 my-1">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div> */}

       
      </div>

      <div className="w-full  text-center rounded bg-gray-700 border-2 m-2 flex justify-between">
          
          <div>
          <ReactMarkdown className="p-3 text-gray-200 text-left">{answer}</ReactMarkdown>
          </div>
          <div className="bg-gray-700 h-20 ">
            <button className="ring-2 ring-black border-1 border-gray-400 text-gray-200 rounded-md text-xl p-2 m-2">Javascript</button><br />
            <button className="ring-2 ring-black border-1 border-gray-400 text-gray-200 rounded-md text-xl p-2 m-2">Typescipt</button>
          </div>
          

      </div>

    
    </div>
  );
}

export default App;

