import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail';
import NavBar from './components/NavBar';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
       
        <Route exact path={['/home', '/dog/', '/dogs', "/create", "/detail"]} component={NavBar} />
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path='/home/:id' component={Detail} />
        <Route path= "/home" component= {Home}/>
        <Route path="/create" component={DogCreate}/>
        <Route path="*" component={DogCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
// export function App() {
//   return(
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage/>} />
//         <Route path="/home" element={<Home/>}/>
//         <Route path={"/home/:id"} element={<Detail/>} />
//         <Route path="/dog" element={<DogCreate/>} />
        
//         <Route path="*" element={<LandingPage/>} />
//       </Routes>
//     </Router>
//   )
// }

// export default App;