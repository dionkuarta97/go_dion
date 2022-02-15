import { urlHomeMenu } from "../../Services/ApiUrl";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";
import { SET_HOME_MENU, SET_SLIDER_IMAGES } from "./homeTypes";

export function getSliderImages() {
  return async (dispatch, getState) => {
    const urlBase = getState().initReducer.baseUrl;
    dispatch(setSliderImages({ loading: true, error: null, data: null }));
    try {
      const response = await fetch(urlBase + "/moc/banner", {
        method: "GET",
      });
      const result = await response.json();
      dispatch(setSliderImages(defaultDoneState(result)));
    } catch (err) {
      dispatch(
        setSliderImages({
          loading: false,
          error: "Terjadi keslahan saat memproses data",
          data: null,
        })
      );
      console.log(err);
    }
  };
}

export function setSliderImages(sliderImages) {
  return {
    type: SET_SLIDER_IMAGES,
    payload: sliderImages,
  };
}

export function getHomeMenu() {
  return async (dispatch, getState) => {
    const urlBase = getState().initReducer.baseUrl;
    dispatch(setHomeMenu(defaultInitState));
    try {
      fetch(urlBase + urlHomeMenu)
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setHomeMenu(defaultDoneState(json.data)));
          } else dispatch(setHomeMenu(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setHomeMenu(defaultErrorState));
        });
    } catch (err) {
      dispatch(setHomeMenu(defaultErrorState));
    }
  };
}

export function setHomeMenu(homeMenu) {
  return {
    type: SET_HOME_MENU,
    payload: homeMenu,
  };
}
