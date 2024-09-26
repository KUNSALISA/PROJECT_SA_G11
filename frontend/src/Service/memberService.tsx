// src/services/member.service.tsx
import { Member } from './member.interface';
import { useState } from 'react';

export const useMemberService = () => {
    const [members, setMembers] = useState<Member[]>([]);

    // เพิ่มสมาชิกใหม่
    const createMember = (member: Member): Member => {
        member.id = members.length + 1; // กำหนด ID แบบ Auto-increment
        setMembers([...members, member]);
        return member;
    };

    // ดึงข้อมูลสมาชิกตาม ID
    const getMemberById = (id: number): Member | undefined => {
        return members.find(member => member.id === id);
    };

    // อัปเดตข้อมูลสมาชิก
    const updateMember = (id: number, updatedData: Partial<Member>): Member | undefined => {
        const updatedMembers = members.map(member => {
            if (member.id === id) {
                return { ...member, ...updatedData };
            }
            return member;
        });
        setMembers(updatedMembers);
        return getMemberById(id);
    };

    // ลบสมาชิก
    const deleteMember = (id: number): boolean => {
        const filteredMembers = members.filter(member => member.id !== id);
        if (filteredMembers.length === members.length) return false; // ถ้าไม่เจอสมาชิกที่ต้องการลบ
        setMembers(filteredMembers);
        return true;
    };

    // ดึงข้อมูลสมาชิกทั้งหมด
    const getAllMembers = (): Member[] => {
        return members;
    };

    return {
        createMember,
        getMemberById,
        updateMember,
        deleteMember,
        getAllMembers,
    };
};


