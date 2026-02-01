import React, { useEffect } from 'react'
import api from '../services/api'

const EmployeeList = () => {
    useEffect(() => {
        api.get('/employees')
            .then(res => {
                console.log("Employees :", res.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [])
    return (
        <div className="container mt-4">
            <h2>Employee List</h2>
        </div>
    )
}

export default EmployeeList