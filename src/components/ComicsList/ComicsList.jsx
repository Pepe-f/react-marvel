import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import './ComicsList.scss'
import { Link } from 'react-router-dom'

const ComicsList = () => {
  const [comics, setComics] = useState([])
  const [isNewComicsLoading, setIsNewComicsLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [isComicsEnded, setIsComicsEnded] = useState(false)

  const { isLoading, error, getAllComics } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setIsNewComicsLoading(false) : setIsNewComicsLoading(true)
    getAllComics(offset).then(onComicsLoaded)
  }

  const onComicsLoaded = newComics => {
    let ended = false
    if (newComics.length < 8) {
      ended = true
    }

    setComics(comics => [...comics, ...newComics])
    setIsNewComicsLoading(false)
    setOffset(offset => offset + 8)
    setIsComicsEnded(ended)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = isLoading && !isNewComicsLoading ? <Spinner /> : null

  return (
    <div className='comics__list'>
      {spinner}
      {errorMessage}
      <ul className='comics__grid'>
        {comics.map(({ id, title, price, thumbnail }, index) => (
          <li key={index} className='comics__item'>
            <Link to={`/comics/${id}`}>
              <img src={thumbnail} alt={title} className='comics__item-img' />
              <div className='comics__item-name'>{title}</div>
              <div className='comics__item-price'>{price}</div>
            </Link>
          </li>
        ))}
      </ul>
      <button
        className='button button__main button__long'
        style={{ display: isComicsEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
        disabled={isNewComicsLoading}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

export default ComicsList
