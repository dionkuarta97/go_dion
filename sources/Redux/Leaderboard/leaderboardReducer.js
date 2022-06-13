import {
  SET_LEADERBOARD_LIST,
  SET_LOADING,
  SET_MY_POSITION,
  SET_POSITION_TRYOUT,
  SET_TRYOUT_LEADER,
} from "./leaderboardType";

const initialState = {
  leaderboard: {
    data: null,
    loading: false,
    error: null,
  },
  tryoutLeader: {
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
  positionTryout: {
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
  } else if (action.type === SET_TRYOUT_LEADER) {
    return { ...state, tryoutLeader: action.payload };
  } else if (action.type === SET_POSITION_TRYOUT) {
    return { ...state, positionTryout: action.payload };
  }
  return state;
}

export default leaderboardReducer;
