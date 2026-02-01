import React, { useEffect } from 'react'
import api from '../services/api'
import { useState } from 'react'
import EmployeeCard from '../components/EmployeeCard'

const EmployeeList = () => {
  const [employees, setemployees] = useState([])

  const removeEmployeeFromUI = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setemployees("");
  };

  useEffect(() => {

    api.get('/employees')
      .then((res) => {
        console.log(res.data);
        setemployees(res.data.data);

      }).catch((err) => {
        console.log("Api Error :", err)
      })
  }, [])



  return (
    <div className="card">
      <div className="card-header">
        <h4 className="mb-0">Employees</h4>
      </div>

      <div className="card-body">
        {employees.length === 0 ? (
          <p>No employees found</p>

        ) : (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onDelete={removeEmployeeFromUI} />
          ))


        )}
      </div>
    </div>
  )
}

export default EmployeeList