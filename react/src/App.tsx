import './App.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ApplicationForm from './forms/application'
import ResourceServiceForm from './pages/resources'
import Signup from './pages/signUp'


function App() {

  return (
    <>
      <header className="sticky z-50 top-0">
        <NavBar />
      </header>
      <main className="pt-16 px-4 md:px-16">
        <ResourceServiceForm />
        <Signup />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}

export default App
