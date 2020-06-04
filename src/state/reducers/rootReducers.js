import initialState from "../store/initialState";

const rootReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_MESSAGE":
      return {
        ...state,
        signupMessage: action.payload.signupMessage,
      };
    case "GET_ARTICLE_LIST":
      return {
        ...state,
        articles: action.payload.articles,
      };
    default:
      return state;
  }
};

export default rootReducers;
  