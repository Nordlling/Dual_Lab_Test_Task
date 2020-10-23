let initialState = {
  rur: [
  ]
};

const rurReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-RUR': {
      return { ...state, rur: action.rur}
    }
    default:
      return state;

  }

}

export const setRurAC = (rur) => ({type: 'SET-RUR', rur})

export default rurReducer;
