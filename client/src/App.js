import './App.css';
import {VideoPlayer} from './components/VideoPlayer'
import {Options} from './components/Options'
import {Notifications} from './components/Notifications'


export const App = () => {
  return (
    <div className="App">
      <nav>
        <h2>Video Chat</h2>
      </nav>
        <VideoPlayer/>
        <Options>
          <Notifications/>
        </Options>
    </div>
  );
}


