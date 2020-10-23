let initialState = {
  dates: [
  ]
};

const datesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-DATES': {
      return { ...state, dates: action.dates}
    }
    default:
      return state;

  }

}

export const setDatesAC = (dates) => ({type: 'SET-DATES', dates})

export default datesReducer;
