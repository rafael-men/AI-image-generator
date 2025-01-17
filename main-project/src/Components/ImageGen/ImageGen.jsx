import React, { useRef, useState } from 'react'
import './ImageGen.css'
import BaseImage from '../Assets/image.jpeg'

const ImageGen = () => {
  const [ImageURL, setImageURL] = useState('/')
  const [isLoading, setIsLoading] = useState(false)
  let inputRef = useRef(null)


  const imageGenerator = async () => {
    if (inputRef.current.value.trim() === '') {
      alert('Please enter a description!')
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
        {
          method: 'POST',
          headers: {
            Authorization: process.env.REACT_APP_API_ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: inputRef.current.value, // O prompt para gerar a imagem
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const blob = await response.blob()
      const imageURL = URL.createObjectURL(blob)

      setImageURL(imageURL)
    } catch (error) {
      console.error('Erro ao gerar a imagem:', error);
      alert('Não foi possível gerar a imagem. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="ai-generator">
      <div className="header">
        AI Image <span>Generator</span> With <span>React</span>
      </div>
      <div className="img-loading">
        <div className="image">
          {isLoading ? (
            <p>Loading...</p> 
          ) : (
            <img src={ImageURL === '/' ? BaseImage : ImageURL} alt="Generated" />
          )}
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-box"
          ref={inputRef}
          placeholder="Describe what you want to create :)"
        />
        <button className="generate-btn" onClick={imageGenerator}>
          Generate
        </button>
      </div>
    </div>
  )
}

export default ImageGen
