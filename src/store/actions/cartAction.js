import { ActionType } from "../constant/action-type";

export const addToCart = (product) => {

    return{
        type: ActionType.ADD_TO_CART,
        payload: product,

    }
}

export const detailIncDecAddToCart = (payload) =>{
    
    return{
        type: ActionType.DETAIL_INC_DEC_ADD_TO_CART,
        payload: payload,
    }
}

export const increment_by_one = (payload) => {

    return {
        type: ActionType.INC,
        payload: payload,
    }
}

export const decrement_by_one = (payload) => {

    return {
        type: ActionType.DEC,
        payload: payload,
    }
}

export const removeProduct = (payload) => {

    return {
        type: ActionType.REMOVE_PRODUCT,
        payload: payload,
    }
}