import React, { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic({
  loader: () => import("../components/Editor"),
  /* eslint-disable react/display-name */
  loading: () => <p>Loading ...</p>,
  ssr: false
});
const Challenge = () => {
  const [text, setText] = useState(`function flatten(arr) {
    //code here
}`);

  const [testResults, setTestResults] = useState("");

  const handleSubmit = async () => {
    const data = {
      name: "flatten",
      code: text,
      tests: [
        {
          input: [1, 2, [3, 4, [5, 6], 7, 8], 9, 10],
          output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
      ]
    };
    const response = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(data)
    });
    let result: any = await response.json();
    const resultText = result.passed ? "All tests passed!" : "Tests failed";
    setTestResults(resultText);
  };
  return (
    <div className="container">
      <div className="info">
        <h2>Flatten Array</h2>

        <p>
          Create a function that flattens an array. eg.
          [1,2,[3,4,[5,6],7,8],9,10] => [1,2,3,4,5,6,7,8,9,10]
        </p>

        <p>{testResults || ""}</p>
      </div>
      <div className="editor">
        <Editor text={text} update={setText} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <style jsx global>{`
        p {
          padding: 50px;
        }

        .container {
          display: flex;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
        #editor {
          margin: 20px;
        }
        .editor {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Challenge;
