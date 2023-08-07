import { Editor } from "@monaco-editor/react";
import { useCallback, useEffect, useState } from "react";

const CodeEditor = ({setEditorValue, language}) => {
  const [code, setCode] = useState('');

  const ws =  new WebSocket('ws://localhost:8080/');
  
  useEffect(() => {
    ws.onmessage = (msgReceived) => {
      setCode(msgReceived.data);
      setEditorValue(msgReceived.data)
    };

    ws.onopen = () => {
      console.log('WebSocket is connected');
    };

    ws.onclose = () => {
      console.log('WebSocket is disconnected');
    };

    ws.onerror = (error) => {
        console.error('WebSocket has error:', error);
    };

    return () => {
      ws.close();
    };
  },[setCode,setEditorValue,ws]);

  const onChange = useCallback((e) => {
    setCode(e);
    setEditorValue(e);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(e);
    }
  },[setCode,code,ws]);

  return (
    <Editor
      height="100%"
      width='100%'
      defaultLanguage="c"
      language={language}
      defaultValue="//Write code here"
      value={code}
      onChange={onChange}
      theme='vs-dark'
    />
  )
}

export default CodeEditor;