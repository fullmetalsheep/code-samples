/* eslint-disable consistent-return */
/* eslint-disable default-case */
import produce from 'immer';
import moment from 'moment';

// Action Types
const UPDATE_LAST_CART_UPDATE_TIME = 'UPDATE_LAST_CART_UPDATE_TIME';

// Action creators
export const updateLastCartUpdateTime = () => {
  return {
    type: UPDATE_LAST_CART_UPDATE_TIME,
  };
};

const Reducer = (
  state = {
    lastCartUpdateTime: '2020-12-20T19:34:49+08:00',
  },
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPDATE_LAST_CART_UPDATE_TIME:
        draft.lastCartUpdateTime = moment().format();
    }
  });
};

export default Reducer;
