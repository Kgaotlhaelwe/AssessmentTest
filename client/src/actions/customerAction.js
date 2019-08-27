import axios from 'axios';
import { GET_CUSTOMERS, ADD_CUSTOMER,  ITEMS_LOADING } from './type';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';


export const getCustomer = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  console.log(getState)
  axios
    .get('/api/customer' , tokenConfig(getState))
    .then(res =>
      dispatch({
        type:GET_CUSTOMERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCustomer = item => (dispatch, getState) => {
  axios
    .post('/api/customer', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_CUSTOMER,
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