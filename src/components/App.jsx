import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header/Header'
import Spinner from './Spinner/Spinner'
import MainPage from './pages/MainPage'
import ComicsPage from './pages/ComicsPage'
import SinglePage from './pages/SinglePage'
import SingleCharacterLayout from './pages/SingleCharacterLayout/SingleCharacterLayout'
import SingleComicLayout from './pages/SingleComicLayout/SingleComicLayout'

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/comics' element={<ComicsPage />} />
              <Route
                path='/comics/:id'
                element={
                  <SinglePage Component={SingleComicLayout} dataType='comic' />
                }
              />
              <Route
                path='/characters/:id'
                element={
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType='character'
                  />
                }
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
