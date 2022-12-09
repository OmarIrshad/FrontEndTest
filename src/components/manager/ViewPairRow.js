/**
 * react component for a row in the frequent pair table
 * @function
 * @param {Object} pair - data related to the current frequent pair
 * @author @AakashHaran
 */
const ViewPairRow = ({ pair }) => {
    return (
        <tr>
            <td>{pair.first_item}</td>
            <td>{pair.second_item}</td>
            <td>{pair.num_orders}</td>
        </tr>
    )
}

export default ViewPairRow;