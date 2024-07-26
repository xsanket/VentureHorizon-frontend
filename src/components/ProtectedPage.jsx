
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { getUser } from '../apiCalls/userApiCall';



export default function ProtectedPage({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const toast = useToast();

    const fetchUser = async () => {
        try {
            const response = await getUser();
            if (response.success) {
                setUser(response.data);
            }

        } catch (error) {
            toast({
                title: "Failed to get user data",
                status: "error",
                duration: 3000,
                position: "top"
            });
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        } else {
            toast({
                title: "You must be log in to view this page",
                status: "error",
                duration: 5000,
                position: "top"
            });
            navigate("/");
        }
    }, [navigate]);



    return (
        <div>{children}</div>
    )
}
