import React from "react";
import "./bookmark.css";

export default ({ item, updateBookMarkArray }) => {
  function toggleBookmark(item) {
    if (!item.isbookmarked) {
      item.isbookmarked = true;
      return updateBookMarkArray(item, "Add");
    }
    item.isbookmarked = false;
    return updateBookMarkArray(item, "Delete");
  }

  return (
    <div
      className={item.isbookmarked ? "activebookmark" : "bookmark"}
      onClick={() => toggleBookmark(item)}
    ></div>
  );
};
