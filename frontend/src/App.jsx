import React, { createRef, useState, useEffect } from 'react'
import {
  createBrowserRouter,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import More from './pages/More.jsx'
import VIP from './pages/VIP.jsx'
import './styles/App.css'
import AnimationContext from './misc/AnimationContext.jsx';

const routes = [
  { path: '/', name: 'Home', element: <Home />, nodeRef: createRef() },
  { path: '/more', name: 'More', element: <More />, nodeRef: createRef() },
  { path: '/VIP', name: 'VIP', element: <VIP />, nodeRef: createRef() },

]



export const AppRoutes = () => {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname]) // It runs every time the pathname changes.
  return (
    <>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={400}
            classNames="almost-fade-out"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
    </>
  )
}

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppRoutes />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

const App = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  

  return (
    <>
    
    <AnimationContext.Provider value={{ hasAnimated, setHasAnimated }}>
      <RouterProvider router={AppRouter} />
    </AnimationContext.Provider>
    </>
  )
}
    


export default App

