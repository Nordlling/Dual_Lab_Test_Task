// Инициализация локального состояния, в котором будут храниться курсы евро
let initialState = {
  usd: [
  ]
};

// Редьюсер, который принимает предыдущее состояние и действие с долларами и возвращает следующее состояние
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