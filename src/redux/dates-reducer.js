// Инициализация локального состояния, в котором будут храниться курсы евро
let initialState = {
  dates: [
  ]
};

// Редьюсер, который принимает предыдущее состояние и действие с датами и возвращает следующее состояние
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
