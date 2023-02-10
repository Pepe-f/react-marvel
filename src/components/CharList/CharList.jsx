import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import './CharList.scss'

const CharList = ({ onCharSelect }) => {
	const [chars, setChars] = useState([])
	const [isNewItemsLoading, setIsNewItemsLoading] = useState(false)
	const [offset, setOffset] = useState(210)
	const [isCharEnded, setIsCharEnded] = useState(false)

	const { isLoading, error, getAllCharacters } = useMarvelService()

	useEffect(() => {
		onRequest(offset, true)
	}, [])

	const onRequest = (offset, initial) => {
		initial ? setIsNewItemsLoading(false) : setIsNewItemsLoading(true)
		getAllCharacters(offset).then(onCharsLoaded)
	}

	const onCharsLoaded = newChars => {
		let ended = false
		if (newChars.length < 9) {
			ended = true
		}

		setChars(chars => [...chars, ...newChars])
		setIsNewItemsLoading(false)
		setOffset(offset => offset + 9)
		setIsCharEnded(ended)
	}

	const itemRefs = useRef([])

	const focusOnItem = id => {
		itemRefs.current[id].focus()
	}

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = isLoading && !isNewItemsLoading ? <Spinner /> : null
	const items = chars.map(({ id, name, thumbnail }) => {
		let imgStyle = { objectFit: 'cover' }
		if (
			thumbnail ===
			'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
		) {
			imgStyle = { objectFit: 'unset' }
		}

		return (
			<li
				key={id}
				className='char__item'
				tabIndex={0}
				ref={el => (itemRefs.current[id] = el)}
				onClick={() => {
					onCharSelect(id)
					focusOnItem(id)
				}}
			>
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div className='char__name'>{name}</div>
			</li>
		)
	})

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			<ul className='char__grid'>{items}</ul>
			<button
				className='button button__main button__long'
				style={{ display: isCharEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
				disabled={isNewItemsLoading}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	)
}

CharList.propTypes = {
	onCharSelect: PropTypes.func.isRequired
}

export default CharList
