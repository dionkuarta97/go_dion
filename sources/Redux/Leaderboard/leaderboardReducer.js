import {
  SET_LEADERBOARD_LIST,
  SET_LOADING,
  SET_MY_POSITION,
} from "./leaderboardType";

const initialState = {
  leaderboard: {
    data: null,
    loading: false,
    error: null,
  },
  loading: false,
  myPosition: {
    data: null,
    loading: false,
    error: null,
  },
};

function leaderboardReducer(state = initialState, action) {
  if (action.type === SET_LEADERBOARD_LIST) {
    return { ...state, leaderboard: action.payload };
  } else if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  } else if (action.type === SET_MY_POSITION) {
    return { ...state, myPosition: action.payload };
  }
  return state;
}

export default leaderboardReducer;
