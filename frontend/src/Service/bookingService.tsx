// src/services/booking.service.tsx
import { Booking } from './booking.interface';
import { useState } from 'react';

export const useBookingService = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    // เพิ่มการจองใหม่
    const createBooking = (booking: Booking): Booking => {
        if (booking.TotalPrice <= 0) {
            throw new Error("TotalPrice must be greater than zero");
        }
        booking.id = bookings.length + 1; // กำหนด ID แบบ Auto-increment
        setBookings([...bookings, booking]);
        return booking;
    };
    
    // ดึงข้อมูลการจองตาม ID
    const getBookingById = (id: number): Booking | undefined => {
        return bookings.find(booking => booking.id === id);
    };

    // อัปเดตข้อมูลการจอง
    const updateBooking = (id: number, updatedData: Partial<Booking>): Booking | undefined => {
        if (updatedData.TotalPrice !== undefined && updatedData.TotalPrice <= 0) {
            throw new Error("TotalPrice must be greater than zero");
        }
    
        const updatedBookings = bookings.map(booking => {
            if (booking.id === id) {
                return { ...booking, ...updatedData };
            }
            return booking;
        });
        setBookings(updatedBookings);
        return getBookingById(id);
    };
    

    // ลบข้อมูลการจอง
    const deleteBooking = (id: number): boolean => {
        const filteredBookings = bookings.filter(booking => booking.id !== id);
        if (filteredBookings.length === bookings.length) return false; // ถ้าไม่เจอ ID ที่ต้องการลบ
        setBookings(filteredBookings);
        return true;
    };

    // ดึงข้อมูลการจองทั้งหมด
    const getAllBookings = (): Booking[] => {
        return bookings;
    };

    return {
        createBooking,
        getBookingById,
        updateBooking,
        deleteBooking,
        getAllBookings,
    };
};

