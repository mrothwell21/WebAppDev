import React from 'react';
import { useAuth } from "../contexts/AuthContext";

const getCourseToRegister = () => {
    const { userData } = useAuth();

    const getCourses = async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/student-courses/${encodeURIComponent(userData.username)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': userData.token
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch courses');
                return [];
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    };

    return ({getCourses})
};

export default getCourseToRegister;