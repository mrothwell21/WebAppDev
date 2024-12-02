import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const setStatus = () => {
    const { userData } = useAuth();

    const setCourseStatus = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5050/api/student-courses/activate`, 
                {
                    method: 'POST',
                    body: new URLSearchParams({ course: courseId})
                }
            );

            // console.log(response);

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

    return ({setCourseStatus})
};

export default setStatus;