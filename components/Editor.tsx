import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-jsx";
const languages = ["javascript", "python", "html", "typescript", "css", "rust"];

const themes = [
  "monokai",
  "dracula",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const textEditor = (props: any) => (
  <AceEditor
    placeholder="Placeholder Text"
    mode="javascript"
    theme="dracula"
    name={props.id}
    height={props.height}
    width={props.width}
    onChange={(text: string) => props.update(text)}
    fontSize={14}
    showPrintMargin={true}
    showGutter={props.gutter}
    highlightActiveLine={true}
    value={props.text}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: false,
      enableSnippets: true,
      showLineNumbers: props.lineNums,
      tabSize: 2,
      wrap: true,
      useWorker: false
    }}
  />
);

export default textEditor;
