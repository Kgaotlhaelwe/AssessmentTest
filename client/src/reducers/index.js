import { combineReducers } from 'redux';
//import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productReducer from "./productReducer" ;
import customerReducer from './customerReducer';
import soldProductsReducer from "./soldProductsReducer" ;

export default combineReducers({
  product: productReducer,
  customer :customerReducer ,
  error: errorReducer,
  auth: authReducer ,
  soldProducts :soldProductsReducer
});