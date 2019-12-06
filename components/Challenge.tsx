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

  const [submitted, updateSubmitted] = useState(false);
  const [passText, setPassText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [logs, setLogs]: any[] = useState([]);

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
    let { result, logs }: { result: any; logs: any[] } = await response.json();
    updateSubmitted(true);
    let text = result.passed
      ? "All tests passed! 😎"
      : "At least some tests failed!";
    setPassText(text);
    setErrorText(!result.passed ? result : "");
    setLogs(logs || []);
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
        <strong className="pass-text">{submitted && passText}</strong>
        <span className="error-text">{submitted && errorText}</span>
        <strong>{(submitted && Boolean(logs.length) && "Logs:") || ""}</strong>
        {submitted &&
          Boolean(logs.length) &&
          logs.map((log: string) => (
            <div className="log" key={log}>
              {log}
            </div>
          ))}
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

        .error-name {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Challenge;
