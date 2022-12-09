import '../../styles/customer/cartitemcard.css'



/**
 * react component to show each individual item in the menu
 * @function
 * @author @OmarIrshad @AhsanWaseem
 */
const CartItemCard = (props) => {
    return (

        <div className="CartItemCard">
            <div className="cartImg">
                <img src={props.item.image_url} height={500} width={350} />
            </div>
            <div className="CartItemRight">
                <h4 class="CartItem_Name"> {props.item.item_name} </h4>
                <p class="ItemPrice" > ${props.item.item_price} </p>
                <div className="cartbuttons">
                    <button onClick={() => props.incrementCartItem(props.cart, props.setCart, props.item.item_id)} className={"Increment"}> + </button>
                    <button onClick={() => props.decrementCartItem(props.cart, props.setCart, props.item.item_id)} className={"Decrement"}> - </button>
                    <p class="CartQuantity"> Quantity : {props.item.item_quantity} </p>
                </div>
            </div>

        </div>





    );
};

export default CartItemCard; 
