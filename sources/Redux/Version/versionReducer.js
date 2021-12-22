const initialState = {
    androidVersion: "0.1.47",
    iosVersion: "0.0.0",
    androidCode: 27,
    iosCode:0
};

export function versionReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
