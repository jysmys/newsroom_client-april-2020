import initialState from '../store/initialState';


const articleReducer = (state=initialState, action ) => {
  if (action.type === "SET_ACTIVE_ARTICLE") {
    debugger
		return {
			...state,
			activeArticle: action.payload
    } 
} else { return state }
}
export default articleReducer;
