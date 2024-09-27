import { MailusInterface } from "../interfaces/mailus";

import { MyinboxInterface } from "../interfaces/myinbox";

import { Member } from "../interfaces/member.interface";

import axios from "axios";

const apiUrl = "http://localhost:8080";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};


async function Myinbox(data: MyinboxInterface) {

  return await axios

    .post(`${apiUrl}/myinbox`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function  GetNotifications(memberId: string) {

  return await axios

    .get(`${apiUrl}/notifications/${memberId}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetNotificationById(id: string) {

  return await axios

    .get(`${apiUrl}/notification/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreateNotification(data: MyinboxInterface) {

  return await axios

    .put(`${apiUrl}/notification`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function DeleteNotificationById(id: string) {

  return await axios

    .delete(`${apiUrl}/notification/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function UpdateNotificationById(id: string,data: MyinboxInterface) {

  return await axios

    .post(`${apiUrl}/notification/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

// ฟังก์ชันสำหรับส่งข้อมูลไปยัง backend
export const sendDataToBackend = async (formData: MailusInterface) => {
  try {
    const response = await axios.post(`${apiUrl}/request`, FormData, requestOptions);
    return response.data; // คืนค่าข้อมูลจาก response
  } catch (error) {
    // ตรวจสอบว่า error มีรายละเอียดหรือไม่
    if (axios.isAxiosError(error)) {
      console.error('Error sending data to backend:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // ส่งข้อผิดพลาดออกไปเพื่อให้ handleSubmit จัดการ
  }
};
export {
  Myinbox,
  GetNotifications,
  GetNotificationById,
  CreateNotification,
  UpdateNotificationById,
  DeleteNotificationById,
  

};