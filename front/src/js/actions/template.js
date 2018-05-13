import api from '../api/api.js';

import {
  TEMPLATE_FETCH,
  TEMPLATE_DONE,
  TEMPLATE_CLEAR,
  TEMPLATE_ERROR,
} from '../reducers/template.js';

export const loadTemplate = () => (dispatch, getState) => Promise.resolve()
  .then(() => dispatch({
    type: TEMPLATE_FETCH,
  }))
  .then(() => api.template(123))
  .then(template => {
    dispatch({
      type: TEMPLATE_DONE,
      payload: {
        template,
      }
    });
  })
  .catch(error => {
    console.error(error);
    dispatch({
      type: TEMPLATE_ERROR,
      payload: {
        error,
      }
    });
  });

export const clearTemplate = () => {
  delete localStorage.token;
  return {
    type: TEMPLATE_CLEAR,
  }
};
