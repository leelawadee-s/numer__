import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BS from './BS';
import * as serviceWorker from './serviceWorker';
import {Router,Route,Link,browserHistory} from 'react-router'
import Bisec from './ฺBisec';
import flase_position from './flase_position';
import Onepoint from './Onepoint';
import Newton from './Newton';
import Secant from './Secant';
import MAX from './MAX';
import fwooh from './fwooh';
import bwooh from './bwooh';
import centraloh2 from './centraloh2';
import fwooh2 from './fwooh2';
import bwooh2 from './bwooh2';
import centraloh4 from './centraloh4';
import trap from './trap';
import comtrap from './comtrap';
import simson13 from './simson13';
import comsim from './comsim';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/bisection" component={Bisec}/>
        <Route path="/falseposition" component={flase_position}/>
        <Route path="/onepoint" component={Onepoint}/>
        <Route path="/newton" component={Newton}/>
        <Route path="/secant" component={Secant}/>
        <Route path="/macky" component={BS}/>
        <Route path="/max" component={MAX}/>
        <Route path="/fwooh" component={fwooh}/>
        <Route path="/bwooh" component={bwooh}/>
        <Route path="/coh2" component={centraloh2}/>
        <Route path="/fwooh2" component={fwooh2}/>
        <Route path="/bwooh2" component={bwooh2}/>
        <Route path="/coh4" component={centraloh4}/>
        <Route path="/trap" component={trap}/>
        <Route path="/comtrap" component={comtrap}/>
        <Route path="/simson13" component={simson13}/>
        <Route path="/comsim" component={comsim}/>
        
        
    </Router>,document.getElementById('root')
);
/*ReactDOM.render(
<App />, 
document.getElementById('root'));


serviceWorker.unregister();
*/