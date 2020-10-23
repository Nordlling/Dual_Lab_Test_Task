  import React from 'react';
  import '../css/style.css';
  import '../css/lato-font.css';
  import * as axios from 'axios';

  class TableList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.date1State = {value1: null}
      this.date2State = {value2: null}
      this.eurArray = [];
      this.usdArray = [];
      this.rurArray = [];
      this.minEur = 0;
      this.maxEur = 0;
      this.minUsd = 0;
      this.maxUsd= 0;
      this.minRur= 0;
      this.maxRur = 0;

      this.handleChange = this.handleChange.bind(this);
      this.date1Change = this.date1Change.bind(this);
      this.date2Change = this.date2Change.bind(this);
      
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    date1Change(event) {
      this.setState({value1: event.target.value})
      this.date1State.value1 = event.target.value
      if(this.date2State.value2 !== null) this.interval()
    }

    date2Change(event) {
      this.setState({value2: event.target.value})
      this.date2State.value2 = event.target.value
      if(this.date1State.value1 !== null) this.interval()
    }

    componentDidMount(firstDate, lastDate) {

      if(arguments.length === 0) {
      var first = new Date(new Date().getTime() - 518400000);
      var firstDate = `${first.getFullYear()}-${first.getMonth()+1}-${first.getDate()}`;
      var last = new Date();
      var lastDate = `${last.getFullYear()}-${last.getMonth()+1}-${last.getDate()}`;
      }
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/292?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setEur(response.data)
      }).then(response => {
        this.props.eur.map((p, i) => (
        this.eurArray.push(p.Cur_OfficialRate)
        ))
      }).then(response => {
        this.minEur = Math.min.apply(null, this.eurArray);
        this.maxEur = Math.max.apply(null, this.eurArray);
      });
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setUsd(response.data)
      }).then(response => {
        this.props.usd.map((p, i) => (
          this.usdArray.push(p.Cur_OfficialRate)
        ))
      }).then(response => {
        this.minUsd = Math.min.apply(null, this.usdArray) 
        this.maxUsd = Math.max.apply(null, this.usdArray); 
      });
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/298?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setRur(response.data)
      }).then(response => {
        this.props.rur.map((p, i) => (
          this.rurArray.push(p.Cur_OfficialRate)
        ))
      }).then(response => {
        this.minRur = Math.min.apply(null, this.rurArray) 
        this.maxRur = Math.max.apply(null, this.rurArray); 
      });
      
      
      let firstDatesArray = new Date(firstDate).getTime()
      let datesArray = [firstDatesArray]
      for (let i = 1; i<7; i++) {
        datesArray.push(datesArray[i-1] + 86400000)
      }
      for (let i = 0; i<7; i++) {
        let transfer = new Date(datesArray[i])
        let transferArray = `${transfer.getDate()}/${transfer.getMonth()+1}/${(transfer.getFullYear() + "").slice(-2)}`
        datesArray[i] = transferArray
      }
      
      this.props.setDates(datesArray)

    }


    interval = (e) => {
      let first = new Date(this.date1State.value1);
      let last = new Date(this.date2State.value2);
      if((last.getTime() - first.getTime()) > 518400000) last = new Date(first.getTime() + 518400000);

      let firstDate = `${first.getFullYear()}-${first.getMonth()+1}-${first.getDate()}`;
      
      let lastDate = `${last.getFullYear()}-${last.getMonth()+1}-${last.getDate()}`;
      this.componentDidMount(firstDate, lastDate)
      
    }

    render() {
      return (
        <div class = "P">
          <form onSubmit={this.handleSubmit} size="2">
          <label>
            Name:
            <input type="text" size="2" value={this.state.value} onChange={this.handleChange} />
          </label>
          </form>
          <table border="5">
            <caption>Table</caption>
              <tr>
                <th></th>
                {this.props.dates.map(p => (
                  <td>{p}</td>
                ))}
              </tr>
              {}
              { "EUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>EUR</td>{this.props.eur.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == this.minEur) ? "colortextmin": (p.Cur_OfficialRate == this.maxEur) ? "colortextmax":null} >{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
              { "USD".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>USD</td>{this.props.usd.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == this.minUsd) ? "colortextmin": (p.Cur_OfficialRate == this.maxUsd) ? "colortextmax":null}>{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
              { "RUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>RUR</td>{this.props.rur.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == this.minRur) ? "colortextmin": (p.Cur_OfficialRate == this.maxRur) ? "colortextmax":null} >{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
          </table>
          <div>
            <input type="date" value={this.date1State.value1} onChange={this.date1Change} defaultValue="2020-10-17" defaultMin="1900-01-01" defaultMax="2020-12-31" name="date_publishing1" required />
            <input type="date" value={this.date2State.value2} onChange={this.date2Change} defaultValue="2020-10-23" defaultMin="1900-01-01" defaultMax="2020-12-31" name="date_publishing2" required />
          </div>
        </div>
      );
    }
  }

  export default TableList;