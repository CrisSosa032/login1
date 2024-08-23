import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async() => {
    try {
      const response = await fetch("http://localhost:3001/users")
      const data = await response.json();
      setUsers(data.data)
    } catch (error) {
      console.log(error);
    }
  };

  console.log (users)


  return (
    <>
    <h1>Hola mundo</h1>
    {
      users.map(user => {
        return(
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>

        </div>
        )
      })
    }
    </>
  )
}

export default App
