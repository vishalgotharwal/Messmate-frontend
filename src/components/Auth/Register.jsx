import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        roleId: 0 
    });

    const [message, setMessage] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
         console.log("Fetching roles from backend")
        axios.get('http://localhost:8080/api/roles/getallroles')
            .then(response => {
                setRoles(response.data);
                console.log("Roles fetched:", response.data);
                console.log("Current roles state:", roles.id);
            })
            .catch(error => {
                console.error("There was an error fetching roles!", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field changed: ${name}, New value: ${value}`);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    try {
        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
           roleId:  parseInt(formData.roleId, 10)
        };
        console.log("Submitting registration with payload:", payload);
        console.log("we are calling the api")
        const response = await axios.post('http://localhost:8080/api/users/register', payload);
        setMessage('User Registered Successfully!');
        console.log("Registration successful:", response.data);
    } catch (error) {
        console.error("Error during registration:", error);
        setMessage('Error: ' + (error.response?.data || error.message));
    }
};

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="roleId"
                    value={formData.roleId}
                    onChange={handleChange}
                    className="form-select mb-3"
                    required
                >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.rolename}
                        </option>
                    ))}
                </select>
                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
