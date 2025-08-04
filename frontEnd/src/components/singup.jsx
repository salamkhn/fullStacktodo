import { useState } from "react"
import axios from "axios"

export const Signup = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")


  // function for handle submit
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:999/api/user/register", {
        username,
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
      )
      console.log("data :", data.message)
      alert(data.message || "user Register Successfully")
    } catch (error) {

      console.log("error :", error.response)
      alert(error.response.data.message || "Registration failed")

    }
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-500'>
      <form onSubmit={handlesubmit} className='bg-white w-full max-w-md mx-4 p-6 rounded-lg space-y-6'>
        <h1 className='text-2xl font-bold text-center'>Signup</h1>

        <div className='space-y-2'>
          <label className='block text-lg'>Username</label>
          <input
            className='outline-0  w-full p-3 border-2 border-blue-500 rounded-md'
            type="text"
            placeholder='Enter username'
            value={username}
            onChange={(e) => setusername(e.target.value)}

          />
        </div>

        <div className='space-y-2'>
          <label className='block text-lg'>Email</label>
          <input
            className='outline-0  w-full p-3 border-2 border-blue-500 rounded-md'
            type="email"
            placeholder='Enter email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-lg'>Password</label>
          <input
            className='outline-0  w-full p-3 border-2 border-blue-500 rounded-md'
            type="password"
            placeholder='Enter password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button type="submit" className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700'>
          Submit
        </button>
      </form>
    </div>
  )
}




// if (err.response?.data?.error?.fieldError) {

//   const filederror = err?.response?.data?.error.fieldError;
//   const errormessage = "pease fix:\n"
//   for (fieldName in filederror) {
//     const message = filederror[fieldName];
//     errormessage += `${fieldName}:${message}`
//   }

// }