import axios from "axios";

const fetchArticles = () => {
  return async (dispatch) => {
    const response = await axios.get("/articles");

    return dispatch(dispatchArticleAction(response.data.articles));
  };
};

const dispatchArticleAction = (json) => {
  return {
    type: "GET_ARTICLE_LIST",
    payload: {
      articles: json,
    },
  };
};

export { fetchArticles };
