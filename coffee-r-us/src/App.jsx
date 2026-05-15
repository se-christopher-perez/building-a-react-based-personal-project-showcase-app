import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import AdminPortal from './pages/AdminPortal'
import './App.css'
import MainLayout from './MainLayout'
import { useEffect, useState } from 'react'

function App() {

  const [coffees, setCoffees] = useState([])

  useEffect(() => {

    fetch("http://localhost:8000/coffee")
    .then(r => {

      if(!r.ok) {throw new Error("Problem with the fetch")}

      return r.json()

    })
    .then(data => setCoffees(data))
    .catch(err => console.log(err))

  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout coffees={coffees} setCoffees={setCoffees} />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin-portal" element={<AdminPortal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
