<template>
    <div class="row" id="form-register">
        <div class="col-md-2"></div>
        <div class="col-md-8">
         <h3 class="panel-heading">{{title}}</h3>
          <div v-if="del.status !== 'cancel success'">
          <div v-if="res.status === 'booking success'">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Flight Number</th>
                  <th scope="col">Seat</th>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">Room Number</th>
                  <th scope="col">Select</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="res.status !== 'failed'">
                  <td>{{ this.res.flightNumber }}</td>
                  <td>{{ this.res.seat }}</td>
                  <td>{{ this.res.hotelName }}</td>
                  <td>{{ this.res.roomNumber }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                  
                                    <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteBook()" ><v-icon >delete</v-icon></button>
                               
                                
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
            
         <div v-if="res.status === 'failed'">
            <h1>จองไม่สำเร็จ</h1>
        </div>
        <br/>
         <label>Airways</label>
          <div id='searchResultsSection'>
         
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Flight</th>
                  <th scope="col">Company</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Seat</th>
                  <th scope="col">Price</th>
                  <th scope="col">Select</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="flight in flights" :key="flight.id">
                  <td>{{ flight.flightNumber }}</td>
                  <td>{{ flight.company }}</td>
                  <td>{{ flight.from }}</td>
                  <td>{{ flight.to }}</td>
                  <td>{{ flight.seat }}</td>
                  <td>{{ flight.price }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                  <button id="test" class="btn btn-sm btn-outline-secondary" v-on:click="Book(flight.flightNumber,flight.seat)" >  <v-icon >check</v-icon></button>
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
           <br/>
                        <label>Hotel</label>
                          <div id='searchResultsSection'>
                         
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">room</th>
                  <th scope="col">Detail</th>
                  <th scope="col">Price</th>
                  <th scope="col">Select</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hotel in hotels" :key="hotel._id">
                  <td>{{ hotel.hotelName }}</td>
                  <td>{{ hotel.room }}</td>
                  <td>{{ hotel.detail }}</td>
                  <td>{{ hotel.price }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                
                                    <button class="btn btn-sm btn-outline-secondary" v-on:click="Bookh(hotel.hotelName,hotel.room)"><v-icon >check</v-icon></button>
                                   
                                
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
           <br/>
            <form action="" method="post" v-on:submit.prevent="register">
                <div class="panel panel-primary">
                   
                    
                    <div class="panel-body">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" v-model="formdata.userName" placeholder="Name" class="form-control" name="name" id="name"/>
                        </div>
            
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" v-model="formdata.email" placeholder="Enter Email" class="form-control" name="email" id="email"/>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="phone" v-model="formdata.phone" placeholder="Enter Phone" class="form-control" name="phone" id="phone"/>
                        </div>
            
                       
                     
                
                        <div class="form-group">
                            <button type="submit" class="btn btn-danger">Book</button>
                            <label class="label label-success">{{message}}</label>
                        </div>


                        
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-2"></div>
    </div>
    
</template>
<style>
    #form-register{
        margin-top:30px;
    }
    #searchResultsSection{
  height: 280px;
   overflow: scroll;

}
</style>
<script>

import axios from "axios";

    export default{
        data(){
            return{
                title:"Booking",
                formdata:{},
                formbook:{},
                message:"",
                success:0,
                flights: [],
                hotels:[],
                res:[],
                del:[]
            }
        },
         created() {
    this.fetchFlights();
    this.fetchHotels();
  },
        methods:{
           register(){ 
              
             
    this.formbook.userName =  this.formdata.userName
                console.log(this.formbook)
           this.axios.post('http://ec2-18-219-65-242.us-east-2.compute.amazonaws.com:5000/create',this.formdata).then(
                 data => {
            console.log(data.data.content)

            },
            error => {
            console.log(error);
            } );
             this.axios.post('http://ec2-18-219-65-242.us-east-2.compute.amazonaws.com:5000/booking',this.formbook).then(
                 data => {
                    this.res = data.data.content
                    console.log(this.res)
            },
            error => {
            console.log(error);
            
            } );
              
           
            
                
                   
            },
            fetchFlights() {
            
            axios
                .get(`http://ec2-18-219-205-234.us-east-2.compute.amazonaws.com:3000/available-flight`)
                .then(data => (this.flights = data.data.content));
            },fetchHotels() {
            axios
                .get(`http://ec2-13-58-119-33.us-east-2.compute.amazonaws.com:4000/available-hotel`)
                .then(data => (this.hotels = data.data.content));
            }, 
            deleteBook() {
                console.log(this.formbook)
             this.axios.post('http://ec2-18-219-65-242.us-east-2.compute.amazonaws.com:5000/cancel',this.formbook).then(
                 data => {
                    this.del = data.data.content
                    console.log(this.del)
            },
            error => {
            console.log(error);
            
            } );
             this.del.status = 'cancel success'
            },
            Book(flightNo,s) {
                console.log(flightNo,s)
                this.formbook.flightNumber =  flightNo
                this.formbook.seat =  s
                console.log(this.formbook)
             
            },
             Bookh(hotelN,r) {
                console.log(hotelN,r)
                this.formbook.hotelName =  hotelN
                this.formbook.roomNumber =  r
                console.log(this.formbook)
             
            },
           
        
    }
}

</script>