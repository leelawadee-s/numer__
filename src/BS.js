import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { derivative, evaluate } from 'mathjs'

const PlotlyComponent = createPlotlyComponent(Plotly);

const _ = String.raw;

class secant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: _``,
            data: '',
            x0: [],
            x1: [],
            error: [],
            fx0: [],
            fx1: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.cal = this.cal.bind(this);
        this.plot = this.plot.bind(this);
        this.x0 = this.x0.bind(this);
        this.x1 = this.x1.bind(this);

    }

    handleChange({ target: { value } }) {
        this.setState({ value, data: value });
        console.log(this.state.data);
    }
    x0({ target: { value } }) {
        this.state.x0[0] = parseFloat(value);
        console.log(this.state.x0);
    }

    x1({ target: { value } }) {
        this.state.x1[0] = parseFloat(value);
        console.log(this.state.x1);
    }

    state = {
        isOpen: false
    };
    cal(v) {

        var value = this.state.data;
        var x0 = parseFloat(this.state.x0);
        var x1 = parseFloat(this.state.x1);
        console.log("fx = ", value, "x0 = ", x0, "x1 = ", x1);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx1 = '', fx0 = '', fxi = '';
        if (value != '') {
            do {
                let scp = {
                    x: x0,
                }
                //console.log(value);
                fx0 = evaluate(value, scp);
                this.state.fx0[j] = fx0;

                let scp1 = {
                    x: x1,
                }
                //console.log(value);
                fx1 = evaluate(value, scp1);
                this.state.fx1[j] = fx1;

                fxi = (fx0 - fx1) / (x0 - x1);

                x1 = x0;
                x0 = x0 - (fx0 / fxi);
                console.log("x0 = ", x0, "x1 = ", x1);

                error = Math.abs((x0 - x1) / x0);

                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x0[j] = x0;
                    this.state.x1[j] = x1;
                }

            } while (error >= 0.00001);

            console.log("x0 = ", this.state.x0)
            console.log("x1 = ", this.state.x1)
            console.log("fx0 = ", this.state.fx0)
            console.log("fx1 = ", this.state.fx1)
            console.log("error = ", this.state.error)
            this.setState({ data: '' })
            this.plot();
        }

    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    plot() {
        const x0_plot = this.state.x0;
        const y0_plot = this.state.fx0;
        const x1_plot = this.state.x1;
        const y1_plot = this.state.fx1;
        //console.log(x_plot, y_plot)
        var data = [
            {
                type: 'scatter',
                x: x0_plot,
                y: y0_plot,
                marker: {
                    color: '#ff6d00'
                },
                name: 'X0'
            },
            {
                type: 'scatter',
                x: x1_plot,
                y: y1_plot,
                marker: {
                    color: '#24ff00'
                },
                name: 'X1'
            },


        ];
        console.log(data);
        return data
    }

    render() {
        var i = 0;
        let data = this.plot()
        let layout = {                     // all "layout" attributes: #layout
            title: '',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: ''         // more about "layout.xaxis.title": #layout-xaxis-title
            },

        };
        let config = {
            showLink: false,
            displayModeBar: true
        };
        var x0 = this.state.x0;
        var x1 = this.state.x1;
        var fx0 = this.state.fx0;
        var fx1 = this.state.fx1;
        var error = this.state.error;
        return (
            <Router>
                <MDBNavbar color="orange accent-3" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text"><a href="/" style={{ color: "White" }}>Numerical method</a></strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem >
                                <MDBFormInline>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2" style={{ fontWeight: "500" }}>Root of Equations</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/graphical">Graphical Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/bisection">Bisection Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/falseposition">False Position Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/onepoint">One-Point Iteration Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/newton">Newton-Raphson Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/secant">Secant Method</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2" style={{ fontWeight: "500" }}>Linear Algebra</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/cramer">Cramer's Rule</MDBDropdownItem>
                                            <MDBDropdownItem href="/gauss-elimination">Gauss Elimination</MDBDropdownItem>
                                            <MDBDropdownItem href="/gauss-jordan">Gauss Jordan</MDBDropdownItem>
                                            <MDBDropdownItem href="/LUdecomposition">LU Decomposition Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/cholesky">Cholesky Decomposition Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/jacobi">Jacobi Iteration Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/gauss-seidel">Gauss Seidel Iteration Method</MDBDropdownItem>
                                            <MDBDropdownItem href="/conjugate">Conjugate Gradient Method</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBFormInline>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                <div style={{ width: "100%", height: "650px", float: "left", padding: "50px" }}>
                    <div className="formula-block" style={{ height: "400px", width: "40%", float: "left" }}>
                        <h1 style={{ fontSize: "45px", fontWeight: "400" }}>Secant Method</h1>
                        <MDBFormInline>
                            <MDBInput style={{ width: "200px" }} label="Enter equation f(x)"
                                value={this.state.value}
                                onChange={this.handleChange}
                                spellCheck={false} />
                            <MDBBtn style={{ margin: "15px" }} color="warning" onClick={this.cal}>Submit</MDBBtn>
                        </MDBFormInline>
                        <MDBFormInline>
                            <MDBInput style={{ width: "50px", margin: "5px" }} label="X0"
                                //value={this.state.xl}
                                onChange={this.x0}
                                spellCheck={false} />
                            <MDBInput style={{ width: "50px", margin: "5px" }} label="X1"
                                //value={this.state.xl}
                                onChange={this.x1}
                                spellCheck={false} />
                        </MDBFormInline>
                      
                        <br /><br /><br /><br />

                    </div>

                    <div style={{ width: "60%", height: "550px", float: "right", padding: "50px" }}>
                        <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
                    </div>

                    <center><div style={{ width: "50%", height: "550px", padding: "5px", paddingTop: "5px" }}>
                        <MDBTable>
                            <MDBTableHead>
                                <tr style={{ color: "#e65100" }}>
                                    <th>Iteration</th>
                                    <th>X0</th>
                                    <th>X1</th>
                                    <th>f(X0)</th>
                                    <th>f(X1)</th>
                                    <th>Error</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        {x0.map(x => (
                                            <div>{++i}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {x0.map(x => (
                                            <div>{x.toFixed(6)}</div>

                                        ), this)}
                                    </td>
                                    <td>
                                        {x1.map(x => (
                                            <div>{x.toFixed(6)}</div>

                                        ), this)}
                                    </td>
                                    <td>
                                        {fx0.map(fx => (
                                            <div>{fx.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {fx1.map(fx => (
                                            <div>{fx.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                    <td>
                                        {error.map(er => (
                                            <div>{er.toFixed(6)}</div>
                                        ), this)}
                                    </td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    </center>
                </div>

            </Router>

        );
    }
}

export default secant;