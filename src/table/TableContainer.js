import TableList from "./TableList"
import {connect} from "react-redux"
import {setUsdAC} from "../redux/usd-reducer"
import {setEurAC} from "../redux/eur-reducer"
import {setRurAC} from "../redux/rur-reducer"
import {setDatesAC} from "../redux/dates-reducer"

// Функция для чтения состояний
let mapStateToProps = (state) => {
  return {
    usd: state.usdPage.usd,
    eur: state.eurPage.eur,
    rur: state.rurPage.rur,
    dates: state.datesPage.dates
  }
}

// Функция для передачи событий
let mapDispatchToProps = (dispatch) => {
  return {
    setUsd: (usd) => {
      dispatch(setUsdAC(usd))
    },

    setEur: (eur) => {
      dispatch(setEurAC(eur))
    },

    setRur: (rur) => {
      dispatch(setRurAC(rur))
    },

    setDates: (dates) => {
      dispatch(setDatesAC(dates))
    }
  }
}

// Экспорт функции connect(), которая передаёт состояния и события классовой компоненте TableList, а также вызывает эту компоненту
export default connect(mapStateToProps, mapDispatchToProps)(TableList);