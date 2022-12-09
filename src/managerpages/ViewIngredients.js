import NavBar from "../components/universal/NavBar";
import { useState, useEffect } from "react";
import ViewIngredientsRow from "../components/manager/ViewIngredientsRow";

/**
 * method for getting ingredient data from the backend
 * @method
 * @param {method} setIngredients - the method used to set the state of the ingredients
 * @author @ThucTran
 */
const getIngredients = async (setIngredients) => {
    const getIngredientsAPI = "http://localhost:5001/allingredients";
    await fetch(getIngredientsAPI)
        .then((response) => response.json())
        .then((data) => setIngredients(data));
}

/**
 * method for adding a new ingredient to the backend
 * @method
 * @param {Object} data  - the data of the ingredient to add to the database
 * @author @ThucTran
 */
const addIngredients = async (data) => {
    console.log(data);
    const addItemURL = "http://localhost:5001/addingredient"

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
 * method for updating ingredient stock in the backend
 * @method
 * @param {Object} data - the data of the ingredient to edit in the backend
 * @author @AakashHaran
 */
const updateIngredients = async (data) => {
    console.log(data);
    const addItemURL = "http://localhost:5001/updatestock"

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
 * react component for viewing items page
 * @function
 * @author @AakashHaran
 */
const ViewItems = () => {
    const [Ingredients, setIngredients] = useState([]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [minAmount, setMinAmount] = useState("");

    useEffect(() => {
        // setIngredients(data)
        getIngredients(setIngredients);
    }, [])

    return (
        <>
            <div className={"container"} style={{ marginTop: '5%' }}>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add an Ingredient</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingredient Name" aria-label="Username" aria-describedby="basic-addon1"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="Min Amount" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() => {
                                    addIngredients({
                                        name: name, stock: stock, minAmount: minAmount
                                    })
                                }}>Edit Ingredient</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit an Ingredient</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={id} onChange={(e) => setId(e.target.value)} placeholder="Ingredient ID" aria-label="Username" aria-describedby="basic-addon1"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingredient Name" aria-label="Username" aria-describedby="basic-addon1"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="Min Amount" aria-label="Amount (to the nearest dollar)"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={() => {
                                    updateIngredients({
                                        ingredientID: id, name: name, stock: stock, minAmount: minAmount
                                    })
                                }}>Add Ingredient</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary mb-3" style={{ backgroundColor: '#e60e33', border: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add an Item
                </button>
                <button type="button" class="btn btn-primary mb-3" style={{ marginLeft: '10px', backgroundColor: '#e60e33', border: 'none' }} data-bs-toggle="modal" data-bs-target="#updateModal">
                    Edit an Item
                </button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Item</th>
                            <th scope="col">Current Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Ingredients.map((item) => {
                            return <ViewIngredientsRow item={item} />
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewItems;