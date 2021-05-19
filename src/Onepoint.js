import React from "react";
import "./App.css";
import { evaluate, parse } from "mathjs";
import api from "./api";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const PlotlyComponent = createPlotlyComponent(Plotly);

class onepoint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      value: "",
      x: [],
      error: [],
      fx: []
    };

    this.BS = this.BS.bind(this);
    this.BS_API = this.BS_API.bind(this);
    this.x = this.x.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b1f94886132001969d96f").then(db => {
      this.setState({
        data: db.data.data.name
      });
      this.state.x[0] = parseFloat(db.data.data.time);
    });
    console.log("this is data api:", this.state.data);
    console.log("this is data xl:", this.state.x);
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
    console.log(this.state.data);
  }

  x({ target: { value } }) {
    this.state.x[0] = parseFloat(value);
  }

  BS_API = e => {
    var value = this.state.data;
    var x = parseFloat(this.state.x);

    var x_old = 0,
      error = 0,
      fxi = 0;
    var i,
      j = 0,
      fx = "",
      cal;

    do {
      let scp = {
        x: x
      };
      console.log(value);
      cal = evaluate(value, scp);
      console.log(cal);
      fx = "";
      fxi = 0;
      fxi = parseFloat(cal);
      this.state.fx[j] = fxi;
      console.log(fxi);
      cal = 0;
      x_old = x;
      console.log("x_old = ", x_old);
      x = fxi;
      console.log("x = ", x);

      error = Math.abs((x - x_old) / x);
      this.state.error[j] = error;
      console.log("error = ", error);
      j++;

      if (error >= 0.00001) {
        this.state.x[j] = x;
      }
    } while (error >= 0.00001);
    this.setState({ data: "" });

    e.preventDefault();
  };

  BS = e => {
    var value = this.state.data;
    var x = parseFloat(this.state.x);

    var x_old = 0,
      error = 0,
      fxi = 0;
    var i,
      j = 0,
      fx = "",
      cal;

    do {
      let scp = {
        x: x
      };
      console.log(value);
      cal = evaluate(value, scp);
      console.log(cal);
      fx = "";
      fxi = 0;
      fxi = parseFloat(cal);
      this.state.fx[j] = fxi;
      console.log(fxi);
      cal = 0;
      x_old = x;
      console.log("x_old = ", x_old);
      x = fxi;
      console.log("x = ", x);

      error = Math.abs((x - x_old) / x);
      this.state.error[j] = error;
      console.log("error = ", error);
      j++;

      if (error >= 0.00001) {
        this.state.x[j] = x;
      }
    } while (error >= 0.00001);
    this.setState({ data: "" });

    e.preventDefault();
  };

  plot() {
    const x_plot = this.state.x;
    const y_plot = this.state.fx;

    var data = [
      {
        type: "scatter",
        x: x_plot,
        y: y_plot,
        marker: {
          color: "#ff6d00"
        },
        name: "X"
      }
    ];

    return data;
  }

  render() {
    var i = 0;
    var x = this.state.x;
    var fx = this.state.fx;
    var error = this.state.error;
    var movie = this.state.data;
    let data = this.plot();
    return (
      <div className="App">
        <div class="navbar">
          <a href="/">HOME</a>
          <div class="dropdown">
            <button class="dropbtn">
              Root of Equation
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/bisection">Bisection</a>
              <a href="/falseposition">Flase Position</a>
              <a href="/onepoint">Onepoint</a>
              <a href="/newton">Newton</a>
              <a href="/secant">Secent</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              Derivative
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/fwooh">FWO(OH)</a>
              <a href="/bwooh">BWO(OH)</a>
              <a href="/coh2">CENTRAL(OH^2)</a>
              <a href="/fwooh2">FWO(OH^2)</a>
              <a href="/bwooh2">BWO(OH^2)</a>
              <a href="/coh4">CENTRAL(OH^4)</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">
              Integral
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/trap">Trapezoidal rule</a>
              <a href="/comtrap">Composite Trapezoidal rule</a>
              <a href="/simson13">Simson 's rule (1/3)</a>
              <a href="/comsim">Composite Simson 's rule (1/3)</a>
            </div>
          </div>
        </div>
        <div className="App-header">
          <div>
            <form action="">
              <legend>Onepoint</legend>
              <p>
                ax<sup>d</sup>+bx<sup>e</sup>+cx<sup>f</sup>
              </p>
              <p>
                <center>Fx: {movie}</center>
              </p>

              <div>
                <label for="">fx </label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">X </label>
                <input
                  onChange={this.x}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <button type="submit" onClick={this.BS}>
                Submit
              </button>

              <button type="submit" onClick={this.BS_API}>
                API
              </button>
              <div
                style={{
                  width: "100%",
                  height: "5000px",
                  padding: "5px",
                  paddingTop: "5px"
                }}
              >
                <table style={{ width: "100%", border: "solid black" }}>
                  <tr style={{ color: "#e65100" }}>
                    <th style={{ border: "solid black" }}>Iteration</th>
                    <th style={{ border: "solid black" }}>X</th>
                    <th style={{ border: "solid black" }}>Error</th>
                  </tr>

                  <tr>
                    <td style={{ border: "solid black" }}>
                      {x.map(
                        x => (
                          <div>{++i}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {x.map(
                        x => (
                          <div>{x.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {error.map(
                        er => (
                          <div>{er.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>
                  </tr>
                </table>
                <div
                  style={{ width: "100%", height: "550px", float: "middle" }}
                >
                  <PlotlyComponent className="whatever" data={data} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default onepoint;
