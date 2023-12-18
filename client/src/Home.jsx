import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

const Home = () => {

    // Insert

    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        mobile: "",
    });


    const handleChange = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await axios.post("/create", inputUser);
        if (data.data.success) {
            alert(data.data.message);
            fetchAllUser();
            event.target.reset();
        }
    };





    // Fetch All 

    const [userData, setUserData] = useState([]);
    const fetchAllUser = async () => {
        const res = await axios.get("/")
        console.log(res);
        setUserData(res.data);
    }
    useEffect(() => {
        fetchAllUser();
    }, []);



    // Delete

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:8000/delete/${id}`);
        if (res.status === 200) {
            fetchAllUser();
        }
    };

    return (
        <>
            <div className="container">
                <h1>Crud app in Mern Stack</h1>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="col-md-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" name="name" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" placeholder="Enter phone" name="mobile" onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>

            <div className="container mt-5">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((item, i) => (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <div className="flex gap-x-4 justify-center">
                                            <NavLink
                                                to={`/read/${item._id}`}
                                                className="btn btn-success"
                                            >
                                                Read
                                            </NavLink>
                                            <NavLink
                                                to={`/update/${item._id}`}
                                                className="btn btn-warning mx-3"
                                            >
                                                Edit
                                            </NavLink>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>



        </>
    )
}

export default Home;