import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import React from "react";

function Login() {
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value: inputValue } = e.target;
        setValue((prevData) => ({
            ...prevData,
            [name]: inputValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted", value);

        try {
            const payload = {
                email: value.email,
                password: value.password
            };
            console.log("Submitting login with payload:", payload);

            const response = await axios.post('http://localhost:8080/api/users/login', payload);
            console.log("Login successful:", response.data);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <>
            <div>Welcome to the Login Page</div>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={value.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={value.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
