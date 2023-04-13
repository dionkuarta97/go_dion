import { SET_BAB, SET_BUSAK, SET_MAPEL, SET_SUB_BAB } from "./bukuSaktiTypes";

const initialState = {
   listBusak: {
      data: null,
      error: false,
      loading: false,
   },
   listMapel: {
      data: null,
      error: false,
      loading: false,
   },
   listBab: {
      data: null,
      error: false,
      loading: false,
   },
   listSubBab: {
      data: null,
      error: false,
      loading: false,
   },
};

export const bukuSaktiReducer = (state = initialState, action) => {
   if (action.type === SET_BUSAK) {
      return { ...state, listBusak: action.payload };
   } else if (action.type === SET_MAPEL) {
      return { ...state, listMapel: action.payload };
   } else if (action.type === SET_BAB) {
      return { ...state, listBab: action.payload };
   } else if (action.type === SET_SUB_BAB) {
      return { ...state, listSubBab: action.payload };
   }
   return state;
};
