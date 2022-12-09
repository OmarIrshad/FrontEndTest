/**
 * react component for a row in the item table
 * @function
 * @param {Object} order_item - the data about the order_item
 * @author @AakashHaran
 */
const MoreOrderItemRow = ({ order_item }) => {
    return (
        <tr>
            <td>{order_item.name}</td>
            <td>{order_item.quantity}</td>
            <td>{order_item.price}</td>
        </tr>
    );
}

export default MoreOrderItemRow;