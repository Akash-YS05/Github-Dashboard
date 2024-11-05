import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const [org, setOrg] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        localStorage.setItem('orgName', org)
        navigate('/dashboard')
    }

    return (
        <div className="flex min-h-screen justify-center items-center bg-gray-200">
            <div className="w-96 p-8 bg-white rounded-lg shadow-md">
                <h1 className="text 2xl font-bold text-center mb-6">GitHub Dashboard</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Organisation Name
                        </label>
                        <input 
                            type="text"
                            value={org}
                            onChange={(e) => setOrg(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="smn like facebook, google, etc.."
                            required
                        />
                    </div>
                    <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                        View Dashboard
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage