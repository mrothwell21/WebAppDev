import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const fetchCourses = () => {
    const { userData } = useAuth();

    const getTeacherCourses = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`http://localhost:5050/api/teacher-courses/${encodeURIComponent(userData.username)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': storedData.userToken
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

    return ({getTeacherCourses})
};

export default fetchCourses;