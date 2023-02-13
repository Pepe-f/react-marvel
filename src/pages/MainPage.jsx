import { useState } from 'react'
import RandomChar from '../components/RandomChar/RandomChar'
import CharList from '../components/CharList/CharList'
import CharInfo from '../components/CharInfo/CharInfo'
import decoration from '../assets/img/vision.png'
import CharSearchForm from '../components/CharSearchForm/CharSearchForm'

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
        <div>
          <CharInfo charId={selectedCharId} />
          <CharSearchForm />
        </div>
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  )
}

export default MainPage
