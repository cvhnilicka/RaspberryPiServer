import React, { Component } from "react";
import "./Article.css";
var createReactClass = require("create-react-class");
/*
  Article
  <Article />
*/
var Article = createReactClass({
  render: function () {
    var details = this.props.details,
        styles = {
          backgroundColor: '#' + details.color
        };
    console.log(details)

    return (
      <article className="article">
        <h2 className="article__title">{this.props.index}</h2>
        <h2 style={styles} className="article__title">{String(details.on)}</h2>
      </article>
    )
  }
});

export default Article;
