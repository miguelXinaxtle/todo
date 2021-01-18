import {
  FETCH_DAY_FAILURE,
  FETCH_DAY_REQUEST,
  FETCH_DAY_SUCCESS,
} from "./dayTypes";

const initialState = {
  loading: false,
  dayList: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DAY_SUCCESS:
      return {
        loading: false,
        dayList: action.payload,
        error: "",
      };
    case FETCH_DAY_FAILURE:
      return {
        loading: false,
        dayList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
