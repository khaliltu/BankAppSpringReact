import './App.css';
import {Route, Routes} from "react-router-dom"
import Clients from './components/clients';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
function App() {
  return (
    <div className="App">
        <Header/>
        <div>
        <main>
        <Routes>
          <Route path="/clients" exact element={<Clients/>}/>
          <Route path="/*" element={<Home/>} />
        </Routes>
        </main>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
