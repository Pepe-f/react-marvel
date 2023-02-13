import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorMessage as FormikErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import './CharSearchForm.scss'

const CharSearchForm = () => {
  const [char, setChar] = useState(null)

  const { isLoading, error, clearError, getCharacterByName } =
    useMarvelService()

  const onCharLoaded = char => {
    setChar(char)
  }

  const updateChar = name => {
    clearError()

    getCharacterByName(name).then(onCharLoaded)
  }

  const initialValues = {
    charName: ''
  }

  const validationSchema = Yup.object({
    charName: Yup.string().required('This field is required')
  })

  const handleSubmit = ({ charName }) => {
    updateChar(charName)
  }

  const errorMessage = error ? (
    <div className='char__search-critical-error'>
      <ErrorMessage />
    </div>
  ) : null
  const results = !char ? null : char.length > 0 ? (
    <div className='char__search-wrapper'>
      <div className='char__search-success'>
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className='button button__secondary'
      >
        <div className='inner'>To page</div>
      </Link>
    </div>
  ) : (
    <div className='char__search-error'>
      The character was not found. Check the name and try again
    </div>
  )

  return (
    <div className='char__search-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label className='char__search-label' htmlFor='charName'>
            Or find a character by name:
          </label>
          <div className='char__search-wrapper'>
            <Field
              id='name'
              name='charName'
              type='text'
              placeholder='Enter name'
            />
            <button className='button button__main'>
              <div className='inner'>find</div>
            </button>
          </div>
          <FormikErrorMessage
            className='char__search-error'
            name='charName'
            component='div'
          />
        </Form>
      </Formik>
      {errorMessage}
      {results}
    </div>
  )
}

export default CharSearchForm
