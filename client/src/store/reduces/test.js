import {
  FETCH_TEST_REQUEST,
  FETCH_TEST_SUCCESS,
  FETCH_TEST_FAILURE,
} from '../types'

const initialState = {
  items: [],
  loading: true,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEST_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case FETCH_TEST_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      }

    case FETCH_TEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
