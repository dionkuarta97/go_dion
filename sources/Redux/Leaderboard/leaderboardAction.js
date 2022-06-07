import {
  SET_LEADERBOARD_LIST,
  SET_LOADING,
  SET_MY_POSITION,
  SET_POSITION_TRYOUT,
  SET_TRYOUT_LEADER,
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

export const setTryoutLeader = (payload) => {
  return {
    type: SET_TRYOUT_LEADER,
    payload,
  };
};

export const setPositionLeader = (payload) => {
  return {
    type: SET_POSITION_TRYOUT,
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

export const getPositionTryout = (type, params) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setPositionLeader(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(
        urlBase +
          "/scoring/v1/report/leaderboards/tryout/my-rank/" +
          type +
          "?tryout_id=" +
          params.id +
          "&tahun=" +
          params.tahun,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.status) {
        dispatch(setPositionLeader(defaultDoneState(json.data)));
      } else {
        dispatch(setPositionLeader(defaultFailedState(json.message)));
      }
    } catch (err) {
      console.log(err);
      dispatch(setPositionLeader(defaultErrorState));
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
          params.page +
          "&tahun=" +
          params.tahun,
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
            user: json.data.user,
            my_position: json.data.my_position,
            total_data: json.data.total_data,
            my_point: json.data.my_point,
            rankings: rankings,
          };
          //   console.log(JSON.stringify(rankings, null, 2));

          dispatch(setLeaderboard(defaultDoneState(data)));
          dispatch(setLoading(false));
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

export const getTryoutLeader = (params, leaderboard) => {
  return async (dispatch, getState) => {
    try {
      if (params.page === 1) {
        dispatch(setTryoutLeader(defaultInitState));
      } else {
        dispatch(setLoading(true));
      }

      const urlBase = getState().initReducer.baseUrl;
      console.log(
        urlBase +
          "/scoring/v1/report/leaderboards/tryout/" +
          params.type +
          "?limit=" +
          params.limit +
          "&page=" +
          params.page +
          "&tahun=" +
          params.tahun +
          "&tryout_id=" +
          params.id
      );
      const response = await fetch(
        urlBase +
          "/scoring/v1/report/leaderboards/tryout/" +
          params.type +
          "?limit=" +
          params.limit +
          "&page=" +
          params.page +
          "&tahun=" +
          params.tahun +
          "&tryout_id=" +
          params.id,
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
          setTimeout(() => {
            dispatch(setTryoutLeader(defaultDoneState(json.data)));
          }, 500);
        } else {
          let rankings = [...leaderboard, ...json.data.rankings];
          let data = {
            user: json.data.user,
            my_position: json.data.my_position,
            total_data: json.data.total_data,
            my_point: json.data.my_point,
            rankings: rankings,
          };
          //   console.log(JSON.stringify(rankings, null, 2));

          dispatch(setTryoutLeader(defaultDoneState(data)));
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setTryoutLeader(defaultFailedState(json.message)));
      }
    } catch (err) {
      console.log(err);
      dispatch(setTryoutLeader(defaultErrorState));
    }
  };
};
