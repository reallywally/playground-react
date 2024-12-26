import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

function JsonEditor() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: null, monaco: unknown) {
    editorRef.current = editor;
  }

  function showValue() {
    console.log(editorRef.current.getValue());
  }

  return (
    <div>
      reactJsonEditor
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        defaultLanguage="json"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        onValidate={(markers) => {
          console.log("onValidate", markers);
        }}
      />
    </div>
  );
}

export default JsonEditor;
