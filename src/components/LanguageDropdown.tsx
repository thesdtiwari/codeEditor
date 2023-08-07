import { useCallback } from "react";

const LanguageDropdown = ({setLanguage}) => {
  const onChange = useCallback((e) => {
    setLanguage(e.target.value)
  },[setLanguage])
  return (
    <select onChange={onChange} style={{height : '100%'}}>
      <option value="cpp">C++</option>
      <option value="python">Python</option>
      <option value="javascript">JavaScript</option>
      <option value="typescript">Typescript</option>
      <option value="java">Java</option>
      <option value="go">Go</option>
      <option value="haskell">Haskell</option>
    </select>
  )
}

export default LanguageDropdown;