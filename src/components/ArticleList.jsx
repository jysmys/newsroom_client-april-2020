import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";
import ArticleCard from "../components/ArticleCard";
import Ad from "./Ad";
import mercedesImg from "../images/mercedesAd.jpg";
import lagavulinImg from "../images/lagavulinAd.jpg";
import "../css/article.css";
import { fetchArticles } from "../state/action/articleActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const ArticleList = (props) => {
  const category = props.match.params.category || "";
  const articleList = props.articleList;

  useEffect(() => {
    props.fetchArticles();
  }, []);

  let filteredArticles = () => {
    switch (category) {
      case "":
        return articleList;
      case "current":
        return articleList.filter((article) => {
          return Date.now() - Date.parse(article.published_at) < 86400000;
        });
      default:
        return articleList.filter((article) => article.category === category);
    }
  };

  let articleCards = filteredArticles().map((article) => {
    return <ArticleCard article={article} />;
  });

  return (
    <div>
      <Grid fluid columns={3} divided centered>
        <Ad
          link={"https://www.mercedes-benz.com/en/"}
          id={"ad-1"}
          img={mercedesImg}
          alt={"mercedes"}
        />
        {articleCards}
        <Ad
          link={"https://www.malts.com/en-gb/visit-our-distilleries/lagavulin/"}
          id={"ad-2"}
          img={lagavulinImg}
          alt={"lagavulin"}
        />
      </Grid>
    </div>
  );
};

// bind the dispatch to the function
const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: bindActionCreators(fetchArticles, dispatch),
  };
};

// only reading the state
// mapping the redux state to the properties
const mapStateToProps = (state) => {
  return {
    articleList: state.articles,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
