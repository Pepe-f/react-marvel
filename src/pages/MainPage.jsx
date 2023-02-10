import { useState } from 'react'
import RandomChar from '../components/RandomChar/RandomChar'
import CharList from '../components/CharList/CharList'
import CharInfo from '../components/CharInfo/CharInfo'
import decoration from '../assets/img/vision.png'

const MainPage = () => {
	const [selectedCharId, setSelectedCharId] = useState(null)

	const onCharSelected = id => {
		setSelectedCharId(id)
	}

	return (
		<>
			<RandomChar />
			<div className='char__content'>
				<CharList onCharSelect={onCharSelected} />
				<CharInfo charId={selectedCharId} />
			</div>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</>
	)
}

export default MainPage
