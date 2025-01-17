import React, { useRef, useState } from 'react'
import './ImageGen.css'
import BaseImage from '../Assets/image.jpeg' 

const ImageGen = () => {

  const [ImageURL,setImageURL] = useState("/")
  let inputRef = useRef(null)
  const imageGenerator = async () => {
    if(inputRef.current.value === '') {
      return 0
    }
    const response = await fetch("",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer",
        "User-Agent":"Chrome",
      },
      body:JSON.stringify({
        prompt:`${inputRef.current.value}`,
        n:1,
        size:"512x512"
      }),
    })
    let data = await response.json()
    console.log(data)
  }

  return (
    <div className='ai-generator'>
      <div className="header">
        Ai Image <span>Generator</span> With <span>React</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={ImageURL==="/"?BaseImage:ImageURL} alt="Base" />
        </div>
      </div>
      <div className="search-box">
        <input type="text" className='search-box' ref={inputRef} placeholder='Describe what you want to create :)'/>
        <button className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</button>
      </div>
      </div>
  )
}

export default ImageGen