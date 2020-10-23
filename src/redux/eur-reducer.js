let initialState = {
  eur: [
  ]
};

const eurReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-EUR': {
      return { ...state, eur: action.eur}
    }
    default:
      return state;

  }

}

export const setEurAC = (eur) => ({type: 'SET-EUR', eur})

export default eurReducer;
