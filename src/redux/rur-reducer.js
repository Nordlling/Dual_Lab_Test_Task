// Инициализация локального состояния, в котором будут храниться курсы евро
let initialState = {
  rur: [
  ]
};

// Редьюсер, который принимает предыдущее состояние и действие с рублями и возвращает следующее состояние
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
