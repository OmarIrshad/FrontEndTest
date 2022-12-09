import { useState, useEffect } from "react";
import ViewEmployeeRow from "../components/manager/ViewEmployeeRow";

/**
 * method for getting employee data from the backend
 * @function
 * @param {method} setEmployees - the method used to set the employees state
 * @author @ThucTran
 */
const getEmployees = async (setEmployees) => {
    const getEmpAPI = "http://localhost:5001/allemployees";
    await fetch(getEmpAPI)
        .then((response) => response.json())
        .then((data) => setEmployees(data));
}

/**
 * react component for viewing the employee table
 * @function
 * @author @AakashHaran
 */
const ViewEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees(setEmployees);
    }, [])

    return (
        <>
            <div className={"container"} style={{ marginTop: '5%' }}>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Clocked In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            return <ViewEmployeeRow employee={employee} />
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewEmployees;