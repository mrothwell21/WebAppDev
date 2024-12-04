import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const registerCourses = () => {
    const { userData } = useAuth();

    const registerCourse = async (courseId, majorPrefix) => {
        try {
            // console.log(selectedMajor);
            const response = await fetch(`http://localhost:5050/api/student-courses/register}`, {
                method: 'POST',
                body: new URLSearchParams({ username: userData.username, courseId: courseId, prefix:majorPrefix})
            });

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

    return ({registerCourse})
};

export default registerCourses;