import axios from 'axios'
const _apiBase = 'http://localhost:3000/api/'

import {
  FETCH_TEST_REQUEST,
  FETCH_TEST_SUCCESS,
  FETCH_TEST_FAILURE,
} from './types'

export const fetchTest = () => async dispatch => {
  dispatch({
    type: FETCH_TEST_REQUEST,
  })
  await axios
    .get(`${_apiBase}cloth`)
    .then(res => {
      console.log(res)
      dispatch({
        type: FETCH_TEST_SUCCESS,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_TEST_FAILURE,
        payload: err,
      })
    })
}
