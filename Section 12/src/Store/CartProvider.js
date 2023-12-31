import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items : [],
    totalAmount : 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
        const existinfCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existinfCartItem){
            const updatedItem = {
                ...existinfCartItem,
                amount : existinfCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount ;
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    return defaultCartState;
};
const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type : 'ADD', item : item});
    };

    const removeItemFromCartHandler = id =>{
        dispatchCartAction({type : 'REMOVE', id : id})
    };

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem :addItemToCartHandler,
        removeItem : removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;