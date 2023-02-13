import { useEffect, useState } from 'react'
import mjolnir from '../../assets/img/mjolnir.png'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import './RandomChar.scss'

const RandomChar = () => {
  const [char, setChar] = useState(null)

  useEffect(() => {
    updateChar()
    const timerId = setInterval(updateChar, 120000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const { isLoading, error, getCharacter, clearError } = useMarvelService()

  const updateChar = () => {
    clearError()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

    getCharacter(id).then(onCharLoaded)
  }

  const onCharLoaded = char => {
    setChar(char)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = isLoading ? <Spinner /> : null
  const content = !(isLoading || error || !char) ? (
    <RandomCharView char={char} />
  ) : null

  return (
    <div className='randomchar'>
      {errorMessage}
      {spinner}
      {content}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button className='button button__main' onClick={() => updateChar()}>
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  )
}

const RandomCharView = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char

  let imgStyle = { objectFit: 'cover' }
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' }
  }

  return (
    <div className='randomchar__block'>
      <img
        src={thumbnail}
        alt='Random character'
        className='randomchar__img'
        style={imgStyle}
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{description}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar
