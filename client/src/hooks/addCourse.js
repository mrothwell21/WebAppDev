import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const plusCourse = () => {
    const { userData } = useAuth();

    const addCourse = async (courseId, name, maxCapacity, majorId, description) => {
        try {
            const response = await fetch(`http://localhost:5050/api/student-courses/activate`, 
                {
                    method: 'POST',
                    body: new URLSearchParams({ courseId: courseId, name: name, maxCapacity: maxCapacity, majorId: majorId, description: description})
                }
            );

            // console.log(response);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to fetch course');
                return [];
            }
        } catch (error) {
            console.error('Error fetching course:', error);
            return [];
        }
    };

    return ({addCourse})
};

export default plusCourse;