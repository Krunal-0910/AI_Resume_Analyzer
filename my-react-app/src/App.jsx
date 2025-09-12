import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'

function App() {
 

  return (
    <>
        <div className="flex justify-strat min-h-screen p-2 flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      <aside className="w-64 flex-shrink-0 overflow-y-auto scrollbar-gutter-stable">
      <Navbar />
      </aside>

      {/* Hero / Main Content on the right */}
      <main className="flex-1 p-8 overflow-y-auto scrollbar-gutter-stable ">
        <Hero />
      </main>

    </div>
      
        </>
        
  )
}

export default App


