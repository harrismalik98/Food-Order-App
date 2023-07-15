import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
// ];


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(()=>{
    const fetchMeals = async() => {
      const response = await fetch(process.env.REACT_APP_FIREBASE_MEALS);

      if(!response.ok)
      {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json(); // converting JSON Data object to JS-Object.

      // responseData is object so we are converting that into an array of object.
      // console.log(responseData);

      const loadedMeals = [];

      // for in for looping thorugh objects.
      for(const key in responseData)
      {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);

      // Now its converted into array of objects.
      // console.log(loadedMeals);
    }

    // Handling an error inside of a promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if(isLoading)
  {
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError)
  {
    return(
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

    // const mealsList = meals.map(meal => <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} />);

    return(
        <section className={classes.meals}>
            <ul>
                <Card>
                    {meals.map(meal => {
                        return <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
                    })}
                    {/* {mealsList} */}
                </Card> 
            </ul>
        </section>
    )
}

export default AvailableMeals;