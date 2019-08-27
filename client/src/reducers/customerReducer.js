import {
    GET_CUSTOMERS,
    ADD_CUSTOMER,
   
    ITEMS_LOADING
  } from '../actions/type';
  
  const initialState = {
    customers: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case  GET_CUSTOMERS:
        return {
          ...state,
          customers: action.payload,
          loading: false
        };
      
      case  ADD_CUSTOMER:
        return {
          ...state,
          customers: [action.payload, ...state. customers]
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