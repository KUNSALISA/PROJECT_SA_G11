// export interface Payment {
//     id: number;
//     PaymentStatus: boolean; // true สำหรับ paid, false สำหรับ unpaid
//     PaymentDate: Date;
//     PaymentTime: string;
//     MemberID: number;
//     BookingID: number;
//     BenefitID: number;
// }

// payment.interface.ts
export interface Payment {
    id: number;
    PaymentStatus: boolean; // true สำหรับ paid, false สำหรับ unpaid
    PaymentDate: Date;
    PaymentTime: string; // ตรวจสอบรูปแบบให้ตรงกับ Backend
    MemberID: number;
    BookingID: number;
    BenefitID: number;
    amount: number; // เปลี่ยนจาก string เป็น number
}

