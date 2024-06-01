import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './context/CityContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {

  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='product' element={<Product />}></Route>
            <Route path='pricing' element={<Pricing />}></Route>
            <Route path='app' element={
            <ProtectedRoute>
            <AppLayout />
            </ProtectedRoute>
            }>
              <Route index element={<Navigate to='cities' replace />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='form' element={<Form />} />
              <Route path='countries' element={<CountryList />} />
            </Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  )
}

export default App
