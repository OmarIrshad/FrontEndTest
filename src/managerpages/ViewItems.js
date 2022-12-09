import { useState, useEffect } from "react";
import ViewItemRow from "../components/manager/ViewItemRow";
import ViewPairRow from "../components/manager/ViewPairRow";

/**
 * method for getting items from the backend
 * @method
 * @param {method} setItems - the method used to set the state of the items vaiable
 * @author @OmarIrshad
 */
export const getItems = async (setItems) => {
    const getItemsAPI = "http://localhost:5001/allitems";
    await fetch(getItemsAPI)
        .then((response) => response.json())
        .then((data) => setItems(data));
}

/**
 * method for getting frequent pairs from the databse
 * @method
 * @param {method} setPairs - the method used to set the state of
 * the frequent pairs variable
 * @author @AhsanWaseem
 */
const getPairs = async (setPairs) => {
    const getItemsAPI = "http://localhost:5001/frequentpairs";
    await fetch(getItemsAPI)
        .then((response) => response.json())
        .then((data) => setPairs(data));
}

/**
 * method for adding an item to the database
 * @method
 * @param {Object} data - the data about the item to be added to the backend
 * @author @AakashHaran
 */
const addItem = async (data) => {
    console.log(data);
    const addItemURL = "http://localhost:5001/additem"

    const response = await fetch(addItemURL,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
}

/**
 * method for placing the correct table in the view page
 * @method
 * @author @AakashHaran
 */
const getTable = (viewFrequent, items, pairs) => {
    if (!viewFrequent) {
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Item</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        return <ViewItemRow item={item} />
                    })}
                </tbody>
            </table>)
    } else {
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">First Item</th>
                        <th scope="col">Second Item</th>
                        <th scope="col">Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {pairs.map((pair) => {
                        return <ViewPairRow pair={pair} />
                    })}
                </tbody>
            </table>)
    }
}

/**
 * react component for viewing the ingredient stock page
 * @function
 * @author @AakashHaran
 */
const ViewStock = () => {
    const [items, setItems] = useState([]);
    const [pairs, setPairs] = useState([]);

    const [itemName, setItem] = useState("");
    const [price, setPrice] = useState(0.00);
    const [ingredients, setIngredients] = useState("");
    const [quantities, setQuantities] = useState("");
    const [type, setType] = useState("");
    const [viewFrequent, setViewFrequent] = useState(false);
    const [orderBtnText, setOrderBtnText] = useState("")

    useEffect(() => {
        getItems(setItems);
        getPairs(setPairs)
    })

    useEffect(() => {
        if (viewFrequent) {
            setOrderBtnText("View Items");
        } else {
            setOrderBtnText("View Frequent Item Pairs");
        }
    }, [viewFrequent])

    return (
        <>
            <div className={"container"} style={{ marginTop: '5%' }}>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add an item</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={itemName} onChange={(e) => setItem(e.target.value)} placeholder="Item Name" aria-label="Username" aria-describedby="basic-addon1"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">$</span>
                                        <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients: '1, 2, 3'" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={quantities} onChange={(e) => setQuantities(e.target.value)} placeholder="Quantities: '1, 2, 3'" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <select class="form-control" name="cars" id="cars" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option value="Entrees">Entrees</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="Treats">Treats</option>
                                            <option value="Salads">Salads</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() => addItem(
                                    { itemName: itemName, price: price, ingredients: ingredients, quantities: quantities, type: type }
                                )}>Add Item</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary mb-3" style={{ backgroundColor: '#e60e33', border: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add an Item
                </button>
                <button type="button" class="btn btn-primary mb-3" onClick={() => setViewFrequent(!viewFrequent)} style={{ marginLeft: '10px', backgroundColor: '#e60e33', border: 'none' }}>
                    {orderBtnText}
                </button>
                {getTable(viewFrequent, items, pairs)}
            </div>
        </>
    );
}

export default ViewStock;