import {
  GET_CAMPAIGN_LOADING,
  GET_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_ERROR,
  SORTED_LOADING,
  SORTED_SUCCESS
} from './types'
import axios from 'axios';

export const getCampaign = () => {
  return dispatch => {
    dispatch({ type: GET_CAMPAIGN_LOADING });
    axios.get('http://localhost:3000/campaign')
      .then(({ data }) => {
        dispatch({
          type: GET_CAMPAIGN_SUCCESS,
          payload: data
        })
      }).catch(err => {
        dispatch({
          type: GET_CAMPAIGN_ERROR,
          error: err.message
        })
      })
  }
};

export const changeSorted = (type) => {
  return dispatch => {
    dispatch({ type: SORTED_LOADING });
    dispatch({ type: SORTED_SUCCESS, payload: type })
  }
};