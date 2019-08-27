import axios from 'axios';
import { GET_SOLDPRODUCTS, ADD_SOLDPRODUCT,  ITEMS_LOADING } from './type';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';


export const getSoldProduct = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  console.log(getState)
  axios
    .get('/api/soldProduct' , tokenConfig(getState))
    .then(res =>
      dispatch({
        type:GET_SOLDPRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addSoldProduct = item => (dispatch, getState) => {
  axios
    .post('/api/soldProduct', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type:  ADD_SOLDPRODUCT,
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