import './App.css';
import {Route, Routes} from "react-router-dom"
import Clients from './components/clients';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Accounts from './components/accounts';
import BankTransfer from './components/bankTransfer';
function App() {
  return (
    <div className="App">
        <Header/>
        <div>
        <main>
        <Routes>
          <Route path="/clients" exact element={<Clients/>}/>
          <Route path="/*" element={<Home/>} />
          <Route path="/clients" exact element={<Clients/>}/>
          <Route path="/accounts" element={<Accounts/>} />
          <Route path="/bankTransfer" element={<BankTransfer/>}/>
        </Routes>
        </main>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
