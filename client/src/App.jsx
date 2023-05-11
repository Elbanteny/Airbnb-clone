import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import ProfilePage from './pages/ProfilePage'
import Index from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/Register'
import UserContextProvider from './UserContext'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPages from './pages/PlacesFromPages'
import PlaceDetailPage from './pages/PlaceDetailPage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {

  return (

    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPages />} />
          <Route path='/account/places/:id' element={<PlacesFormPages />} />
          <Route path='/place/:id' element={<PlaceDetailPage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
