import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic({
  loader: () => import("../components/Editor"),
  /* eslint-disable react/display-name */
  loading: () => <p>Loading ...</p>,
  ssr: false
});

type Props = {
  defaultCode: string;
  defaultTests: string;
  description: string;
  name: string;
  user: any;
  title: string;
  finalTests: string;
};

const Challenge: React.FunctionComponent<Props> = ({
  user,
  defaultCode,
  defaultTests,
  finalTests,
  description,
  name,
  title
}) => {
  const [text, setText] = useState(defaultCode);
  const [tests, updateTests] = useState(defaultTests);

  const [submitted, updateSubmitted] = useState(false);
  const [passText, setPassText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [logs, setLogs]: any[] = useState([]);
  const [testsRun, setTestsRun] = useState("");

  const updateCode = async () => {
    if (user) {
      const data = {
        userId: user.sub,
        challengeName: name,
        code: text,
        tests: tests
      };
      await fetch("/api/data/code", {
        method: "PUT",
        body: JSON.stringify(data)
      });
    }
  };

  const handleSubmit = async () => {
    updateCode();
    const data = {
      name: "flatten",
      code: text,
      tests: finalTests
    };
    await call(
      "https://cuxuwv59w5.execute-api.us-east-1.amazonaws.com/dev/test?submit=true",
      data
    );
  };

  const handleTest = async () => {
    updateCode();
    const data = {
      name: "flatten",
      code: text,
      tests: tests
    };
    await call(
      "https://cuxuwv59w5.execute-api.us-east-1.amazonaws.com/dev/test",
      data
    );
  };

  const call = async (
    url: string,
    data: { name: string; code: string; tests?: string }
  ) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    });
    let {
      result,
      logs,
      tests
    }: { result: any; logs: any[]; tests: string } = await response.json();
    updateSubmitted(true);
    setTestsRun(tests);
    let text = result.passed
      ? "All tests passed! 😎"
      : "At least some tests failed!";
    setPassText(text);
    setErrorText(!result.passed ? result : JSON.stringify(result));
    setLogs(logs || []);
  };

  const loadData = async () => {
    const url = `/api/data/code?userId=${user.sub}&challengeName=${name}`;
    const response = await fetch(url);

    const result = await response.json();

    if (result) {
      setText(result.code);
      updateTests(result.tests);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  return (
    <div className="container">
      <div className="info">
        <h2>{title}</h2>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
        {user ? null : (
          <code style={{ textAlign: "center" }}>
            Log in above using Auth0 to store your code and tests!
          </code>
        )}
        {submitted ? (
          <div className="results">
            <strong className="pass-text">{passText}</strong>
            <code className="error-text result-code">{errorText}</code>
            <strong>{(Boolean(logs.length) && "Logs:") || ""}</strong>
            {Boolean(logs.length) &&
              logs.map((log: string) => (
                <code className="log result-code" key={log}>
                  {log}
                </code>
              ))}

            <strong>Tests run:</strong>
            <code className="result-code">{testsRun}</code>
          </div>
        ) : null}
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
        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#000000",
            width: "85%"
          }}
        />
        <span style={{ padding: "10px", fontFamily: "monospace" }}>
          Unit Tests:
        </span>
        <Editor
          id="tests"
          gutter={false}
          lineNums={false}
          text={tests}
          height={"200px"}
          width={"600px"}
          update={updateTests}
        />
        <div className="buttons">
          <button id="submitButton" onClick={handleSubmit}>
            Submit
          </button>
          <button id="testButton" onClick={handleTest}>
            Run Sample Tests
          </button>
        </div>
      </div>
      <style jsx global>{`
        p {
          padding: 50px;
        }
        h2 {
          text-align: center;
        }
        .container {
          display: flex;
          margin: 30px;
        }
        .info {
          display: flex;
          flex-direction: column;
        }

        .description {
          white-space: pre-wrap;
        }
        #main {
          margin: 20px;
        }
        .editor {
          display: flex;
          flex-direction: column;
        }
        .results {
          display: flex;
          flex-direction: column;
        }
        .ace_editor {
          border-radius: 5px;
        }
        #tests {
          margin: 20px;
        }

        .error-name {
          font-weight: bold;
        }
        code {
          background-color: #19262f;
          color: #5abdae;
          border-radius: 5px;
          padding: 5px;
          white-space: pre-wrap;
        }

        .result-code {
          padding: 20px;
        }

        blockquote {
          background-color: #19262f;
          color: #e4bd54;
          border-radius: 5px;
          padding: 20px;
          white-space: pre-wrap;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
          padding: 0px 20px 0px 20px;
        }
        button {
          display: inline-block;
          padding: 0.35em 1.2em;
          border: 0.1em solid #19262f;
          margin: 0 0.3em 0.3em 0;
          border-radius: 0.24em;
          box-sizing: border-box;
          text-decoration: none;
          font-family: "Roboto", sans-serif;
          font-weight: 300;
          color: #19262f;
          text-align: center;
          transition: all 0.2s;
        }
        button:hover {
          color: #5abdae !important;
          background-color: #19262f !important;
        }
        @media all and (max-width: 30em) {
          button {
            display: block;
            margin: 0.4em auto;
          }
        }

        #submitButton {
          background-color: #5abdae;
        }
      `}</style>
    </div>
  );
};

export default Challenge;
