import React, { useEffect, useState } from "react";

const Button = (props) => {
  const { changePage } = props;
  const [pageNumber, setPageNumber] = useState(1);

  const onClickHandler = () => {
    setPageNumber((prevState) => {
      return prevState + 1;
    });
  };
  useEffect(() => {
    changePage(pageNumber);
  }, [pageNumber]);

  return (
    <button type="button" onClick={onClickHandler}>
      Load more
    </button>
  );
};

export default Button;
