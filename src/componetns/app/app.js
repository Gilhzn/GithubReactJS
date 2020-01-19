import React, { Component } from "react";
import GithubList from "../repositoryList/repositoryList";
import Search from "../searchBox/search";
import { Container, Tabs, Tab } from "react-bootstrap";
import Loader from "../loader/loader";
import "./app.css";
import Service from "../../services/service";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      bookmarkItems: [],
      isLoaderActvie: false
    };
  }

  componentWillMount() {
    //get bookmark from server (MVC local host)
    (async () => {
      let json = await Service.GetGithubBookmark();
      this.setState({
        bookmarkItems:
          typeof json !== "undefined" && json.length > 0 ? json : []
      });
    })();
  }

  passingSearchProps = textValue => {
    //display loader
    this.setState({ isLoaderActvie: true });
    //async call
    (async () => {
      let result = await Service.GithubSearch(textValue);
      //set state with result
      this.setState({
        isLoaderActvie: false,
        items:
          typeof result.items !== "undefined" && result.items.length > 0
            ? this.addIsBookmarkProp(result.items, this.state)
            : []
      });
    })();
  };

  addIsBookmarkProp = (items, state) => {
    //create new array that include the desired values
    let newArray = items.map(({ id, name, owner }) => ({
      id,
      name,
      avatar_url: owner.avatar_url
    }));

    newArray.forEach(function(element) {
      const isExist = state.bookmarkItems.some(r => r.id == element.id);
      ////add to array or change to true or false isbookmarked field
      if (isExist) {
        element.isbookmarked = true;
      } else {
        element.isbookmarked = false;
      }
    });
    return newArray;
  };

  loaderActivation = isActive => {
    if (isActive) {
      let loader = <Loader />;
      document.body.style.overflow = "hidden";
      return loader;
    }
    document.body.style.overflow = "auto";
    return null;
  };

  bookmarkedPassingArray = (item, action) => {
    Service.AddRemoveItem(item, action);
    //add item to array
    if (action.toString().toLowerCase() == "add") {
      this.setState(prevState => ({
        bookmarkItems: [...prevState.bookmarkItems, item]
      }));
    }
    //delete item from array
    else {
      this.setState({
        bookmarkItems: this.state.bookmarkItems.filter(x => x.id != item.id)
      });
    }
  };

  render() {
    let loader;
    loader = this.loaderActivation(this.state.isLoaderActvie);

    return (
      <Container>
        {loader}
        <Tabs
          className="tabsStyle"
          defaultActiveKey="githubsearch"
          id="github-tabs"
        >
          <Tab eventKey="githubsearch" title="Github Search">
            <Search inputText={this.passingSearchProps} />
            <GithubList
              listItems={this.state.items}
              updateBookMarkArray={this.bookmarkedPassingArray}
              isDisplayingBookmark={true}
            />
          </Tab>
          <Tab eventKey="bookmark" title="Bookmarked">
            <GithubList
              listItems={this.state.bookmarkItems}
              updateBookMarkArray={this.bookmarkedPassingArray}
              isDisplayingBookmark={false}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
