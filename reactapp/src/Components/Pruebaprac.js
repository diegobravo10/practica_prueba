import { useState, useEffect } from "react";
import {obtenerDatos,agregarDatos,editarDatos,eliminarDatos} from "./servicios";
import './prueba.css'

function Pruebaprac() {
    const [state, setState] = useState({});
    const [nombre, setNombre] = useState(""); 
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    const [nacionalidad, setNacionalidad] = useState("");
    const [lista, setLista] = useState([]);
    const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

const cargarDatos = async () => {
  try {
    const datosFirestore = await obtenerDatos();
    setLista(datosFirestore);
  } catch (error) {
    console.error("Error al obtener datos desde Firestore:", error);
  }
};

useEffect(() => {
  cargarDatos();
}, []);

const guardar = async () =>{
    if (indiceSeleccionado !== null) {
        await editarDatos(lista[indiceSeleccionado].id, nombre, apellido, edad, nacionalidad);
        setIndiceSeleccionado(null);
    }else{
        await agregarDatos(nombre, apellido, edad, nacionalidad);
    }

    await cargarDatos();
    setNombre('');
    setApellido('');
    setEdad(0);
    setNacionalidad('');
}

const editar = (index) => {
    const persona = lista[index];
    setNombre(persona.nombre);
    setApellido(persona.apellido);
    setEdad(persona.edad);
    setNacionalidad(persona.nacionalidad);
    setIndiceSeleccionado(index);
}

const eliminar = async (index) =>{
    await eliminarDatos(lista[index].id);
    setIndiceSeleccionado(null);
    await cargarDatos();
    setNombre('');
    setApellido('');
    setEdad(0);
    setNacionalidad('');
}


    return (
        <div>
            <h1>Programacion</h1>
            
            <form>
                <label id="textNombre">Nombre</label>
                <input id="textNombre" value={nombre} type="text" onChange={(e) => setNombre(e.target.value)}></input>
                <label id="textApellido">Apellido</label>
                <input id="textApellido" value={apellido} type="text" onChange={(e) => setApellido(e.target.value)}></input>
                <label id="textEdad">Edad</label>
                <input id="textEdad" value={edad} type="text" onChange={(e) => setEdad(e.target.value)}></input>
                <label id="textNacionalidad">Nacionalidad</label>
                <input id="textNacionalidad" value={nacionalidad}  onChange={(e) => setNacionalidad(e.target.value)} type="text"></input>

                <button id="botoni" type="button" onClick={guardar}>
                    {indiceSeleccionado !== null ? 'Actualizar' : 'Guardar'}
                </button>
            </form>

            <table>
                <thead>
                    <th>Nombre</th>
                    <th>Apellido</th> 
                    <th>Edad</th>
                    <th>Nacionalidad</th> 
                    <th>Acciones</th>   
                </thead>
                <tbody>
                    {lista.map((persona, index) => (
                        <tr>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellido}</td>
                            <td>{persona.edad}</td>
                            <td>{persona.nacionalidad}</td>
                            <td>
                                <div id="botones">
                                <button type="button" onClick={() => editar(index)}>Editar</button>
                                <button type="button" onClick={() => eliminar(index)}>Eliminar</button>
                                </div>
                            </td>

                        </tr>


                    ))}


                </tbody>    
            </table>     
                
         </div>
    );
}
export default Pruebaprac;