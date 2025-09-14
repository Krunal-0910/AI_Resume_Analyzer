import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'

function App() {
 

  return (
    <>
        <div className="flex justify-strat min-h-screen p-2 flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      <aside className="w-64 flex-shrink-0 overflow-y-auto hide-scrollbar">
      <Navbar />
      </aside>

      {/* Hero / Main Content on the right */}
      <main className="flex-1 p-10 overflow-y-auto scrollbar-hide ">
        <Hero />
      </main>

    </div>
      
        </>
        
  )
}

export default App


