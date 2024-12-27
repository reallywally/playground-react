import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

interface ValidationError {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
  severity: string;
}

const MonacoEditorComponent: React.FC = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const codeRef = useRef<string>("");

  const handleEditorValidate = (markers: monaco.editor.IMarker[]) => {
    const formattedErrors = markers.map((marker) => ({
      startLineNumber: marker.startLineNumber,
      startColumn: marker.startColumn,
      endLineNumber: marker.endLineNumber,
      endColumn: marker.endColumn,
      message: marker.message,
      severity: marker.severity === 8 ? "Error" : "Warning", // 8: Error, 4: Warning
    }));
    setErrors(formattedErrors);
  };

  const handleEditorChange = (value: string | undefined) => {
    codeRef.current = value || ""; // 코드 저장
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log("Editor Code Ref:", codeRef.current); // useRef 값
        }}
      >
        click!
      </button>
      <div>
        <h3>Validation Errors:</h3>
        {errors.length === 0 ? (
          <p>No errors!</p>
        ) : (
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <strong>[{error.severity}]</strong> {error.message} <br />
                Line: {error.startLineNumber}, Column: {error.startColumn} -{" "}
                {error.endLineNumber}, {error.endColumn}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Editor
        height="60vh"
        defaultLanguage="json"
        defaultValue="// Type your code here"
        onValidate={handleEditorValidate}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MonacoEditorComponent;
