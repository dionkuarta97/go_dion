import { urlBaseMasterdata } from "../../Services/ApiUrl";
import {
   defaultDoneState,
   defaultErrorState,
   defaultFailedState,
   defaultInitState,
} from "../helper";
import { SET_BAB, SET_BUSAK, SET_MAPEL, SET_SUB_BAB } from "./bukuSaktiTypes";

export const setBusak = (payload) => {
   return {
      type: SET_BUSAK,
      payload,
   };
};

export const getBusak = (payload) => {
   return async (dispatch, getState) => {
      try {
         dispatch(setBusak(defaultInitState));
         const urlBase = getState().initReducer.baseUrl;
         const response = await fetch(
            urlBase + urlBaseMasterdata + "/busak?status=" + payload,
            {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${getState().authReducer.token}`,
               },
            }
         );
         const json = await response.json();

         if (json.status) {
            dispatch(setBusak(defaultDoneState(json.data)));
         } else {
            dispatch(setBusak(defaultFailedState(json.message)));
         }
      } catch (err) {
         dispatch(setBusak(defaultErrorState));
      }
   };
};

export const setMapel = (payload) => {
   return {
      type: SET_MAPEL,
      payload,
   };
};

export const getMapel = (payload) => {
   return async (dispatch, getState) => {
      try {
         dispatch(setMapel(defaultInitState));
         const urlBase = getState().initReducer.baseUrl;
         const response = await fetch(
            urlBase + urlBaseMasterdata + `/busak/${payload}/matpel`,
            {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${getState().authReducer.token}`,
               },
            }
         );
         const json = await response.json();

         if (json.status) {
            dispatch(setMapel(defaultDoneState(json.data)));
         } else {
            dispatch(setMapel(defaultFailedState(json.message)));
         }
      } catch (err) {
         dispatch(setMapel(defaultErrorState));
      }
   };
};

export const setBab = (payload) => {
   return {
      type: SET_BAB,
      payload,
   };
};

export const getBab = (payload) => {
   return async (dispatch, getState) => {
      try {
         dispatch(setBab(defaultInitState));
         const urlBase = getState().initReducer.baseUrl;
         const response = await fetch(
            urlBase +
               urlBaseMasterdata +
               `/busak/${payload.busakId}/bab?matpel_id=${payload._id}`,
            {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${getState().authReducer.token}`,
               },
            }
         );

         const json = await response.json();

         if (json.status) {
            dispatch(setBab(defaultDoneState(json.data)));
         } else {
            dispatch(setBab(defaultFailedState(json.message)));
         }
      } catch (err) {
         dispatch(setBab(defaultErrorState));
      }
   };
};

export const setSubBab = (payload) => {
   return {
      type: SET_SUB_BAB,
      payload,
   };
};

export const getSubBab = (payload) => {
   return async (dispatch, getState) => {
      try {
         dispatch(setSubBab(defaultInitState));
         const urlBase = getState().initReducer.baseUrl;
         const response = await fetch(
            urlBase +
               urlBaseMasterdata +
               `/busak/${payload.busakId}/subbab?matpel_id=${payload.matpelId}&bab_id=${payload._id}`,
            {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${getState().authReducer.token}`,
               },
            }
         );

         const json = await response.json();

         if (json.status) {
            dispatch(setSubBab(defaultDoneState(json.data)));
         } else {
            dispatch(setSubBab(defaultFailedState(json.message)));
         }
      } catch (err) {
         dispatch(setSubBab(defaultErrorState));
      }
   };
};
