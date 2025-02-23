import './App.css'
import { Route, Switch } from 'wouter';
import NavBar from './components/NavBar'
import { ROUTES } from './utils/constants';
import ResourceList from './pages/resourcesList';
import { ToastContainer } from 'react-toastify';
import ResourceServiceForm from './pages/newResource';
import Applications from './pages/applications';
import ScrollToTopButton from './components/ScrollToTopButton';
import Application from './pages/application';
import NewApplication from './pages/newApplication';
import Login from './pages/login';
import SignUp from './pages/signup';
import About from './pages/about';
import { ModalProvider } from './services/modalContext';

const NotFound = () => <h1>404 Not Found</h1>

function App() {

  return (
    <>
      <ModalProvider>
        <header className="sticky z-50 top-0">
          <NavBar />
        </header>
        <main className="pt-2 px-4 md:px-16" id="main-content">
          <Switch>
            <Route path={ROUTES.HOME} component={Applications} />
            <Route path={ROUTES.RESOURCES} component={ResourceList} />
            <Route path={ROUTES.NEW_RESOURCE} component={ResourceServiceForm} />
            <Route path={ROUTES.NEW_APPLICATION} component={NewApplication} />
            <Route path={ROUTES.APPLICATION} component={Application} />
            <Route path={ROUTES.ABOUT} component={About} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGNUP} component={SignUp} />
            <Route><NotFound /></Route>
          </Switch>
          <ScrollToTopButton />
          <ToastContainer aria-label={"Notification messages"} position='bottom-right' autoClose={2000} />

        </main>
        {/* <Footer /> */}
      </ModalProvider>
    </>
  )
}

export default App
