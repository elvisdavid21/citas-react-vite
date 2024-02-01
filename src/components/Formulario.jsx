//rafce
import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  const generarID = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //validacion del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Todos los campos son obligatorioas')
      setError(true)
      return;
    }
    
    setError(false)
    //Objeto de paciente
    const coleccionPacientes = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if(paciente.id){
      //Editando el registro
      coleccionPacientes.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id ===
        paciente.id ? coleccionPacientes : pacienteState)
      
      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      //Nuevo registro
      coleccionPacientes.id = generarID();
      setPacientes([...pacientes, coleccionPacientes])
    }

    //Reinicio del formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }
  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
          Añade Pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

            {error && <Error><p>Todos los campos son obligatorios</p></Error>}

          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 font-bold uppercase">
              Nombre Mascota
            </label>
            <input id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text" 
              placeholder="Nombre de la Mascota"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 font-bold uppercase">
              Nombre Propietario
            </label>
            <input id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text" 
              placeholder="Nombre del Propietario"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-bold uppercase">
              Email
            </label>
            <input id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="email" 
              placeholder="Email Contacto Propietario"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 font-bold uppercase">
              Alta
            </label>
            <input id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="date" 
              value={fecha  }
              onChange={ (e) => setFecha(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 font-bold uppercase">
              Sintomas
            </label>
            <textarea id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe los Sintomas"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
            />
          </div>

          <input type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={paciente.id ? 'Editar Paciente': 'Agregar Paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario