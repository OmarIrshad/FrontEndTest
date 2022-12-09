/**
 * react component for a row in the items table
 * @function
 * @param {Object} item - the data of the current item
 * @author @AhsanWaseem
 */

const ViewItemRow = ({ item }) => {
    return (
        <tr>
            <td><b>{item.item_id}</b></td>
            <td>{item.item_name}</td>
            <td>{item.item_type}</td>
            <td>{item.item_price}</td>
            <td>{item.month_sales}</td>
        </tr>
    )
}

export default ViewItemRow;