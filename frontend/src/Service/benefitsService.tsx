// src/services/benefits.service.tsx
import { Benefits } from '../interfaces/benefits.interface';
import { useState } from 'react';

export const useBenefitsService = () => {
    const [benefits, setBenefits] = useState<Benefits[]>([]);

    // เพิ่มข้อมูลสิทธิประโยชน์ใหม่
    const createBenefits = (benefit: Benefits): Benefits => {
        benefit.id = benefits.length + 1; // กำหนด ID แบบ Auto-increment
        setBenefits([...benefits, benefit]);
        return benefit;
    };

    // ดึงข้อมูลสิทธิประโยชน์ตาม ID
    const getBenefitsById = (id: number): Benefits | undefined => {
        return benefits.find(benefit => benefit.id === id);
    };

    // อัปเดตข้อมูลสิทธิประโยชน์
    const updateBenefits = (id: number, updatedData: Partial<Benefits>): Benefits | undefined => {
        const updatedBenefits = benefits.map(benefit => {
            if (benefit.id === id) {
                return { ...benefit, ...updatedData };
            }
            return benefit;
        });
        setBenefits(updatedBenefits);
        return getBenefitsById(id);
    };

    // ลบข้อมูลสิทธิประโยชน์
    const deleteBenefits = (id: number): boolean => {
        const filteredBenefits = benefits.filter(benefit => benefit.id !== id);
        if (filteredBenefits.length === benefits.length) return false; // ถ้าไม่เจอ ID ที่ต้องการลบ
        setBenefits(filteredBenefits);
        return true;
    };

    // ดึงข้อมูลสิทธิประโยชน์ทั้งหมด
    const getAllBenefits = (): Benefits[] => {
        return benefits;
    };

    return {
        createBenefits,
        getBenefitsById,
        updateBenefits,
        deleteBenefits,
        getAllBenefits,
    };
};

