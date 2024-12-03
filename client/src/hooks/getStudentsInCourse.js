import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const fetchStudents = () => {
    const { userData } = useAuth();

    const getStudentsInCourse = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5050/api/teacher-courses/students/${courseId}`, {
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
                console.error('Failed to fetch students');
                return [];
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    };

    return ({getStudentsInCourse})
};

export default fetchStudents;