import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {


    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        mobile: "",
    });


    const {id} = useParams();
   
    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:8000/read/${id}`);
        setInputUser({
          name: res.data.name,
          email: res.data.email,
          mobile: res.data.mobile,
        });
      };
      useEffect(() => {
        fetchSingleUser();
      }, []);



    const handleChange = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await axios.put(`http://localhost:8000/update/${id}`, inputUser);
        if (data.data.success) {
            alert(data.data.message);
            window.location = "/";
        }
    };


    return (
        <div className="container">
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" name="name" value={inputUser.name} onChange={handleChange} />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name="email" value={inputUser.email} onChange={handleChange} />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputMobile" name="mobile" value={inputUser.mobile} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser;