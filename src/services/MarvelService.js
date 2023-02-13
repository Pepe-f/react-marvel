import { useHttp } from '../hooks/useHttp'

const useMarvelService = () => {
  const { isLoading, request, error, clearError } = useHttp()

  const API_BASE = 'https://gateway.marvel.com:443/v1/public'
  const API_KEY = 'apikey=b65680231bc6025ae2f73a86a0a3686f'
  const BASE_OFFSET = 210

  const getAllCharacters = async (offset = BASE_OFFSET) => {
    const res = await request(
      `${API_BASE}/characters?limit=9&offset=${offset}&${API_KEY}`
    )

    return res.data.results.map(transformCharacter)
  }

  const getCharacterByName = async name => {
    const res = await request(`${API_BASE}/characters?name=${name}&${API_KEY}`)

    return res.data.results.map(transformCharacter)
  }

  const getCharacter = async id => {
    const res = await request(`${API_BASE}/characters/${id}?${API_KEY}`)

    return transformCharacter(res.data.results[0])
  }

  const getAllComics = async (offset = BASE_OFFSET) => {
    const res = await request(
      `${API_BASE}/comics?orderBy=issueNumber&limit=8&offset=${offset}&${API_KEY}`
    )

    return res.data.results.map(transformComic)
  }

  const getComic = async id => {
    const res = await request(`${API_BASE}/comics/${id}?${API_KEY}`)

    return transformComic(res.data.results[0])
  }

  const transformCharacter = char => {
    let description = char.description

    if (!description) {
      description = 'There is no description for this character'
    } else if (description.length > 200) {
      description = description.slice(0, 200) + '...'
    }

    return {
      id: char.id,
      name: char.name,
      description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const transformComic = comic => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is now description',
      pageCount: comic.pageCount
        ? `${comic.pageCount} p.`
        : 'No information about the number of pages',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      language: comic.textObjects[0] ? comic.textObjects[0].language : 'en-us',
      price: comic.prices[0].price
        ? `${comic.prices[0].price}$`
        : 'Not available'
    }
  }

  return {
    isLoading,
    error,
    getAllCharacters,
    getCharacterByName,
    getCharacter,
    clearError,
    getAllComics,
    getComic
  }
}

export default useMarvelService
