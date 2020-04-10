<template>
    <div class="container-fluid">
      <div class="text-center">
        <h1>HOTEL BOOKING</h1>
       <div v-if="hotels.length === 0">
            <h2> No Room found at the moment </h2>
        </div>
      </div>

        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">room</th>
                  <th scope="col">Detail</th>
                  <th scope="col">Price</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="hotel in hotels" :key="hotel._id">
                  <td>{{ hotel.hotelName }}</td>
                  <td>{{ hotel.room }}</td>
                  <td>{{ hotel.detail }}</td>
                  <td>{{ hotel.price }}</td>
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
      hotels: []
    };
  },
  created() {
    this.fetchHotels();
  },
  methods: {
    fetchHotels() {
      axios
        .get(`http://ec2-13-58-119-33.us-east-2.compute.amazonaws.com:4000/available-hotel`)
        .then(data => (this.hotels = data.data.content));
    },
    bookHetel(id) {
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