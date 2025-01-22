import './App.css'
import { Route, Switch } from 'wouter';
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ApplicationForm from './forms/application'
import ResourceServiceForm from './pages/resources'
import Signup from './pages/signUp'
import { ROUTES } from './utils/constants';

const Home = () => <h1>Home</h1>
const Resource = () => <h1>Resource</h1>
const Application = () => <h1>Application</h1>
const About = () => <h1>About</h1>
const Login = () => <h1>Login</h1>
const NotFound = () => <h1>404 Not Found</h1>



function App() {

  return (
    <>
      <header className="sticky z-50 top-0">
        <NavBar />
      </header>
      <main className="pt-16 px-4 md:px-16">
        <Switch>
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.RESOURCES} component={Resource} />
          <Route path={ROUTES.NEW_RESOURCE} component={ResourceServiceForm} />
          <Route path={ROUTES.APPLICATIONS} component={Application} />
          <Route path={ROUTES.NEW_APPLICATION} component={ApplicationForm} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={Signup} />
          <Route><NotFound /></Route>
        </Switch>
      </main>
      <Footer />
    </>
  )
}

export default App
