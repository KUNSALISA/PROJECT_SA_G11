// // src/services/payment.service.tsx
// import { Payment } from './payment.interface';
// import { useState } from 'react';

// export const usePaymentService = () => {
//     const [payments, setPayments] = useState<Payment[]>([]);

//     // เพิ่มการชำระเงินใหม่
//     const createPayment = (payment: Payment): Payment => {
//         payment.id = payments.length + 1; // สมมติว่า ID เพิ่มขึ้นอัตโนมัติ
//         setPayments([...payments, payment]);
//         return payment;
//     };

//     // ดึงข้อมูลการชำระเงินตาม ID
//     const getPaymentById = (id: number): Payment | undefined => {
//         return payments.find(payment => payment.id === id);
//     };

//     // อัปเดตสถานะการชำระเงิน
//     const updatePaymentStatus = (id: number, status: boolean): Payment | undefined => {
//         const updatedPayments = payments.map(payment => {
//             if (payment.id === id) {
//                 return { ...payment, PaymentStatus: status };
//             }
//             return payment;
//         });
//         setPayments(updatedPayments);
//         return getPaymentById(id);
//     };

//     // ลบการชำระเงิน
//     const deletePayment = (id: number): boolean => {
//         const filteredPayments = payments.filter(payment => payment.id !== id);
//         if (filteredPayments.length === payments.length) return false; // ถ้าขนาดไม่เปลี่ยน แสดงว่าไม่มี ID นั้น
//         setPayments(filteredPayments);
//         return true;
//     };

//     // ดึงข้อมูลการชำระเงินทั้งหมด
//     const getAllPayments = (): Payment[] => {
//         return payments;
//     };

//     return {
//         createPayment,
//         getPaymentById,
//         updatePaymentStatus,
//         deletePayment,
//         getAllPayments,
//     };
// };

import { Payment } from './payment.interface';
import { useState } from 'react';

export const usePaymentService = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    // เพิ่มการชำระเงินใหม่
    const createPayment = (payment: Omit<Payment, 'id' | 'PaymentDate' | 'PaymentTime'>): Payment => {
        const newPayment: Payment = {
            ...payment,
            id: payments.length + 1, // สมมติว่า ID เพิ่มขึ้นอัตโนมัติ
            PaymentDate: new Date(), // วันที่ปัจจุบัน
            PaymentTime: new Date().toLocaleTimeString(), // เวลาในรูปแบบที่ต้องการ
        };
    
        setPayments([...payments, newPayment]);
        return newPayment;
    };
    

    // ดึงข้อมูลการชำระเงินตาม ID
    const getPaymentById = (id: number): Payment | undefined => {
        return payments.find(payment => payment.id === id);
    };

    // อัปเดตสถานะการชำระเงิน
    const updatePaymentStatus = (id: number, status: boolean, amount?: number): Payment | undefined => {
        const updatedPayments = payments.map(payment => {
            if (payment.id === id) {
                return {
                    ...payment,
                    PaymentStatus: status,
                    amount: amount !== undefined ? amount : payment.amount // อัปเดต amount ถ้าถูกระบุ
                };
            }
            return payment;
        });
    
        setPayments(updatedPayments);
        return getPaymentById(id);
    };
    
    
    // ลบการชำระเงิน
    const deletePayment = (id: number): boolean => {
        const filteredPayments = payments.filter(payment => payment.id !== id);
        if (filteredPayments.length === payments.length) return false; // ถ้าขนาดไม่เปลี่ยน แสดงว่าไม่มี ID นั้น
        setPayments(filteredPayments);
        return true;
    };

    // ดึงข้อมูลการชำระเงินทั้งหมด
    const getAllPayments = (): Payment[] => {
        return payments;
    };

    return {
        createPayment,
        getPaymentById,
        updatePaymentStatus,
        deletePayment,
        getAllPayments,
    };
};
