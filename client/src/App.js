import './App.css';
import {VideoPlayer} from './components/VideoPlayer/VideoPlayer'
import {Options} from './components/Options/Options'
import {Notifications} from './components/Notifications/Notifications'


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


