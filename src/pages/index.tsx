import { useCallback, useState } from 'react';
import CodeEditor from "../components/CodeEditor"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Textbox from '../components/Textbox';
import LanguageDropdown from '../components/LanguageDropdown';

const Home = () => {
  const [editorValue, setEditorValue] = useState('');
  const [output,setOutput] = useState('');
  const [input,setInput] = useState('');
  const [language,setLanguage] = useState('cpp');
  const [correct, setCorrect] = useState(false);
  const { width, height } = useWindowSize();

  const onClick = useCallback(async () => {
    const data = await fetch('/api/code',{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        code: editorValue,
        stdin: input,
        language : language,
      }),
    })
    const answer = await data.json();
    console.log(answer);
    if(answer.stderr){
      setOutput(answer.stderr);
    }else{
      setOutput(() => {return answer.stdout});
      console.log({output},'from onClick')
    }
  },[setOutput,editorValue,output,input,setInput,language])

  const celebrate = useCallback(() => {
    setCorrect((prev) => !prev)
  },[setCorrect])

  return (
      <div style={{display : 'flex', height : '95vh',justifyContent: 'space-between'}}>
        <div style={{ flex : 3}}>
          <CodeEditor setEditorValue={setEditorValue} language={language} />
        </div>
        <div style={{ flex : 1, paddingLeft : 'auto', paddingRight : 'auto', display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
         <div style={{display : 'flex', alignItems : 'center', justifyContent: 'space-around', gap : '10px'}}>
          <LanguageDropdown setLanguage={setLanguage}/>
          <button onClick={onClick}  style={{height : '25px', width : '80px'}}>Run Code</button>
          <button onClick={celebrate} style={{height : '25px', width : '80px'}}>Celebrate</button>
         </div>
         <Textbox title={'Input'} setInput={setInput}/>
         <Textbox title={'Output'} text={output} readOnly={true}/>
        </div>
        {correct ? <Confetti
          width={width}
          height={height}
          tweenDuration={5000}
        /> : ''}
      </div>
  );
};

export default Home;
