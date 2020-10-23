let initialState = {
  usd: [
  ]
};

const usdReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-USD': {
      return { ...state, usd: action.usd}
    }
    default:
      return state;
  }
}



export const setUsdAC = (usd) => ({type: 'SET-USD', usd})

export default usdReducer;