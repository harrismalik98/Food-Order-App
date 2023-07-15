
import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
    return(
         <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/> {/* By using Spread Operator all properties of props.input object come here as attributes: type="text" etc */}
         </div>
    )
});

export default Input;