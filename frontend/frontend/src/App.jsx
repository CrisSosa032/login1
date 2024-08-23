import { useEffect, useState } from 'react'
import './App.css'


function App() {
  useEffect(() => {
    getUsers();
  }, []);
  
  const getUsers = async() => {
    try {
      const response = await fetch("http://http://localhost:3001/users")
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <h1>Hola mundo</h1>
    </>
  )
}

export default App
