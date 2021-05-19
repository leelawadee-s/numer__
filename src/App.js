import React from "react";

import "./App.css";

import Bisec from "./ฺBisec";
import BS from "./BS";

function App() {
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
          </div>
        </div>
      </div>
      <div className="App-header">
        <p>WELCOME TO NUMERICAL WEBSITE </p>
      </div>
    </div>
  );
}

export default App;
