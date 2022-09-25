import { useRoutes } from 'react-router-dom'

import './App.css'

import appRoutes from './Router/routes'

function App() {
  const AppRouter = useRoutes(appRoutes())

  return AppRouter
}

export default App
