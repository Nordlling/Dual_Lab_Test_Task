// Инициализация локального состояния, в котором будут храниться курсы евро
let initialState = {
  eur: [
  ]
};

// Редьюсер, который принимает предыдущее состояние и действие с евро и возвращает следующее состояние
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
