import axios from 'axios';
import { GET_PRODCUTS, ADD_PRODUCT,  ITEMS_LOADING } from './type';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';


export const getProducts = () => (dispatch) => {
  dispatch(setItemsLoading());
  
  axios
    .get('/api/product')
    .then(res =>
      dispatch({
        type:GET_PRODCUTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addProduct = item => (dispatch, getState) => {
  axios
    .post('/api/product', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};