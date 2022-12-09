/**
 * function to place clocked in column in table
 * @method
 * @param {boolean} clocked_in - the value indicating whether an employee is clocked in
 * @author @AakashHaran
 */
function placeClockedIn(clocked_in) {
    if (clocked_in)
        return <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled></input>
    return <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled></input>
}

/**
 * react component for a row in the employee atble
 * @function
 * @author @AakashHaran
 */
const ViewEmployeeRow = ({ employee }) => {
    return (
        <tr>
            <td><b>{employee.emp_id}</b></td>
            <td>{employee.emp_fname} {employee.emp_lname}</td>
            <td>{employee.emp_role}</td>
            <td>
                {placeClockedIn(employee.emp_clocked_in)}
            </td>
        </tr>
    );
}

export default ViewEmployeeRow;