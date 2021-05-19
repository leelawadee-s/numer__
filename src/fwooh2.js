import React from "react";
import "./App.css";
import { derivative, evaluate, parse } from "mathjs";
import api from "./api";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const PlotlyComponent = createPlotlyComponent(Plotly);

class fwooh2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: "",
      data: "",
      h: "",
      x: "",
      error1: "",
      error2: "",
      error3: "",
      error4: "",
      fxd1: "",
      fxd2: "",
      fxd3: "",
      fxd4: "",
      movie: ""
    };

    this.BS = this.BS.bind(this);
    this.x = this.x.bind(this);
    this.h = this.h.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.plot = this.plot.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b3889e4f2280019102ac3").then(db => {
      this.setState({
        data: db.data.data.name
      });
      this.setState({ x: db.data.data.time });
      this.setState({ h: db.data.data.rating });
    });
    //console.log("this is data api:",this.state.data)
    //console.log("this is data xl:",this.state.xl)
    //console.log("this is data xr:",this.state.xr)
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
    //console.log("this is fx",this.state.data);
  }

  x({ target: { value } }) {
    this.setState({ x: value });
    //console.log("this is x",this.state.x);
  }

  h({ target: { value } }) {
    this.setState({ h: value });
    //console.log("this is h",this.state.h);
  }

  BS_API = e => {
    e.preventDefault();
  };

  BS = e => {
    var cal, x;
    var fx = this.state.data;

    var xi = parseFloat(this.state.x);
    var h = parseFloat(this.state.h);

    // x = derivative(fx, "x").toString();
    // console.log("this is string fx", x);
    cal = derivative(fx, "x").evaluate({ x: xi });
    var fxd_real = parseFloat(cal);
    var xi_1 = xi + h;
    var xi_2 = xi_1 + h;

    cal = evaluate(fx, { x: xi });
    var fxi = parseFloat(cal);
    console.log("this is fx", fxi);
    cal = evaluate(fx, { x: xi_1 });

    var fxi_1 = parseFloat(cal);
    console.log("this is fxi+1", fxi_1);
    cal = evaluate(fx, { x: xi_2 });
    var fxi_2 = parseFloat(cal);
    console.log("this is fxi+2", fxi_2);
    var ans1 = (-1 * fxi_2 + 4 * fxi_1 - 3 * fxi) / (2 * h);
    ans1 = ans1.toFixed(6);
    this.setState({ fxd1: ans1 });

    var eror_1 = Math.abs((fxd_real - ans1) / fxd_real);
    eror_1 = eror_1.toFixed(6);
    this.setState({ eror1: eror_1 });

    cal = derivative(derivative(fx, "x"), "x").evaluate({ x: xi });
    fxd_real = parseFloat(cal);
    var xi_3 = xi_2 + h;
    cal = evaluate(fx, { x: xi_3 });
    var fxi_3 = parseFloat(cal);
    console.log("this is fxi+3", fxi_3);
    var ans2 = (-1 * fxi_3 + 4 * fxi_2 - 5 * fxi_1 + 2 * fxi) / (h * h);
    ans2 = ans2.toFixed(6);
    this.setState({ fxd2: ans2 });
    var eror_2 = Math.abs((fxd_real - ans2) / fxd_real);
    eror_2 = eror_2.toFixed(6);
    this.setState({ eror2: eror_2 });

    cal = derivative(derivative(derivative(fx, "x"), "x"), "x").evaluate({
      x: xi
    });
    fxd_real = parseFloat(cal);
    var xi_4 = xi_3 + h;
    cal = evaluate(fx, { x: xi_4 });
    var fxi_4 = parseFloat(cal);
    var ans3 =
      (-3 * fxi_4 + 11 * fxi_3 - 24 * fxi_3 + 18 * fxi_1 - 5 * fxi) /
      (2 * (h * h * h));
    ans3 = ans3.toFixed(6);
    this.setState({ fxd3: ans3 });
    var eror_3 = Math.abs((fxd_real - ans3) / fxd_real);
    eror_3 = eror_3.toFixed(6);
    this.setState({ eror3: eror_3 });

    cal = derivative(
      derivative(derivative(derivative(fx, "x"), "x"), "x"),
      "x"
    ).evaluate({ x: xi });
    fxd_real = parseFloat(cal);
    var xi_5 = xi_4 + h;
    cal = evaluate(fx, { x: xi_5 });
    var fxi_5 = parseFloat(cal);
    var ans4 =
      (-2 * fxi_5 +
        11 * fxi_4 -
        24 * fxi_3 +
        26 * fxi_2 -
        14 * fxi_1 +
        3 * fxi) /
      (h * h * h * h);
    ans4 = ans4.toFixed(6);
    this.setState({ fxd4: ans4 });
    var eror_4 = Math.abs((fxd_real - ans4) / fxd_real);
    eror_4 = eror_4.toFixed(6);
    this.setState({ eror4: eror_4 });

    e.preventDefault();
  };

  render() {
    var fd1 = this.state.fxd1;
    var fd2 = this.state.fxd2;
    var fd3 = this.state.fxd3;
    var fd4 = this.state.fxd4;
    var eror_1 = this.state.eror1;
    var eror_2 = this.state.eror2;
    var eror_3 = this.state.eror3;
    var eror_4 = this.state.eror4;

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
              <legend>FWO(OH^2)</legend>
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
                <label for="">X</label>
                <input
                  onChange={this.x}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">h</label>
                <input
                  onChange={this.h}
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
                  width: "50%",
                  height: "1500px"
                }}
              >
                <table style={{ width: "100%", border: "solid black" }}>
                  <tr style={{ color: "#e65100" }}>
                    <th style={{ border: "solid black" }}>fxd1</th>
                    <th style={{ border: "solid black" }}>Error</th>
                    <th style={{ border: "solid black" }}>fxd2</th>
                    <th style={{ border: "solid black" }}>Error</th>
                    <th style={{ border: "solid black" }}>fxd3</th>
                    <th style={{ border: "solid black" }}>Error</th>
                    <th style={{ border: "solid black" }}>fxd4</th>
                    <th style={{ border: "solid black" }}>Error</th>
                  </tr>
                  <tr>
                    <td style={{ border: "solid black" }}>
                      <div>{fd1}</div>
                    </td>
                    <td style={{ border: "solid black" }}>{eror_1}</td>
                    <td style={{ border: "solid black" }}>
                      <div>{fd2}</div>
                    </td>
                    <td style={{ border: "solid black" }}>{eror_2}</td>
                    <td style={{ border: "solid black" }}>
                      <div>{fd3}</div>
                    </td>
                    <td style={{ border: "solid black" }}>{eror_3}</td>
                    <td style={{ border: "solid black" }}>
                      <div>{fd4}</div>
                    </td>
                    <td style={{ border: "solid black" }}>{eror_4}</td>
                  </tr>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default fwooh2;
