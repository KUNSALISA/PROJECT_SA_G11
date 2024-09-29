import axios from "axios";
import { Booking } from "../../../frontend/src/interfaces/booking";

const apiUrl = "http://localhost:8080";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function CreateBookingAll(data: Booking) {
    return await axios
      .post(`${apiUrl}/booking`, data, requestOptions)
      .then((res) => res)
      .catch((e) => e.response);
}

async function GetAvailableFlights(params: { departure: string; arrival: string; flight_date: string }) {
  return await axios
    .get(`${apiUrl}/availableflights`, { 
      ...requestOptions,
      params // ส่ง params ไปที่ axios
    })
    .then((res) => res)
    .catch((e) => e.response);
}

export{CreateBookingAll,GetAvailableFlights};

