  import React from 'react';
  import '../css/style.css';
  import '../css/lato-font.css';
  import * as axios from 'axios';

  class TableList extends React.Component {

    // Конструктор, где инициализированы состояния компонента
    constructor(props) {
      super(props);
      this.state = {value: '', hasError: false, textError: ''};
      this.stateFirstDate = {value1: `${new Date(new Date().getTime() - 518400000).getFullYear()}-${new Date(new Date().getTime() - 518400000).getMonth()+1}-${new Date(new Date().getTime() - 518400000).getDate()}`}
      this.stateLastDate = {value2: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`}

      this.handleChange = this.handleChange.bind(this);
      this.handleChangeFirstDate = this.handleChangeFirstDate.bind(this);
      this.handleChangeLastDate = this.handleChangeLastDate.bind(this);
      
    }
    
    // Метод, который вносит ввёденные данные имени валюты в state
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    // Метод, который вносит ввёденные данные начальной даты в stateFirstDate
    handleChangeFirstDate(event) {
      //this.setState({value1: event.target.value})
      this.stateFirstDate.value1 = event.target.value
      this.interval()
    }

    // Метод, который вносит ввёденные данные последней даты в stateLastDate
    handleChangeLastDate(event) {
      //this.setState({value2: event.target.value})
      this.stateLastDate.value2 = event.target.value
      this.interval()
    }

    // Метод, который запускается после того, как компонент отрендерился в DOM
    componentDidMount(firstDate, lastDate) {
      // Если новые даты еще не вводили, то создаются начальная дата и последняя, в зависимости от текущего дня и преобразуется в формат YYYY-MM-DD, необходимый для GET запроса
      // Если новые даты вводили, то для GET запроса используются аргументы метода componentDidMount(), который был вызван в методе interval()
      if(arguments.length === 0) {
      var first = new Date(new Date().getTime() - 518400000);
      var firstDate = `${first.getFullYear()}-${first.getMonth()+1}-${first.getDate()}`;
      var last = new Date();
      var lastDate = `${last.getFullYear()}-${last.getMonth()+1}-${last.getDate()}`;
      }
      // GET запрос данных с сервера с помощью библиотеки axios
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/292?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setEur(response.data)
      }).catch(error => {
        this.setState({hasError: true, textError: error}) // обработчик ошибок
      }); 
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setUsd(response.data)
      }).catch(error => {
        this.setState({hasError: true, textError: error}) // обработчик ошибок
      }); 
      axios.get(`https://www.nbrb.by/API/ExRates/Rates/Dynamics/298?startDate=${firstDate}&endDate=${lastDate}`).then(response => {
        this.props.setRur(response.data)
      }).catch(error => {
        this.setState({hasError: true, textError: error}) // обработчик ошибок
      }); 
      
      // Создание массива дат в формате DD/MM/YY для отображения в таблице
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

    // Метод, который преобразует введённые даты в формат YYYY-MM-DD и передаёт их в виде аргументов в метод componentDidMount()
    interval = (e) => {
      let first = new Date(this.stateFirstDate.value1);
      let last = new Date(this.stateLastDate.value2);
      if((last.getTime() - first.getTime()) > 518400000) last = new Date(first.getTime() + 518400000);

      let firstDate = `${first.getFullYear()}-${first.getMonth()+1}-${first.getDate()}`;
      
      let lastDate = `${last.getFullYear()}-${last.getMonth()+1}-${last.getDate()}`;
      this.componentDidMount(firstDate, lastDate)
      
    }

    // Метод, который отрисовывает страницу
    render() {
      // если при обработке запроса обнаружилась ошибка, то выводится страница с сообщением ошибки
      if (this.state.hasError) {
        return( 
          <div>
          <h1>{this.state.textError.message}</h1>
          <h3>Error Page</h3>
          </div>
        )
      }
      return (
        <div class = "P">
           {/* Форма ввода имени валюты. При введении данных, вызывает метод handleChange */}
          <form onSubmit={this.handleSubmit} size="2">
          <label>
            <input type="text" size="5" value={this.state.value} placeholder="Currency" onChange={this.handleChange} />
          </label>
          </form>
            {/* Проверка условия корректного ввода данных */}
          {this.props.dates === null ? <label>Please enter the correct interval</label> : "EURUSDRUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <table border="5">
            <caption>Table</caption>
            {/* Отрисовка дат в таблице */}
              <tr>
                <th></th>
                {this.props.dates.map(p => (
                  <td>{p}</td>
                ))}
              </tr>
              {/* Отрисовка курса в таблице и проверка на соответствие введённой валюты */}
              { "EUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>EUR</td>{this.props.eur.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == Math.min.apply(Math,this.props.eur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmin": (p.Cur_OfficialRate == Math.max.apply(Math,this.props.eur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmax":null} >{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
              { "USD".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>USD</td>{this.props.usd.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == Math.min.apply(Math,this.props.usd.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmin": (p.Cur_OfficialRate == Math.max.apply(Math,this.props.usd.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmax":null}>{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
              { "RUR".indexOf(this.state.value) + 1 || this.state.value == "" ? <tr><td>RUR</td>{this.props.rur.map((p, i) => (
                <td class = {(p.Cur_OfficialRate == Math.min.apply(Math,this.props.rur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmin": (p.Cur_OfficialRate == Math.max.apply(Math,this.props.rur.map(function(item){return item.Cur_OfficialRate;}))) ? "colortextmax":null} >{p.Cur_OfficialRate}</td>
              ))}</tr> : ""}
          </table> : <label>Please enter the correct currency</label>}
          {/* Виджет ввода начальной и конечной даты. При введении начальной или конечной даты, вызывает метод handleChangeFirstDate или handleChangeLastDate соответственно */}
          <div>
            <input type="date" value={this.stateFirstDate.value1} onChange={this.handleChangeFirstDate} defaultValue="2020-10-17" min="1995-03-23" name="date_publishing1" required />
            <input type="date" class = "place" value={this.stateLastDate.value2} onChange={this.handleChangeLastDate} defaultValue="2020-10-23" min="1995-03-23" name="date_publishing2" required />
          </div>
        </div>
      );
    }
  }

  export default TableList;