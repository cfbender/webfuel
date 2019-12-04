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

  const [tests, updateTests] = useState(
    `expect(flatten([1, 2, [3, 4, [5, 6], 7, 8], 9, 10])).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);`
  );

  const [testResults, setTestResults] = useState("");

  const handleSubmit = async () => {
    const data = {
      name: "flatten",
      code: text
    };
    await call("/api/test?submit=true", data);
  };

  const handleTest = async () => {
    const data = {
      name: "flatten",
      code: text,
      tests: tests
    };
    await call("/api/test", data);
  };

  const call = async (
    url: string,
    data: { name: string; code: string; tests?: string }
  ) => {
    const response = await fetch(url, {
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
          {`Create a function that flattens an array. eg.
          [1,2,[3,4,[5,6],7,8],9,10] => [1,2,3,4,5,6,7,8,9,10]`}
        </p>
        <button onClick={handleSubmit}>Submit</button>
        <p>{testResults || ""}</p>
      </div>
      <div className="editor">
        <Editor
          id="main"
          gutter={true}
          lineNums={true}
          text={text}
          height={"500px"}
          width={"600px"}
          update={setText}
        />
        <Editor
          id="tests"
          gutter={false}
          lineNums={false}
          text={tests}
          height={"200px"}
          width={"600px"}
          update={updateTests}
        />
        <button onClick={handleTest}>Run Sample Tests</button>
      </div>
      <style jsx global>{`
        p {
          padding: 50px;
        }

        .container {
          display: flex;
          margin: 30px;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
        #main {
          margin: 20px;
        }
        .editor {
          display: flex;
          flex-direction: column;
        }

        #tests {
          margin: 20px;
        }
      `}</style>
    </div>
  );
};

export default Challenge;
