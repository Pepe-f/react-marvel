import { Helmet } from 'react-helmet'
import Banner from '../Banner/Banner'
import ComicsList from '../ComicsList/ComicsList'

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name='description' content='Page with list of our comics' />
        <title>Comics page</title>
      </Helmet>
      <Banner />
      <ComicsList />
    </>
  )
}

export default ComicsPage
