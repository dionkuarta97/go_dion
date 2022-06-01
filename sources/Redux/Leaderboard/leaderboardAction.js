import {
  SET_LEADERBOARD_LIST,
  SET_LOADING,
  SET_MY_POSITION,
} from "./leaderboardType";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";

export const setLeaderboard = (payload) => {
  return {
    type: SET_LEADERBOARD_LIST,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setMyPosition = (payload) => {
  return {
    type: SET_MY_POSITION,
    payload,
  };
};

export const getMyPosition = (type) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setMyPosition(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(
        urlBase + "/scoring/v1/report/leaderboards/my-rank/" + type,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.status) {
        dispatch(setMyPosition(defaultDoneState(json.data)));
      } else {
        dispatch(setMyPosition(defaultFailedState(json.message)));
      }
    } catch (err) {
      console.log(err);
      dispatch(setMyPosition(defaultErrorState));
    }
  };
};

export const getLeaderboard = (params, leaderboard) => {
  return async (dispatch, getState) => {
    try {
      if (params.page === 1) {
        dispatch(setLeaderboard(defaultInitState));
      } else {
        dispatch(setLoading(true));
      }

      const urlBase = getState().initReducer.baseUrl;

      const response = await fetch(
        urlBase +
          "/scoring/v1/report/leaderboards/" +
          params.type +
          "?limit=" +
          params.limit +
          "&page=" +
          params.page,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );

      const json = await response.json();
      if (json.status) {
        if (params.page === 1) {
          dispatch(setLeaderboard(defaultDoneState(json.data)));
        } else {
          let rankings = [...leaderboard, ...json.data.rankings];
          let data = {
            my_position: json.data.my_position,
            total_data: json.data.total_data,
            my_point: json.data.my_point,
            rankings: rankings,
          };
          //   console.log(JSON.stringify(rankings, null, 2));

          setTimeout(() => {
            dispatch(setLeaderboard(defaultDoneState(data)));
            dispatch(setLoading(false));
          }, 1000);
        }
      } else {
        dispatch(setLeaderboard(defaultFailedState(json.message)));
      }
    } catch (err) {
      console.log(err);
      dispatch(setLeaderboard(defaultErrorState));
    }
  };
};
