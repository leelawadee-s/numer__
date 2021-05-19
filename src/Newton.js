import React from "react";
import "./App.css";
import { derivative, evaluate, parse } from "mathjs";
import api from "./api";

import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const PlotlyComponent = createPlotlyComponent(Plotly);

class Newton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      value: "",
      x: [],
      error: [],
      fx: [],
      fxd: []
    };

    //this.BS = this.BS.bind(this);
    this.x = this.x.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b3650e4f2280019102ac1").then(db => {
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
    console.log("fx = ", value);
    var x_old = 0,
      error = 0,
      xi = 0;
    var i,
      j = 0,
      fx = "",
      cal,
      gx = "",
      k = "",
      fxd = "";
    if (value != "") {
      do {
        let scp = {
          x: x
        };
        console.log(value);
        fx = evaluate(value, scp);
        console.log("fx = ", fx);
        fxd = derivative(value, "x").evaluate({ x: x });
        console.log("fxd = ", fxd);
        //this.state.fx[j] = parseFloat(fx);
        this.state.fx[j] = fx;
        this.state.fxd[j] = fxd;
        //this.state.fxd[j] = parseFloat(fxd);
        x_old = x;
        xi = x - fx / fxd;
        error = Math.abs((xi - x_old) / xi);
        x = xi;
        this.state.error[j] = error;
        j++;

        if (error >= 0.00001) {
          this.state.x[j] = x;
        }
      } while (error >= 0.00001);
      this.setState({ data: "" });

      e.preventDefault();
    }
  };

  BS = e => {
    var value = this.state.data;
    var x = parseFloat(this.state.x);
    console.log("fx = ", value);
    var x_old = 0,
      error = 0,
      xi = 0;
    var i,
      j = 0,
      fx = "",
      cal,
      gx = "",
      k = "",
      fxd = "";
    if (value != "") {
      do {
        let scp = {
          x: x
        };
        console.log(value);
        fx = evaluate(value, scp);
        console.log("fx = ", fx);
        fxd = derivative(value, "x").evaluate({ x: x });
        console.log("fxd = ", fxd);
        //this.state.fx[j] = parseFloat(fx);
        this.state.fx[j] = fx;
        this.state.fxd[j] = fxd;
        //this.state.fxd[j] = parseFloat(fxd);
        x_old = x;
        xi = x - fx / fxd;
        error = Math.abs((xi - x_old) / xi);
        x = xi;
        this.state.error[j] = error;
        j++;

        if (error >= 0.00001) {
          this.state.x[j] = x;
        }
      } while (error >= 0.00001);
      this.setState({ data: "" });

      e.preventDefault();
    }
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
    let data = this.plot();
    var i = 0;
    var x = this.state.x;
    var fx = this.state.fx;
    var error = this.state.error;
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
              <legend>Newton</legend>
              <p>
                ax<sup>d</sup>+bx<sup>e</sup>+cx<sup>f</sup>
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

              <div>
                <button type="submit" onClick={this.BS_API}>
                  API
                </button>
              </div>

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
export default Newton;
