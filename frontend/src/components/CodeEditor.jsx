import { Editor } from '@monaco-editor/react';
import React, { useRef,useMemo, useEffect } from 'react'

const CodeEditor = React.memo(({ code, onChange, darkMode, language }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  // Ensure the editor theme updates without re-rendering the component
  useEffect(() => {
    if (editorRef.current) {
      window.monaco?.editor?.setTheme(darkMode ? "vs-dark" : "light");
    }
  }, [darkMode]);

  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      theme={darkMode ? "vs-dark" : "light"}
      onMount={handleEditorDidMount}
      onChange={onChange}
      options={{
        fontSize: 14,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
});


export default CodeEditor