import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
       let pass = ""
       let str = "ABCEDFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz"
       if(numberAllowed) str += "0123456789"
       if(charAllowed) str += "!@#$%^&*()_+={}[]`"

       for (let i = 1; i<=length; i++) {
        let char = Math.floor(Math.random() * str.length+1)

        pass += str.charAt(char)
       }
      
      setPassword(pass)

        }, [length,numberAllowed,charAllowed,setPassword] )

  const copyPasswordtoclipboard = useCallback(() => {
      passwordRef.current.select()
      window.navigator.clipboard.writeText(password)
  }, [password])    
      
        useEffect(() => {
          passwordGenerator()
        }, [length,numberAllowed,charAllowed,passwordGenerator])




  return (
    <>
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-7 my-8 text-black-500 bg-gray-800'>
      <h1 className='text-white text-center py-2'>Pasword generator</h1>
      <div className='className =" flex shadow rounded-lg overflow-hidden md-8 px-9"'>
        <input
             type="text"
             value={password}
             className='outline-none w-full py-2 px-3'
             placeholder='password'
             readOnly
             ref={passwordRef}
        />
        <button 
        onClick={copyPasswordtoclipboard}
        className='outline-none bg-lime-700 text-white  py-1.5 shrink-0 px-3'
        >copy</button>
        
      </div>
      <div
      className='flex text-sm gap-x-2 py-2  '>
        <div className='text-white flex items-center gap-x-2 py-3'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}}
          />
          <label>Length:{length}</label>
         </div>
        <div className="text-white flex items-center gap-x-1">
          <input
                  type="checkbox"
                  defaultValue={numberAllowed}
                  id="numberinput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
          />
          <label htmlFor="numberinput">Number</label>
          <input
                  type="checkbox"
                  defaultValue={charAllowed}
                  id="charinput"
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
          />
          <label htmlFor="numberinput">Characers</label>

        </div>
      </div>
    </div>
    </>
  )
}

export default App
