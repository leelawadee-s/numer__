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
      x0: [],
      x1: [],
      error: [],
      fx0: [],
      fx1: []
    };

    this.BS = this.BS.bind(this);
    this.x0 = this.x0.bind(this);
    this.x1 = this.x1.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b367ce4f2280019102ac2").then(db => {
      this.setState({
        data: db.data.data.name
      });
      this.state.x0[0] = parseFloat(db.data.data.time);
      this.state.x1[0] = parseFloat(db.data.data.rating);
    });
    //console.log("this is data api:", this.state.data);
    //console.log("this is data xl:", this.state.x);
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
    //console.log(this.state.data);
  }

  x0({ target: { value } }) {
    this.state.x0[0] = parseFloat(value);
  }

  x1({ target: { value } }) {
    this.state.x1[0] = parseFloat(value);
  }

  BS_API = e => {
    var value = this.state.data;
    var x0 = parseFloat(this.state.x0);
    var x1 = parseFloat(this.state.x1);

    var x_old = 0,
      error = 0,
      xi = 0;
    var i,
      j = 0,
      fx1 = "",
      fx0 = "",
      fxd = "";

    do {
      let scp = {
        x: x0
      };

      fx0 = evaluate(value, scp);
      this.state.fx0[j] = fx0;
      //console.log("this is fx0:",fx0);

      let scp1 = {
        x: x1
      };

      fx1 = evaluate(value, scp1);
      this.state.fx1[j] = fx1;
      //console.log("this is fx1:",fx1);

      fxd = (fx0 - fx1) / (x0 - x1);

      x1 = x0;
      x0 = x0 - fx0 / fxd;

      error = Math.abs((x0 - x1) / x0);

      //this.state.error[j] = error;
      j++;

      if (error >= 0.00001) {
        this.state.x0[j] = x0;
        this.state.x1[j] = x1;
      }
    } while (error >= 0.00001);
    this.setState({ data: "" });

    e.preventDefault();
  };

  BS = e => {
    var value = this.state.data;
    var x0 = parseFloat(this.state.x0);
    var x1 = parseFloat(this.state.x1);
    //console.log("this is x0:",x0);
    //console.log("this is x1:",x1);
    var x_old = 0,
      error = 0,
      xi = 0;
    var i,
      j = 0,
      fx1 = "",
      fx0 = "",
      fxd = "";

    do {
      let scp = {
        x: x0
      };

      fx0 = evaluate(value, scp);
      this.state.fx0[j] = fx0;
      //console.log("this is fx0:",fx0);

      let scp1 = {
        x: x1
      };

      fx1 = evaluate(value, scp1);
      this.state.fx1[j] = fx1;
      //console.log("this is fx1:",fx1);

      fxd = (fx0 - fx1) / (x0 - x1);
      //console.log("this is fxd:",fxd);
      x0 = x1;
      //console.log("this is x0:",x0);
      x1 = x1 - fx1 / fxd;
      //console.log("this is x1:",x1);
      error = Math.abs((x0 - x1) / x0);
      this.state.error[j] = error;
      j++;

      if (error >= 0.00001) {
        this.state.x0[j] = x0;
        this.state.x1[j] = x1;
      }
    } while (error >= 0.00001);
    this.setState({ data: "" });

    e.preventDefault();
  };

  plot() {
    const x0_plot = this.state.x0;
    const y0_plot = this.state.fx0;
    const x1_plot = this.state.x1;
    const y1_plot = this.state.fx1;
    console.log("this is x0:", x0_plot);
    console.log("this is y0:", y0_plot);
    console.log("this is x1:", x1_plot);
    console.log("this is y1:", y1_plot);

    var data = [
      {
        type: "scatter",
        x: x0_plot,
        y: y0_plot,
        marker: {
          color: "#ff6d00"
        },
        name: "XL"
      },
      {
        type: "scatter",
        x: x1_plot,
        y: y1_plot,
        marker: {
          color: "#24ff00"
        },
        name: "XR"
      }
    ];

    return data;
  }

  render() {
    var i = 0;
    let data = this.plot();
    var x0 = this.state.x0;
    var x1 = this.state.x1;
    var fx0 = this.state.fx0;
    var fx1 = this.state.fx1;
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
              <legend>Secant</legend>
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
                <label for="">X0 </label>
                <input
                  onChange={this.x0}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">X1 </label>
                <input
                  onChange={this.x1}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <button type="submit" onClick={this.BS}>
                Submit
              </button>

              <button type="submit" onClick={this.BS}>
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
                    <th style={{ border: "solid black" }}>X0</th>
                    <th style={{ border: "solid black" }}>X1</th>
                    <th style={{ border: "solid black" }}>Error</th>
                  </tr>

                  <tr>
                    <td style={{ border: "solid black" }}>
                      {x0.map(
                        x => (
                          <div>{++i}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {x0.map(
                        x0 => (
                          <div>{x0.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>

                    <td style={{ border: "solid black" }}>
                      {x1.map(
                        x1 => (
                          <div>{x1.toFixed(6)}</div>
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
