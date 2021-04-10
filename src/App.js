import './App.css';
import Footer from './hooks/footer/Footer';
import Header from './hooks/header/Header'
import Main from './pages/main/Main'


function App() {
  return (
    <div className="App">
      <Header />

        <Main />

      <Footer />
    </div>
  );
}

export default App;
