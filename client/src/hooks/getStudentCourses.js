import { React } from "react";
import { useAuth } from "../contexts/AuthContext";

const fetchCourses = () => {
    const { userData } = useAuth();
    const params = new URLSearchParams(location.search);
    const selectedMajor = params.get("major");

    const getStudentCourses = async () => {
        try {
            console.log(selectedMajor);
            const response = await fetch(`http://localhost:5050/api/student-courses/${encodeURIComponent(selectedMajor)}`, {
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
                console.error('Failed to fetch courses');
                return [];
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    };

    return ({getStudentCourses})
};

export default fetchCourses;