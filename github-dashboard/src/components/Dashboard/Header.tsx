import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    const org = localStorage.getItem('orgName')

    function handleLogout() {
        localStorage.removeItem('orgName')
        navigate('/')
    }

    return (
        <header className="bg-white shadow-sm rounded-lg">
          <div className="max-w-8xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">{org}</h1>
              <p className="text-sm text-gray-500">Organization Dashboard</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </header>
      )
}

export default Header