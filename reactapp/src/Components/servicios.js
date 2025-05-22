import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
// ...existing code...
import { db } from '../services/firebase';
// ...existing code...

export const obtenerDatos = async () => {
    const informacion = await getDocs(collection(db, "informacion"));
    return informacion.docs.map((doc) => ({ ...doc.data(), id: doc.id })); 
}

export const agregarDatos =  async (nombre, apellido, edad, nacionalidad) => {
    try {
        await addDoc(collection(db, "informacion"), {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            nacionalidad: nacionalidad
        });
    }catch (error) {
        console.error("Error al agregar el documento: ", error);
    }
}
export const editarDatos = async (id, nombre, apellido, edad, nacionalidad) => {

    const docRef = doc(db, "informacion", id);
    await updateDoc(docRef, 
        {
            nombre: nombre,
            apellido: apellido, 
            edad:edad,
            nacionalidad: nacionalidad,}
    )}

export const eliminarDatos = async (id) => {
    const dato = doc(db, "informacion", id);
    await deleteDoc(dato);
}