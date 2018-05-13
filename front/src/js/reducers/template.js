export const TEMPLATE_FETCH = 'TEMPLATE_FETCH';
export const TEMPLATE_DONE = 'TEMPLATE_DONE';
export const TEMPLATE_CLEAR = 'TEMPLATE_CLEAR';
export const TEMPLATE_ERROR = 'TEMPLATE_ERROR';

const initialState = {
  fetch: null,
  error: null,
};

const template = (state = initialState, {type, payload} ) => {
  switch (type) {

    case TEMPLATE_FETCH:
      return {
        ...state,
        fetch: true,
      };

    case TEMPLATE_DONE:
      return {
        ...state,
        ...(payload.template),
      };

    case TEMPLATE_CLEAR:
      return {
        ...initialState,
      };

    case TEMPLATE_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  };
};

export default template;
