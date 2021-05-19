import "./index.css";
import React, { Component } from "react";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
import { evaluate, derivative } from "mathjs";

const PlotlyComponent = createPlotlyComponent(Plotly);
const _ = String.raw;

class secantchom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //setค่าเริ่มต้นของแต่ละตัวแปรให้เป็นค่าว่าง ตัวแปรชนิดนึงที่เรียกว่า state
      value: "",
      data: "",
      x0: [],
      x1: [],
      error: [],
      fx0: [],
      fx1: []
    };

    this.SC = this.SC.bind(this); //การประกาศหรือเรียกฟังชั่น
    this.x0 = this.x0.bind(this);
    this.x1 = this.x1.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.plot = this.plot.bind(this);
  }

//   componentDidMount = async () => {
//     //ฟังก์ชั่นเริ่มต้นมีมาให้ ตั้งค่าเริ่มต้นให้ดาต้าเบส
//     await api.getMovieById("5e736d3f65ee500012da139f").then(db => {
//       this.setState({
//         data: db.data.data.fx
//       });
//       console.log(db.data);
//       this.state.x0[0] = parseFloat(db.data.data.XL);
//       this.state.x1[0] = parseFloat(db.data.data.XR);
//     });
//   };

  handleChange({ target: { value } }) {
    //รับสมการfx
    this.setState({ data: value }); //ฟังก์ชันที่สร้างขึ้นมาเพื่อเปลี่ยนค่าใน state
  }

  x0({ target: { value } }) {
    this.state.x0[0] = parseFloat(value); //เอาสตริงมาใช้ แปลงสตริงเป็นfloat
  }

  x1({ target: { value } }) {
    this.state.x1[0] = parseFloat(value); //เอาสตริงมาใช้ แปลงสตริงเป็นfloat
  }

  SC = e => {
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
    this.plot();

    e.preventDefault();
  };
  plot() {
    //ของกราฟ
    const x0_plot = this.state.x0;
    const y0_plot = this.state.fx0;
    const x1_plot = this.state.x1;
    const y1_plot = this.state.fx1;

    var data = [
      {
        type: "scatter",
        x: x0_plot,
        y: y0_plot,
        marker: {
          color: "#ff6d00"
        },
        name: "X0"
      },
      {
        type: "scatter",
        x: x1_plot,
        y: y1_plot,
        marker: {
          color: "#24ff00"
        },
        name: "X1"
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
        <div className="App-Secant">
          <div>
            <form action="">
              <p> </p>
              <legend>SECANT</legend>
              <div>
                <label for=""> fx </label>
                <input
                  onChange={this.handleChange} //ไปเรียกมาทำ
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />

                <label for=""> X0 </label>
                <input
                  onChange={this.x0}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
                <label for=""> X1 </label>
                <input
                  onChange={this.x1}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>
              <p></p>

              <button type="submit" onClick={this.SC}>
                SUBMIT
              </button>
              <label for=""> </label>
              <button type="submit" onClick={this.SC}>
                API
              </button>

              <div
                style={{
                  width: "100%",
                  height: "1500px"
                }}
              >
                <div className="App-background3">
                  <table style={{ width: "100%", border: "solid pink" }}>
                    <tr style={{ color: "#da0a60ea" }}>
                      <th style={{ border: "solid pink" }}>Iteration</th>
                      <th style={{ border: "solid pink" }}>X0</th>
                      <th style={{ border: "solid pink" }}>X1</th>
                      <th style={{ border: "solid pink" }}>Error</th>
                    </tr>

                    <tr>
                      <td style={{ border: "solid pink" }}>
                        {x0.map(
                          //หยิบค่าในarray แต่ละตัว
                          x => (
                            <div>{++i}</div>
                          ),
                          this
                        )}
                      </td>
                      <td style={{ border: "solid pink" }}>
                        {x0.map(x0 => (
                          <div>{x0.toFixed(6)}</div>
                        ))}
                      </td>
                      <td style={{ border: "solid pink" }}>
                        {x1.map(x1 => (
                          <div>{x1.toFixed(6)}</div>
                        ))}
                      </td>
                      <td style={{ border: "solid pink" }}>
                        {error.map(
                          er => (
                            <div>{er.toFixed(6)}</div>
                          ),
                          this
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
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


export default secantchom;