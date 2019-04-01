import { SET_LOADING } from "../types";

const setLoading = (bool) => ({
    type: SET_LOADING,
    payload: bool
});

export default {
    setLoading
};
