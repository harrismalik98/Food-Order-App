import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighLighted]= useState(false);

    const cartCtx = useContext(CartContext);

    // The reduce() function takes an array and applies a callback function to each element of the array to accumulate a single output value. 
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump :'' }`;

    useEffect(()=> {
        if(cartCtx.items.length === 0){
            return;
        }
        
        setBtnIsHighLighted(true);
        
        const timer = setTimeout(()=>{
            setBtnIsHighLighted(false);
        },300);

        return () => {
            clearTimeout(timer);
        }
    },[cartCtx.items])

    return(
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;