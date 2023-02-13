import { useState } from 'react'
import { Helmet } from 'react-helmet'
import RandomChar from '../RandomChar/RandomChar'
import CharList from '../CharList/CharList'
import CharInfo from '../CharInfo/CharInfo'
import decoration from '../../assets/img/vision.png'
import CharSearchForm from '../CharSearchForm/CharSearchForm'

const MainPage = () => {
  const [selectedCharId, setSelectedCharId] = useState(null)

  const onCharSelected = id => {
    setSelectedCharId(id)
  }

  return (
    <>
      <Helmet>
        <meta name='description' content='Marvel information portal' />
        <title>Marvel Portal</title>
      </Helmet>
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
