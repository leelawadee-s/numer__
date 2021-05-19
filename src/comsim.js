import React from "react";
import "./App.css";
import { evaluate, parse } from "mathjs";
import api from "./api";
const { create, all } = require("mathjs");
const mathjs = create(all);
mathjs.import(require("mathjs-simple-integral"));

class comsim extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      a: "",
      b: "",
      n: "",
      ans: "",
      error: ""
    };

    this.BS = this.BS.bind(this);
    this.a = this.a.bind(this);
    this.b = this.b.bind(this);
    this.n = this.n.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b3e204a935d0019169285").then(db => {
      this.setState({
        data: db.data.data.name
      });
      this.setState({ a: db.data.data.time });
      this.setState({ b: db.data.data.rating });
      this.setState({ n: db.data.data.n });
    });
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
  }

  a({ target: { value } }) {
    this.setState({ a: value });
  }

  b({ target: { value } }) {
    this.setState({ b: value });
  }

  n({ target: { value } }) {
    this.setState({ n: value });
  }

  BS = e => {
    var cal;

    var fx = this.state.data;
    var a = parseFloat(this.state.a);
    var b = parseFloat(this.state.b);
    var n = parseFloat(this.state.n);

    var fxig = mathjs.integral(fx, "x").toString();
    var i = evaluate(fxig, { x: b }) - evaluate(fxig, { x: a });
    var x = parseFloat(i);

    console.log("fx:", fx);
    console.log("fxig:", fxig);
    console.log("i:", i);
    console.log("a:", a);
    console.log("b:", b);
    console.log("n:", n);

    cal = evaluate(fx, { x: a });
    var fa = parseFloat(cal);
    console.log("fa:", fa);

    cal = evaluate(fx, { x: b });
    var fb = parseFloat(cal);
    console.log("fb:", fb);

    var h = (b - a) / (2 * n);
    console.log("h:", h);
    var i = 1,
      sum1 = 0,
      sum2 = 0,
      xg = a + h;

    while (xg < b) {
      console.log("i:", i);
      console.log("xi:", xg);
      if (i % 2 != 0) {
        cal = evaluate(fx, { x: xg });
        var fg1 = parseFloat(cal);
        console.log("Efxi:", fg1);
        sum1 = sum1 + fg1;
        console.log("sum1:", sum1);
      } else if (i % 2 == 0) {
        cal = evaluate(fx, { x: xg });
        var fg2 = parseFloat(cal);
        console.log("Efxi:", fg2);
        sum2 = sum2 + fg2;
        console.log("sum2 :", sum2);
      }
      xg = xg + h;
      i++;
    }

    var ans = (h / 3) * (fa + 4 * sum1 + 2 * sum2 + fb);
    ans = ans.toFixed(6);
    this.setState({ ans: ans });

    var eror = Math.abs((x - ans) / x);

    eror = eror.toFixed(6);

    this.setState({ eror: eror });
    e.preventDefault();
  };

  render() {
    var i = 0;
    var eror = this.state.eror;
    var ans = this.state.ans;

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
              <legend>Composite Simson rule (1/3)</legend>

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
                <label for="">a </label>
                <input
                  onChange={this.a}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">b </label>
                <input
                  onChange={this.b}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">n </label>
                <input
                  onChange={this.n}
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
                    <th style={{ border: "solid black" }}>I</th>
                    <th style={{ border: "solid black" }}>Error</th>
                  </tr>
                  <tr>
                    <td style={{ border: "solid black" }}>
                      <div>{ans}</div>
                    </td>
                    <td style={{ border: "solid black" }}>
                      <div>{eror}</div>
                    </td>
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

export default comsim;
