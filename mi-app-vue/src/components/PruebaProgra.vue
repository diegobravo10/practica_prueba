<template>
  <div class="hello">
    <h1>Prueba de Programacion</h1>
    <form>
        <label id="textNombre">Nombre</label>
        <input id="textNombre" v-model="nombre" type="text">
        <label id="textApellido">Apellido</label>
        <input id="textApellido" v-model="apellido" type="text">
        <label id="textEdad">Edad</label>
        <input id="textEdad" v-model="edad" type="number">
        <label id="textNacionalidad">Nacionalidad</label>
        <input id="textNacionalidad" v-model="nacionalidad" type="text">
        <button @click="guardar" type="button"> {{ editando !== null ? 'Actualizar' : 'Guardar' }}</button>
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
      <tr v-for="(persona, index) in personas" :key="index">
        <td>{{ persona.nombre }}</td>
        <td>{{ persona.apellido }}</td>
        <td>{{ persona.edad }}</td>
        <td>{{ persona.nacionalidad }}</td>
        <td>
          <dv id="botones">
          <button @click="editar(index)">Editar</button>
          <button @click="eliminar(index)">Eliminar</button>
        </dv>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
import { db } from './services/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default {
  name: 'PruebaProgra',
  props: {
    msg: String
  },
  data() {
    return {
      nombre: '',
      apellido: '',
      edad: 0,
      nacionalidad: '',
      personas: [],
      editando: null
    };
},
  methods: {
   async guardar() {
     /*const registro = {
        nombre: this.nombre,
        direccion: this.direccion
      };*/

      if (this.editando !== null) {
        const datoRef = doc(db, 'informacion', this.personas[this.editando].id);
        await updateDoc(datoRef, {
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad, 
        nacionalidad:  this.nacionalidad})
        this.editando = null;
        await this.cargarDatos();

      } else {
        await addDoc(collection(db, 'informacion'),{
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad, 
        nacionalidad: this.nacionalidad});
        await this.cargarDatos();

        //this.personas.push(registro);
      }

      //localStorage.setItem('datos', JSON.stringify(this.personas));
      this.nombre = '';
      this.apellido = '';
      this.edad = '',
      this.nacionalidad = ''
    },
   async eliminar(index) {

      const dato =  doc(db, 'informacion', this.personas[index].id);
      await deleteDoc(dato);
      await this.cargarDatos();

      //this.personas.splice(index, 1);
      //localStorage.setItem('datos', JSON.stringify(this.personas));
    },
    editar(index) {
      const persona = this.personas[index];
      this.nombre = persona.nombre;
      this.apellido = persona.apellido;
      this.edad = persona.edad;
      this.nacionalidad = persona.nacionalidad;
      this.editando = index;
    },
    async cargarDatos(){
      const informacion = await getDocs(collection(db, 'informacion'));
      this.personas =  informacion.docs.map(doc => ({id: doc.id, ...doc.data()}));
    }

  },
  async mounted() {
    //const datos = localStorage.getItem('datos');
    const informacion = await getDocs(collection(db, 'informacion'));
    this.personas =  informacion.docs.map(doc => ({id: doc.id, ...doc.data()}));
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
label, input {
    margin: 10px;
}

table {
  width: 60%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
  margin-left: 300px;
}

th, td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
}

thead {
  background-color: #42b983;
  color: white;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #97e0ae;
}
#botones {
  display: flex;
  justify-content: center;
  gap: 10px;
}

#botones :hover {
  background-color: #35a1af;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
