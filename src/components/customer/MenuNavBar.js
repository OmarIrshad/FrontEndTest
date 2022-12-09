import '../../styles/customer/menunavbar.css';

/**
 * method to filter the items by item type for the customer
 * depending on the type they select
 * @method
 * @author @OmarIrshad 
 */
export function setItembyType(allitems, items, setItems, type) {
    const new_items = allitems.filter((item) => item.item_type === type);
    console.log(new_items)
    setItems(new_items);
}

/**
* react component for rendering the separate menu navbar
* @function
* @author @AhsanWaseem
*/
const MenuNavBar = (props) => {
    return (
        <div className={"menutopnav"}>
            <div className="menutopnav-centered">
                <button className="active" onClick={() => setItembyType(props.allitems, props.myitems, props.setItems, "Entrees")}>Entrees</button>
                <button className="active" onClick={() => setItembyType(props.allitems, props.myitems, props.setItems, "Drinks")}>Drinks</button>
                <button className="active" onClick={() => setItembyType(props.allitems, props.myitems, props.setItems, "Treats")}>Treats</button>
                <button className="active" onClick={() => setItembyType(props.allitems, props.myitems, props.setItems, "Salads")}>Salads</button>
            </div>

        </div>
    );
};

export default MenuNavBar;