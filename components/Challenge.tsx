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
    let { result, logs }: { result: any; logs: any[] } = await response.json();
    updateSubmitted(true);
    let text = result.passed
      ? "All tests passed! 😎"
      : "At least some tests failed!";
    setPassText(text);
    setErrorText(!result.passed ? result : "");
    setLogs(logs || []);
  };

  const loadData = async () => {
    const url = `/api/data/code?userId=${user.sub}&challengeName=flatten`;
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
        <p>{description}</p>
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
