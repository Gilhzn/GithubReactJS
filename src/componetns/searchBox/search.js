import React, { useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import "./search.css";

export default ({ inputText }) => {
  const [stateSearch, setstateSearch] = useState("");

  function handleChange(event) {
    setstateSearch(event.target.value.toLowerCase());
  }

  function searchData(event) {
    inputText(stateSearch);
  }

  function keyPressed(event) {
    if (event.key.toLowerCase() === "enter") {
      inputText(stateSearch);
    }
  }

  return (
    <Row className="rowStyle">
      <Col xs={6}>
        <Form.Control
          placeholder="Enter Repository Name"
          onChange={handleChange}
          onKeyPress={keyPressed}
        />
      </Col>
      <Col xs={4} md={4}>
        <Button onClick={searchData}>Search</Button>
      </Col>
    </Row>
  );
};
