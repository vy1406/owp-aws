'use client';

import withAuth from '@/hooks/withAuth';
import React from 'react';

const SecuredPage = () => {

    const fetchSecureData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch("/api/secure-data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Secure data fetched successfully:", data);
            } else {
                console.error("Error fetching secure data:", data);
            }
        } catch (error) {
            console.error("Error making request:", error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Secured Page</h1>
            <p>Only authenticated users can see this page.</p>
            <button onClick={fetchSecureData}>Fetch Secure Data</button>
        </div>
    );
};

export default withAuth(SecuredPage);