import React, { useState } from "react";
import classes from "./Searchbar.module.css";

const Searchbar = (props) => {
  const [data, setData] = useState("");
  const { inputData } = props;

  const onInputChange = (e) => {
    setData(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    inputData(data);
    setData("");
  };

  return (
    <header className={classes.searchbar}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <button type="submit" className={classes.button}>
          <span className={classes["button-label"]}>Search</span>
        </button>

        <input
          value={data}
          className={classes.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
