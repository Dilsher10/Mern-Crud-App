import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import ReadUser from './ReadUser';
import UpdateUser from './UpdateUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/read/:id' element={<ReadUser />}/>
        <Route path='/update/:id' element={<UpdateUser />}/>
      </Routes>
    </div>
  );
}

export default App;
