import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    
    const [formInputValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
        name: enteredNameIsValid,
        address: enteredAddressIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid,
    })

    const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if(!formIsValid)
    {
        return;
    }

    props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        city: enteredCity,
        postalCode: enteredPostalCode,
    });
    
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
  const addressControlClasses = `${classes.control} ${formInputValidity.address ? "" : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? "" : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>

      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p className={classes.error}>Please enter a name!</p>}
      </div>

      <div className={addressControlClasses}>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' ref={addressInputRef}/>
        {!formInputValidity.address && <p className={classes.error}>Please enter an address!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p className={classes.error}>Please enter a postal code (5 characters long)</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p className={classes.error}>Please enter a city!</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;