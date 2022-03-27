import axios from "axios";

export const CATEGORY_REQUEST = "CATEGORY_REQUEST";
export const CATEGORY_RESPONSE = "CATEGORY_RESPONSE";
export const CATEGORY_ERROR = "CATEGORY_ERROR";

const initState = {
    data: [],
    error: "",
}

export const categoryRequest = () => {
    return { type: CATEGORY_REQUEST };
}

export const categoryResponse = (value) => {
    return {
        type: CATEGORY_RESPONSE,
        payload: value,
    };
}

export const categoryError = (err) => {
    console.error(err);
    return {
        type: CATEGORY_ERROR
    };
}

const CategoryReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case CATEGORY_REQUEST:
            return {
                ...state
            };
        case CATEGORY_RESPONSE:
            return {
                ...state,
                payload: action.payload
            };
        case CATEGORY_ERROR:
            return state;
    }
}

export default CategoryReducer;