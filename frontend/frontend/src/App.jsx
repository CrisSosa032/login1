import { useEffect, useState } from 'react'
import "./styles.css"


function App() {

  const [objData, setObjData] = useState({name:"", email: "", password: ""});
  const [errors, setErrors] = useState({})

  const validations = (name, value) => {

    const errorMessages = {
      name: "El nombre es requerido",
      email: "Debes escribir un email valido",
      password: "La contraseña debe tener al menos 8 caracteres y al menos una mayuscula"
    };

    let errorMessage = null;

    if (!value.trim()){
      errorMessage = `El ${name} es requerido`;
    } else if(name === "password"){
      if(value.length < 8 || !/[A-Z]/.test(value)){
        errorMessage = errorMessages[name];
      }
    }else if(name === "email"){
      const isValidEmail = /\S+@\S+\.\S+/.test(value);
      if(!isValidEmail){
        errorMessage = errorMessages[name];
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,

    }))
  };

  const handleChange = ({target: { value, name }}) => {
    let data = {  [name]: value  };
    setObjData({
      ...objData,
      ...data,
    })
    validations(name, value);
  };

  

  const senData = async() => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(objData),
      });

      if(!response.ok){
        throw new Error("error al enviar los datos");
      }

      const data = await response.json();
      console.log("post successful", data);
    } catch (error) {
      console.log("there was an error posting data", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    senData();
  };
  
  return (
    <div>
      <div className='container' >
        <div className="left">  </div>
        <div>
          <h2 className='title'>Crea una cuenta</h2>
          <form className='form' onSubmit={handleSubmit}>
            <label>Escribe tu nombre</label>
              <input 
                className='input' 
                name='name' 
                type="text" 
                onChange={handleChange} 
                value= {objData.name}
              />
              {errors && (<span style={{color:"red", fontSize: "12px"}}>{errors.name}</span>)}
            <label>Escribe tu email</label>
            <input 
              className='input' 
              name='email' 
              type="email"  
              onChange={handleChange} 
              value={objData.email}
            />
            {errors && (<span style={{color:"red", fontSize: "12px"}}>{errors.email}</span>)}
            <label>Escribe una contraseña</label>
            <input 
              className='input' 
              name='password' 
              type="password"  
              onChange={handleChange} 
              value={objData.password}
            />
            {errors && (<span style={{color:"red", fontSize: "12px"}}>{errors.password}</span>)}
            <button className='button'>Registrarme</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
