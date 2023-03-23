import './App.css';
import { useUser } from './context/userContext';
import Auth from './components/Auth';

function App() {

  const { user } = useUser()


  return (
    <div className="">
    <Auth/>
    </div>
  );
}

export default App;
