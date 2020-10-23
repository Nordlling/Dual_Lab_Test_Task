import TableList from "./TableList"
import {connect} from "react-redux"
import {setUsdAC} from "../redux/usd-reducer"
import {setEurAC} from "../redux/eur-reducer"
import {setRurAC} from "../redux/rur-reducer"
import {setDatesAC} from "../redux/dates-reducer"

let mapStateToProps = (state) => {
  return {
    usd: state.usdPage.usd,
    eur: state.eurPage.eur,
    rur: state.rurPage.rur,
    dates: state.datesPage.dates
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TableList);