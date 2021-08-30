import { ActionType } from "../constant/action-type"
const {SET_PRODUCTS, SELECTED_PRODUCT} = ActionType;



const intitaltrailState = {
    productArray: [],
    productSelected: {},
}


const productsReducer = (state = intitaltrailState, {type, payload}) =>{
    switch (type) {
        case SET_PRODUCTS:
            return{...state, productArray: payload}

        case SELECTED_PRODUCT:
            return {...state, productSelected: payload}
        default:
            return state;
    }

}


export default productsReducer

