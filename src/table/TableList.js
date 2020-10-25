  import React from 'react';
  import '../css/style.css';
  import '../css/lato-font.css';
  import * as axios from 'axios';

  class TableList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.date1State = {value1: `${new Date(new Date().getTime() - 518400000).getFullYear()}-${new Date(new Date().getTime() - 518400000).getMonth()+1}-${new Date(new Date().getTime() - 518400000).getDate()}`}
      this.date2State = {value2: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}

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
      this.interval()
    }

    date2Change(event) {
      this.setState({value2: event.target.value})
      this.date2State.value2 = event.target.value
      this.interval()
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
      });
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setUsd(response.data)
      });
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/298?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setRur(response.data)
      });
      
      
      let firstDatesArray = new Date(firstDate).getTime()
      let lastDatesArray = new Date(lastDate).getTime()
      let index = Math.floor((lastDatesArray - firstDatesArray) / 86400000)
      if(index > -1){
        index > 5 ? index = 7: index += 1
        let datesArray = [firstDatesArray]
        for (let i = 1; i<index; i++) {
          datesArray.push(datesArray[i-1] + 86400000)
        }
        for (let i = 0; i<index; i++) {
          let transfer = new Date(datesArray[i])
          let transferArray = `${transfer.getDate()}/${transfer.getMonth()+1}/${(transfer.getFullYear() + "").slice(-2)}`
          datesArray[i] = transferArray
        }
        this.props.setDates(datesArray)
      } else this.props.setDates(null)
      

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
          {this.props.dates === null ? <label>Please enter the correct interval</label> : "EURUSDRUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <table border="5">
            <caption>Table</caption>
              <tr>
                <th></th>
                {this.props.dates.map(p => (
                  <td>{p}</td>
                ))}
              </tr>
              { "EUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>EUR</td>{this.props.eur.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == Math.min.apply(Math,this.props.eur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmin": (p.Cur_OfficialRate == Math.max.apply(Math,this.props.eur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmax":null} >{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
              { "USD".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>USD</td>{this.props.usd.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == Math.min.apply(Math,this.props.usd.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmin": (p.Cur_OfficialRate == Math.max.apply(Math,this.props.usd.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmax":null}>{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
              { "RUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>RUR</td>{this.props.rur.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == Math.min.apply(Math,this.props.rur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmin": (p.Cur_OfficialRate == Math.max.apply(Math,this.props.rur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmax":null} >{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
          </table> : <label>Please enter the correct name</label>}
          <div>
            <input type="date" value={this.date1State.value1} onChange={this.date1Change} defaultValue="2020-10-17" defaultMin="1900-01-01" defaultMax="2020-12-31" name="date_publishing1" required />
            <input type="date" class = "place" value={this.date2State.value2} onChange={this.date2Change} defaultValue="2020-10-23" defaultMin="1900-01-01" defaultMax="2020-12-31" name="date_publishing2" required />
          </div>
        </div>
      );
    }
  }

  export default TableList;