import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

function reactJsonEditorAjrm() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    console.log(editorRef.current);
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
      />
    </div>
  );
}

export default reactJsonEditorAjrm;
