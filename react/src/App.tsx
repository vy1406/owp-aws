import './App.css'
import { Route, Switch } from 'wouter';
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ApplicationForm from './forms/application'
import Signup from './pages/signUp'
import { ROUTES } from './utils/constants';
import ResourceList from './pages/resourcesList';
import { ToastContainer } from 'react-toastify';
import ResourceServiceForm from './pages/newResource';

const Home = () => <h1>Home</h1>
const Applications = () => <h1>Applications</h1>
const About = () => <h1>About</h1>
const Login = () => <h1>Login</h1>
const NotFound = () => <h1>404 Not Found</h1>
const Application = () => <h1>Application</h1>



function App() {

  return (
    <>
      <header className="sticky z-50 top-0">
        <NavBar />
      </header>
      <main className="pt-2 px-4 md:px-16" id="main-content">
        <Switch>
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.RESOURCES} component={ResourceList} />
          <Route path={ROUTES.NEW_RESOURCE} component={ResourceServiceForm} />
          <Route path={ROUTES.APPLICATIONS} component={Applications} />
          <Route path={ROUTES.APPLICATION} component={Application} />
          <Route path={ROUTES.NEW_APPLICATION} component={ApplicationForm} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={Signup} />
          <Route><NotFound /></Route>
        </Switch>
        <ToastContainer aria-label={"Notification messages"} position='bottom-right' autoClose={2000} />
      </main>
      <Footer />
    </>
  )
}

export default App
