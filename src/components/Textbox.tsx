import { useCallback, useEffect, useState } from "react";

const Textbox = ({title,text="", readOnly=false, setInput = (str : string) => {}}) => {
  const [value,setValue] = useState('');
  useEffect(() => {
    setValue(text)
  },[setValue,text])
  
  const onChange = useCallback((event) => {
    setValue(event.target.value);
    setInput(event.target.value);
  },[setValue,setInput])
  
  return (
    <div style={{height : '50%', width : '80%'}}>
      <p>{title}</p>
      <textarea value={value} onChange={onChange} readOnly={readOnly} style={{ height : "80%", width : '100%'}}/>
    </div>
  );
}

export default Textbox;