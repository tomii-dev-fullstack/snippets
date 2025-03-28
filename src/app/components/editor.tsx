import { FC, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

// Definir el tipo para los "snippets"
interface Snippet {
  title: string;
  code: string;
  language: string;
}

interface InputEditorProps {
  snippet: Snippet
  onChange: (value: string) => void;
}

const InputEditor: FC<InputEditorProps> = ({ snippet, onChange }) => {
  console.log(snippet)
  return (
    <div>
      <Editor
      
        height="400px"
        language={snippet.language}
        theme="vs-dark"
        value={snippet.code} // Aquí pasamos el texto generado desde los datos
        onChange={(value) => onChange(value || "")} // Asegura que no pase `null`
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />
    </div>
  );
};

export default InputEditor;
