import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import './SingleComic.scss'

const SingleComic = ({ id }) => {
	const [comic, setComic] = useState(null)
	const { isLoading, error, clearError, getComic } = useMarvelService()

	useEffect(() => {
		updateComic()
	}, [id])

	const updateComic = () => {
		clearError()
		getComic(id).then(onComicLoaded)
	}

	const onComicLoaded = comic => {
		setComic(comic)
	}

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = isLoading ? <Spinner /> : null
	const content = !(isLoading || error || !comic) ? (
		<SingleComicView comic={comic} />
	) : null

	return (
		<>
			{errorMessage}
			{spinner}
			{content}
		</>
	)
}

const SingleComicView = ({ comic }) => {
	const { title, description, pageCount, thumbnail, language, price } = comic

	return (
		<div className='single-comic'>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>Language: {language}</p>
				<div className='single-comic__price'>{price}</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</div>
	)
}

export default SingleComic
