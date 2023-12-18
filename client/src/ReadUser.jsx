import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ReadUser = () => {

    const {id} = useParams();

    const [userData, setUserData] = useState([]);
    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:8000/read/${id}`);
        setUserData(res.data);
    }

    useEffect(() => {
        fetchSingleUser();
    }, []);


    return (
        <div className="container mt-5">
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{userData.name}</td>
                        <td>{userData.mobile}</td>
                        <td>{userData.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ReadUser