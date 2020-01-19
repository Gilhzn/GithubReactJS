import React from "react";
import { Card } from "react-bootstrap";
import Bookmark from "../bookmarkButton/bookmarkButton";
import RemoveBookmark from "../bookmarkButton/bookmarkRemover";
import "./githubItem.css";

export default ({ item, updateBookMarkArray, isDisplayingBookmark }) => {
  function DisplayBookmark(isDisplaying) {
    if (isDisplaying) {
      return <Bookmark item={item} updateBookMarkArray={updateBookMarkArray} />;
    }
    return (
      <RemoveBookmark item={item} updateBookMarkArray={updateBookMarkArray} />
    );
  }

  let component = DisplayBookmark(isDisplayingBookmark);
  return (
    <Card className="card-responsive">
      {component}
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
      </Card.Body>
      <Card.Img src={item.avatar_url} />
    </Card>
  );
};
