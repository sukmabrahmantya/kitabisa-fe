import {
  GET_CAMPAIGN_LOADING,
  GET_CAMPAIGN_SUCCESS,
  GET_CAMPAIGN_ERROR,
  SORTED_LOADING,
  SORTED_SUCCESS
} from './types'

const initialState = {
  loading: false,
  campaign: [],
  data: [],
  error: '',
  sorted: 'default'
};

const campaigns = (state = initialState, action) => {
  switch(action.type) {
    case GET_CAMPAIGN_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        campaign: action.payload,
        data: action.payload.data
      }
    case GET_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case SORTED_LOADING:
      return {
        ...state,
        loading: true
      }
    case SORTED_SUCCESS:
      const data = state.data
      if (action.payload === 'donation_goal') {
        data.sort(function(a, b) {
          return a.donation_target - b.donation_target;
        });
      } else if (action.payload === 'days_left') {
        data.sort(function(a, b) {
          return a.days_remaining - b.days_remaining;
        });
      } else {
        data.sort(function(a, b) {
          return a.order - b.order;
        });
      }
      return {
        ...state,
        loading: false,
        data,
        sorted: action.payload
      }
    default: 
			return state;
  }
}

export default campaigns;