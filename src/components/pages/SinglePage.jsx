import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import Banner from '../Banner/Banner'

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const { isLoading, error, getComic, getCharacter, clearError } =
    useMarvelService()

  useEffect(() => {
    updateData()
  }, [id])

  const onDataLoaded = data => {
    setData(data)
  }

  const updateData = () => {
    clearError()

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded)
        break
      case 'character':
        getCharacter(id).then(onDataLoaded)
        break
    }
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = isLoading ? <Spinner /> : null
  const content = !(isLoading || error || !data) ? (
    <Component data={data} />
  ) : null

  return (
    <>
      <Banner />
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default SinglePage
