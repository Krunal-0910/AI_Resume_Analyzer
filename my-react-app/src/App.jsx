import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'

function App() {
 

  return (
    <>
        <div className="flex justify-strat min-h-screen p-2">
      {/* Sidebar on the left */}
      <div className="w-64 flex-shrink-0">
      <Navbar />
      </div>

      {/* Hero / Main Content on the right */}
      <div className="flex-1 ml-15 ">
        <Hero />
      </div>

    </div>
      
        </>
        
  )
}

export default App


