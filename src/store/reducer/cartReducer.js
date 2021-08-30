import { ActionType } from "../constant/action-type";
const {ADD_TO_CART,INC,DEC,REMOVE_PRODUCT,DETAIL_INC_DEC_ADD_TO_CART} = ActionType;

const initState = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0,
}

const cartReducer = (state = initState, {type, payload}) =>{

    switch (type) {    
        case ADD_TO_CART:
            const {productSelected, Tprice, Tquantity} = payload
        
            return {...state, 
                products: [...state.products, productSelected], 
                totalPrice: Math.round(Tprice), 
                totalQuantities:Tquantity,
            };
        
        case DETAIL_INC_DEC_ADD_TO_CART:
            const {TIncprice, TIncquantity} = payload

            return{
                ...state,
                totalPrice: Math.round(TIncprice), 
                totalQuantities:TIncquantity,
            };

            case INC:
                const { Incprice, Incquantity} = payload;
                return{
                    ...state,
                    totalPrice: Math.round(Incprice),
                    totalQuantities: Incquantity,
                }
                
            case DEC:
                const {Decprice, Decquantity} = payload;
                return{
                    ...state,
                    totalPrice: Math.round(Decprice),
                    totalQuantities: Decquantity,
                }

            case REMOVE_PRODUCT:
                const {filteredList, priceAfterRemoval, quantityAfterRemoval} = payload
               
                return{
                    ...state,
                    products: filteredList,
                    totalPrice: Math.round(priceAfterRemoval),
                    totalQuantities: quantityAfterRemoval,
                }
                

        default:
            return state;
    }

}


export default cartReducer;