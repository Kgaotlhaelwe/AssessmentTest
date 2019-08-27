import {
    GET_SOLDPRODUCTS,
    ADD_SOLDPRODUCT,
   
    ITEMS_LOADING
  } from '../actions/type';
  
  const initialState = {
    soldProducts: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case  GET_SOLDPRODUCTS:
        return {
          ...state,
          soldProducts: action.payload,
          loading: false
        };
      
      case ADD_SOLDPRODUCT:
        return {
          ...state,
          soldProducts: [action.payload, ...state. soldProducts]
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }