<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form @submit.prevent="agregarEmpleados()">
            <input
              type="text"
              placeholder="write your name"
              name="name"
              class="form-control"
              v-model="emple.name"
            />
            <br />

            <input
              type="text"
              placeholder="write your position"
              name="position"
              class="form-control"
              v-model="emple.position"
            />
            <br />

            <input
              type="text"
               placeholder="write your office"
              name="office"
              class="form-control"
              v-model="emple.office"
            />
            <br />

            <input
              type="text"
               placeholder="write your salary"
              name="salary"
              class="form-control"
              v-model="emple.salary"
            />
            <br />

            <button class="btn btn-primary btn-block">Enviar</button>
          </form>
        </div>

        <div class="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th>name</th>
                <th>position</th>
                <th>office</th>
                <th>salary</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="empleado in empleados" :key="empleado._id">
                <td>{{ empleado.name }}</td>
                <td>{{ empleado.position }}</td>
                <td>{{ empleado.office }}</td>
                <td>{{ empleado.salary }}</td> 
                <td><button class="btn btn-secondary" v-on:click="editarEmpleado(empleado._id)">Editar</button></td>
                <td><button class="btn btn-danger" v-on:click="eliminarEmpleados(empleado._id)">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

import axios from 'axios'

export default {
    data() {
        return {
            // esto es para hacer data binding y guardar los datos en cada una de las variables
            emple:{
                name:'',
                position:'',
                office:'',
                salary:0,
                empleadoId :'' // a esta variable la lleno con el di que hago click
            },
            empleados :{}, // aca se guardan los datos ,para luego hacer el recorrido
            url :'http://localhost:4000/api/employees'
        }     
    },
    created() {
           this.getEmpleados(); 
    },

    methods: {
          async getEmpleados(){
               const res = await axios.get(this.url);
               this.empleados = res.data
               console.log(res.data)
           },

          async agregarEmpleados(){
              if(this.empleadoId){
                  const res = await axios.put('http://localhost:4000/api/employees/' +this.empleadoId ,this.emple);
                  console.log(res.data)
                  this.getEmpleados();
                  this.emple={};

              }else{
                      const res = await axios.post(this.url,this.emple);
                      console.log(res.data)
                      this.getEmpleados(); 
                      this.emple={}; // de esta forma resetiamos "el estado.. las varibles del formulario q hago dtabinding"
              }
           } ,

           async eliminarEmpleados(id){
               const res =  await axios.delete('http://localhost:4000/api/employees/' + id);
                 this.getEmpleados(); 
                  console.log(res)
           },
            async editarEmpleado(id){
               const res =  await axios.get('http://localhost:4000/api/employees/' + id);
                      // al dato que vos me des,yo voy a hacer data binding
                     this.emple = res.data
                     this.empleadoId = id; // id que le paso ,se le paso a empleadoId
                     console.log(res.data)
           }
    }
}
</script>