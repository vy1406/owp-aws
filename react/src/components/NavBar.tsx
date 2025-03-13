
import { useContext, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { LANG, ROUTES } from '../utils/constants';
import useClickOutside from '../hooks/useClickOutside';
import LoginContext from '../services/context';

const routes = [
  { name: LANG.EN.APPLICATIONS, path: ROUTES.HOME, isProtected: false },
  { name: LANG.EN.RESOURCES, path: ROUTES.RESOURCES, isProtected: false },
  { name: LANG.EN.NEW_APPLICATION, path: ROUTES.NEW_APPLICATION, isProtected: true },
  { name: LANG.EN.NEW_RESOURCE, path: ROUTES.NEW_RESOURCE, isProtected: true },
  { name: LANG.EN.ABOUT, path: ROUTES.ABOUT, isProtected: false },
];

const NavBar = () => {
  const { isAuthenticated, username, logout } = useContext(LoginContext)
  const [_, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const computedRoutes = useMemo(() => {
    return routes.map(route => ({
      ...route,
      name: route.isProtected && !isAuthenticated
        ? `${route.name} ${LANG.EN.MUST_BE_LOGGED_IN}` 
        : route.name,
      disabled: route.isProtected && !isAuthenticated
    }));
  }, [isAuthenticated]);

  useClickOutside(mobileMenuRef, handleCloseMenu);


  const onLogin = () => setLocation(ROUTES.LOGIN);
  const onLogout = () => logout();

  return (
    <div className="sticky top-0 z-50 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200" >
      <div className="flex w-full items-center px-4 py-2">
        <div className="hidden w-full flex-row justify-between text-xl font-extralight md:flex">
          <div className="flex gap-4">
            {computedRoutes.map((route, index) => (
              <Link
                key={index}
                href={route.disabled ? "" : route.path}
                className={`flex items-center mb-1 text-lg font-semibold text-white ${route.disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {route.name}
              </Link>
            ))}

          </div>
          <div>
            {!isAuthenticated ?
              <button
                onClick={onLogin}
                className={` bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700`}
              >
                {LANG.EN.LOGIN}
              </button>
              :
              <div className='flex gap-4 items-center'>
                <span className='bg-gray-500 text-white text-sm font-medium px-3 py-1 rounded-full'>
                  {username}
                </span>
                <button
                  onClick={onLogout}
                  className={` bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700`}
                >
                  {LANG.EN.LOGOUT}
                </button>
              </div>
            }

          </div>
        </div>

        <div className="md:hidden flex w-full items-center justify-between">
          <div
            className="cursor-pointer"
            onClick={handleToggleMenu}
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          {!isAuthenticated ?
            <button
              onClick={onLogin}
              className={` bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700`}
            >
              {LANG.EN.LOGIN}
            </button>


            :
            <div className='flex gap-4 items-center'>
              <span className='bg-gray-500 text-white text-sm font-medium px-3 py-1 rounded-full'>
                {username}
              </span>
              <button
                onClick={onLogout}
                className={` bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700`}
              >
                {LANG.EN.LOGOUT}
              </button>
            </div>
          }

        </div>


      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobilemenu"
          className=" border-gray-200 bg-gray-900 fixed inset-0 z-70 p-4 md:hidden "
        >
          <div className="flex flex-col gap-4">
            <ul className="space-y-4">
              {computedRoutes.map((route, index) => (
                <li key={index}>
                  <Link
                    href={route.disabled ? "" : route.path}
                    className={`block py-2 px-3 border-b border-gray-600 text-white ${route.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:text-blue-500"
                      }`}
                    onClick={route.disabled ? undefined : () => setIsMobileMenuOpen(false)}
                  >
                    {route.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>
        </div>
      )}

    </div>
  );
};

export default NavBar;
