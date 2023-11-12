
import './App.css'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './Components/NotFound'
import Navbar from './Components/Navbar'

function App() {

  return (
    <div>
   
<Navbar />

<Routes>
<Route path="/" element={<Home />} />

<Route path="/NotFound" element={<NotFound />} /> {/* 404 page ke liye generic route */}


    </Routes>

   </div>
  )
}

export default App
