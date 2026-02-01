import React from 'react'
import api from '../services/api';

const EmployeeCard = ({ employee, onDelete }) => {
  const handleDelete = () => {
    api.delete(`/employees/${employee.id}`)
      .then((res) => {
        onDelete(employee.id)
      })
      .catch((err) => {
        console.log("delete err:" + err)
      })
  };

  return (
    <div className="border rounded p-3 mb-2 d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-1">{employee.name}</h5>
        <p className="text-muted mb-1">{employee.email}</p>
        <span
          className={`badge ${employee.status === "active" ? "bg-success" : "bg-secondary"
            }`}
        >
          {employee.status}
        </span>
      </div>
      <div>
        <button className="btn btn-sm btn-primary me-2">Edit</button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default EmployeeCard
