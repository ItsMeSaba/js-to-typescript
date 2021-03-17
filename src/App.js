import './App.css';
import Header from './hooks/header/Header'
import Main from './pages/main/Main'


function App() {
  return (
    <div className="App">
      <Header />

      {/* <div className='container'> */}
        <Main />
      {/* </div> */}
    </div>
  );
}

export default App;
