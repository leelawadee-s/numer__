import React from "react";
import "./App.css";
import { evaluate, parse } from "mathjs";
import api from "./api";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";

const PlotlyComponent = createPlotlyComponent(Plotly);

class Bisec extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: "",
      data: "",
      value: "",
      xl: [],
      xr: [],
      xm: [],
      error: [],
      fxr: [],
      fxl: [],
      fxm: [],
      movie: ""
    };

    this.BS = this.BS.bind(this);
    this.xl = this.xl.bind(this);
    this.xr = this.xr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.plot = this.plot.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e670441cfada252ccda22af").then(db => {
      this.setState({
        data: db.data.data.name
      });
      this.state.xl[0] = parseFloat(db.data.data.time);
      this.state.xr[0] = parseFloat(db.data.data.rating);
    });
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
    //console.log(this.state.data);
  }

  xl({ target: { value } }) {
    //thi.setState({x[0]:value})
    this.state.xl[0] = parseFloat(value);
  }
  xr({ target: { value } }) {
    this.state.xr[0] = parseFloat(value);
  }

  BS_API = e => {
    var value = this.state.data;
    var xl = parseFloat(this.state.xl);
    var xr = parseFloat(this.state.xr);
    //console.log(xl, xr);
    //console.log("this is value",value);
    var xm = 0,
      xm_old = 0,
      error = 0,
      fxl = 0,
      fxr = 0,
      fxm = 0;
    var i,
      j = 0,
      //fx = "",
      cal;

    if (value != "" && xl != "" && xr != "") {
      do {
        let scp = {
          x: xl
        };
        //console.log(value);
        cal = evaluate(value, scp);
        console.log("this is fxl:", cal);
        //fx = "";
        fxl = 0;
        fxl = parseFloat(cal);
        this.state.fxl[j] = fxl;
        //console.log(fxl);
        cal = 0;

        let scp1 = {
          x: xr
        };
        //console.log(value);
        cal = evaluate(value, scp1);
        //console.log(cal);
        //fx = "";
        fxr = 0;
        fxr = parseFloat(cal);
        this.state.fxr[j] = fxr;
        cal = 0;

        xm = (xr + xl) / 2;

        let scp2 = {
          x: xm
        };
        //console.log(value);
        cal = evaluate(value, scp2);
        //console.log(cal);
        //fx = "";
        fxm = 0;
        fxm = parseFloat(cal);
        this.state.fxm[j] = fxm;
        cal = 0;

        this.state.xm[j] = xm;
        error = Math.abs((xm - xm_old) / xm);
        this.state.error[j] = error;
        //console.log("error = ", error);
        xm_old = xm;
        //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
        //console.log(fxm * fxr);
        j++;

        if (error >= 0.00001) {
          if (fxm * fxr < 0) {
            this.state.xl[j] = xm;
            this.state.xr[j] = xr;
            xl = xm;
          } else if (fxm * fxr > 0) {
            this.state.xr[j] = xm;
            this.state.xl[j] = xl;
            xr = xm;
          }
        }

        console.log(
          "thi is xl =",
          this.state.xl[j],
          "this is xm = ",
          this.state.xm[j - 1],
          "this is xr = ",
          this.state.xr[j]
        );
      } while (error >= 0.00001);
      this.setState({ data: "" });
    }

    e.preventDefault();
  };

  BS = e => {
    var value = this.state.data;
    var xl = parseFloat(this.state.xl);
    var xr = parseFloat(this.state.xr);
    //console.log(xl, xr);
    //console.log("this is value",value);
    var xm = 0,
      xm_old = 0,
      error = 0,
      fxl = 0,
      fxr = 0,
      fxm = 0;
    var i,
      j = 0,
      //fx = "",
      cal;

    if (value != "" && xl != "" && xr != "") {
      do {
        let scp = {
          x: xl
        };
        //console.log(value);
        cal = evaluate(value, scp);
        // console.log("this is fxl:",cal);
        //fx = "";
        fxl = 0;
        fxl = parseFloat(cal);
        this.state.fxl[j] = fxl;
        console.log(fxl);
        cal = 0;

        let scp1 = {
          x: xr
        };
        //console.log(value);
        cal = evaluate(value, scp1);
        //console.log(cal);
        //fx = "";
        fxr = 0;
        fxr = parseFloat(cal);
        this.state.fxr[j] = fxr;
        cal = 0;

        xm = (xr + xl) / 2;

        let scp2 = {
          x: xm
        };
        //console.log(value);
        cal = evaluate(value, scp2);
        //console.log(cal);
        //fx = "";
        fxm = 0;
        fxm = parseFloat(cal);
        this.state.fxm[j] = fxm;
        cal = 0;

        this.state.xm[j] = xm;
        error = Math.abs((xm - xm_old) / xm);
        this.state.error[j] = error;
        //console.log("error = ", error);
        xm_old = xm;
        //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
        //console.log(fxm * fxr);
        j++;

        if (error >= 0.00001) {
          if (fxm * fxr < 0) {
            this.state.xl[j] = xm;
            this.state.xr[j] = xr;
            xl = xm;
          } else if (fxm * fxr > 0) {
            this.state.xr[j] = xm;
            this.state.xl[j] = xl;
            xr = xm;
          }
        }

        console.log(
          "xl =",
          this.state.xl[j],
          "xm = ",
          this.state.xm[j - 1],
          "xr = ",
          this.state.xr[j]
        );
      } while (error >= 0.00001);
      this.setState({ data: "" });
    }
    this.plot();

    e.preventDefault();
  };

  plot() {
    const xl_plot = this.state.xl;
    const yl_plot = this.state.fxl;
    const xr_plot = this.state.xr;
    const yr_plot = this.state.fxr;

    var data = [
      {
        type: "scatter",
        x: xl_plot,
        y: yl_plot,
        marker: {
          color: "#ff6d00"
        },
        name: "XL"
      },
      {
        type: "scatter",
        x: xr_plot,
        y: yr_plot,
        marker: {
          color: "#ffab00"
        },
        name: "XR"
      }
    ];

    return data;
  }

  render() {
    var i = 0;
    let data = this.plot();
    var xl1 = this.state.xl[0];
    var xr1 = this.state.xr[0];
    var xl = this.state.xl;
    var xr = this.state.xr;
    var xm = this.state.xm;
    var fxl = this.state.fxl;
    var fxr = this.state.fxr;
    var fxm = this.state.fxm;
    var error = this.state.error;
    var movie = this.state.data;
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
              <a href="/bwooh2">BwO(OH^2)</a>
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
              <legend>Bisection</legend>
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
                <label for="">Xl </label>
                <input
                  onChange={this.xl}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">Xr </label>
                <input
                  onChange={this.xr}
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
                  width: "50%",
                  height: "1500px"
                }}
              >
                <table style={{ width: "100%", border: "solid black" }}>
                  <tr style={{ color: "#e65100" }}>
                    <th style={{ border: "solid black" }}>Iteration</th>
                    <th style={{ border: "solid black" }}>XL</th>
                    <th style={{ border: "solid black" }}>XR</th>
                    <th style={{ border: "solid black" }}>XM</th>
                    <th style={{ border: "solid black" }}>f(XL)</th>
                    <th style={{ border: "solid black" }}>f(XR)</th>
                    <th style={{ border: "solid black" }}>f(XM)</th>
                    <th style={{ border: "solid black" }}>Error</th>
                  </tr>

                  <tr>
                    <td style={{ border: "solid black" }}>
                      {xr.map(
                        x => (
                          <div>{++i}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {xl.map(xl => (
                        <div>{xl.toFixed(6)}</div>
                      ))}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {xr.map(
                        xr => (
                          <div>{xr.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {xm.map(
                        xm => (
                          <div>{xm.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {fxl.map(
                        fxl => (
                          <div>{fxl.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {fxr.map(
                        fxr => (
                          <div>{fxr.toFixed(6)}</div>
                        ),
                        this
                      )}
                    </td>
                    <td style={{ border: "solid black" }}>
                      {fxm.map(
                        fxm => (
                          <div>{fxm.toFixed(6)}</div>
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

export default Bisec;
