import React from "react";
import GithubItem from "../githubItem/githubItem";
import { CardGroup } from "react-bootstrap";
import "./repositoryList.css";

export default ({ listItems, updateBookMarkArray, isDisplayingBookmark }) => {
  return (
    <CardGroup>
      {listItems.map((item, index) => (
        <GithubItem
          key={index}
          item={item}
          updateBookMarkArray={updateBookMarkArray}
          isDisplayingBookmark={isDisplayingBookmark}
        />
      ))}
    </CardGroup>
  );
};
