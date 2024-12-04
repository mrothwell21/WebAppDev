import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const findCourse = () => {
    const { userData } = useAuth();

    const getCourseDetails = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:5050/api/teacher-courses/courses/${encodeURIComponent(courseId)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': userData.token
                }
            });

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

    return ({getCourseDetails})
};

export default findCourse;