import React, { Component } from "react";

class App extends Component {

  state = {
    currencies: ['INR', 'USD', 'AED', 'GBP', 'CAD', 'SGD', 'EUR', 'JPY', 'PKR', 'ZAR', 'ALL'],
    base: 'INR',
    amount: '1',
    convertTo: 'USD',
    result: '0.013',
    date: '',
  };
  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, this.calculate);
  };
  handleInput = e => {
    this.setState({
      amount: e.target.value
    }, this.calculate);
  };
  handleSwap = e => {
    const base = this.state.base
    const convertTo = this.state.convertTo
    e.preventDefault();
    this.setState({
      convertTo: base, base: convertTo
    }, this.calculate);
  };
  calculate = () => {
    const amount = this.state.amount;
    if(amount === isNaN) {
      return;
    } else{
      fetch(`https://open.exchangerate-api.com/v6/latest?base=${this.state.base}`)
      .then(res => res.json())
      .then(data => {
        const date = data.time_last_update_utc;
        const result = (data.rates[this.state.convertTo] * amount).toFixed(3)
        this.setState({
          result, date
        });
      });
    }
  };
  render() {
    const {currencies, base, amount, convertTo, result, date} = this.state
    return(
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h5 className="text-secondary">{amount} {base} is equivalent to</h5>
              <h2 className="text-success">{result} {convertTo}</h2>
              <p>{date}</p>
              <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10">
                  <form className="form-inline mb-4">
                    <input 
                    type="number"
                    value={amount}
                    onChange={this.handleInput}
                    className="form-group form-control-lg mx-2"/>
                    <select 
                    name="base"
                    value={base}
                    onChange={this.handleSelect}
                    className="form-group form-control-lg bg-light text-info">
                      {currencies.map(currency => (
                        <option key={currency} value={currency} >
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                  <form className="form-inline mb-4">
                    <input 
                    value={result}
                    disabled={true}
                    className="form-group form-control-lg mx-2"/>
                    <select 
                    name="convertTo"
                    value={convertTo}
                    onChange={this.handleSelect}
                    className="form-group form-control-lg bg-light text-info">
                      {currencies.map(currency => (
                        <option key={currency} value={currency} >
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 align-self-control">
                  <h1 onClick={this.handleSwap} className="swap">&#8595;&#8593;</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;

