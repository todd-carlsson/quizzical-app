import Quiz from "./components/Quiz";
import './App.css';
// import yellowBlob from '../images/yellowblob.png';
// import blueBlob from '../images/blueblob.png';

export default function App() {
  return (
    <main>
      <img className="yellowblob" src='./images/yellowblob.png' alt='yellow blob' />
      <Quiz />
      <img className="blueblob" src='./images/blueblob.png' alt='blue blob' />
    </main>
  )
}

