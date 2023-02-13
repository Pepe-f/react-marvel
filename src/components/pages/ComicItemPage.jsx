import { useParams } from 'react-router-dom'
import SingleComic from '../components/SingleComic/SingleComic'

const ComicItemPage = () => {
  const { id } = useParams()

  return <SingleComic id={id} />
}

export default ComicItemPage
