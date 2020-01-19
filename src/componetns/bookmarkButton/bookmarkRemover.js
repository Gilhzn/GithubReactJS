import React from "react";
import "./bookmark.css";

export default ({ item, updateBookMarkArray }) => {
  function removeItem(item) {
    item.isbookmarked = false;
    return updateBookMarkArray(item, "Delete");
  }

  return (
    <span className="trash" onClick={() => removeItem(item)}>
      <span></span>
      <i></i>
    </span>
  );
};
