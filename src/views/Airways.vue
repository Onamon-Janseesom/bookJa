<template>
    <div class="container-fluid">
      <div class="text-center">
        <h1>FLIGHT BOOKING</h1>
       <div v-if="flights.length === 0">
            <h2> No Flight found at the moment </h2>
        </div>
      </div>

        <div class="">
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
                                  <button id="test" class="btn btn-sm btn-outline-secondary" v-on:click="bookFlight(customer._id)">  <v-icon dark>check</v-icon></button>
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
export default {
  data() {
    return {
      flights: []
    };
  },
  created() {
    this.fetchFlights();
  },
  methods: {
    fetchFlights() {
      axios
        .get(`http://ec2-18-219-205-234.us-east-2.compute.amazonaws.com:3000/available-flight`)
        .then(data => (this.flights = data.data.content));
    },
    bookFlight(id) {
      axios
        .delete(`${server.baseURL}/customer/delete?customerID=${id}`)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
    }
  }
};
</script>