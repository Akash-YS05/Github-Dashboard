import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './components/Landing/LoginPage'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from './components/Dashboard/Dashboard'
const queryClient = new QueryClient()

function App() {

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
