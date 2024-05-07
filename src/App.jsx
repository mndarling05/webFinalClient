import {Routes, Route, Navigate} from 'react-router-dom'

import './App.css'
import Home from './components/home'
import Header from './components/common/Header'
import EpisodeSeasons from './components/episodes/seasons/Seasons'
import Episodes from './components/episodes/Episodes'
import DetailedEpisode from './components/episodes/DetailedEpisodes'
import ContestantSeasons from './components/contestants/seasons/Seasons'
import Contestants from './components/contestants/Contestants'
import DetailedContestants from './components/contestants/DetailedContestants'
import Login from './components/AccountInfo/Login'
import Signup from './components/AccountInfo/Signup'
import Account from './components/AccountInfo/Account'

import {useAuthContext} from './hooks/useAuthContext'

function App() {
  const {user} = useAuthContext()

  return (
    <>
      <Routes>
        <Route path ='/' element = {<Header/>}>
          <Route index element = {<Home/>}/>
          <Route path = '/Episodes' element={<EpisodeSeasons/>}/>
          <Route path = '/Episodes/Season16/' element = {<Episodes/>}/>
          <Route path = '/Episodes/Season16/Details' element = {<DetailedEpisode/>}/>
          <Route path = '/Contestants' element = {<ContestantSeasons/>}/>
          <Route path = '/Contestants/Season16/' element= {<Contestants/>}/>
          <Route path = '/Contestants/Season16/Details' element={<DetailedContestants/>}/>
          <Route path = '/Login' element={!user ? <Login/> : <Navigate to = '/'/>}/>
          <Route path = '/Signup' element = {!user ? <Signup/> : <Navigate to = '/'/>} />
          <Route path = '/MyAccount' element = {<Account/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
