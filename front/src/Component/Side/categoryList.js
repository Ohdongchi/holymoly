import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryRequest } from "../store/redux/reducer/Category.reducer";

const CategoryList = ({data}) => {

    


  return (
    <ul>
      <li>title</li>
      <li>
        <ul>
          <li>hi!</li>
          <li>hi!</li>
          <li>hi!</li>
          <li>hi!</li>
        </ul>
      </li>
    </ul>
  );
};

export default CategoryList;
