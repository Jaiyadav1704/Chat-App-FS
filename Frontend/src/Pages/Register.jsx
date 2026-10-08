import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/api";

function Register(){
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await API.post(
                "/auth/register",
                formData
            )

            localStorage.setItem("token", response.data.token)

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            )

            navigate("/chat")
        }catch(err){
            console.log(err);
            console.log(err.response?.data);

            alert("Registration Failed");
        }
    }
    return(
        <div>
            <h1> Register </h1>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
                />
                <br/><br/>

                <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}/>

                <br/><br/>

                <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}/>

                <br/><br/>

                <button type="submit">Register</button>
            </form>

            <Link to="/">Already have an account? Login </Link>
        </div>
    )
}

export default Register;