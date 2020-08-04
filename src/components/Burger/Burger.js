//Ovo bi treabo biti burger koji cemo renderovati na ekran
import React from "react";
import Sastojci from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";
import { withRouter } from "react-router-dom";
import Button from "../UI/Button/Button";

const burger = (props) => {
  //debugger;
  //console.log(props);

  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      //debugger;
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        //debugger;
        return <Sastojci key={igKey + i} type={igKey} />;
        //igKey je npr. Salata, a i je 1,2,3
        //key je: salad0, salad1, cheese
      });
    }) //;   dok je bila ovdje, nije radilo reduce

    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  //reduce smo morali dodati da bi smo
  //mogli izbrojati duzinu lengtha i vidjeti je li nula

  //arr je previous value, el je current value

  // console.log(transformedIngredients);

  //Mislim da ce i ovdje morati nekako nastmati ingredients
  //A evo i kako cemo ih stimati, posto j estate tamo objekat a ne array, ne mozemo na njega spucati map func
  //zato cemo ovdje pretvoriti tamosnje ingredients u array of strings
  //object.keys metoda koja extraktuje kljuceve datog objekta i pretvara ih u array keyeva/kljuceva. a kljucevi su ustvari Salda, Bacon
  //Dakle dobit cemo array of Strings
  //map funkcija executa funkcija na svaki element u arrayu, dakl to je nasa verzija for loopa da prodjemo kroz sve clanove
  //da ih procesljamo

  //Da sumiramo ovo gore, ovo je dakle nacin da da transformisemo
  //jedan objekat koji sadrzi key value pairs, u array of burger ingredients
  //gdje nam je vrijednost objekta(value) vazna da odlucimo koliko sastojaka nam treba
  // key nam je vazan da znamo koji sastojak da dodamo
  console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    console.log(transformedIngredients);

    //debugger;
    transformedIngredients = <p>Dodajte sastojke po želji!</p>;
  }

  return (
    <div
      className={classes.Burger}
      /*style={{
          transform: props.burgerVisibility
            ? "translateY(0)"
            : "translateY(-110vh)",
        }}*/
    >
      <Sastojci type="bread-top" />

      {transformedIngredients}

      <Sastojci type="bread-bottom" />
    </div>
  );
};

//Zahvaljuci withRouter imamo prsitup historiji, match, location iako Burger.js nije ucitan direktno preko rute
export default withRouter(burger);
