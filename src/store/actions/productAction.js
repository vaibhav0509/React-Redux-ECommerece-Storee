import { ActionType } from "../constant/action-type"
export const setProdcuts = (products) => {

    return{
        type: ActionType.SET_PRODUCTS,
        payload: products,
    }

}

export const selectedProduct = (selectedProductToShow) => {
    return {
        type: ActionType.SELECTED_PRODUCT,
        payload: selectedProductToShow,
    }
}