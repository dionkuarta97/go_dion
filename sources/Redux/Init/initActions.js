import { SET_BASEURL } from "./initTypes";

export function setBaseurl(url) {
    return {
        type: SET_BASEURL,
        payload: url,
    };
}
