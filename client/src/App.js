import './App.css';
import {VideoPlayer} from './components/VideoPlayer/VideoPlayer'
import {Options} from './components/Options/Options'
import {Chat} from './components/Chat/Chat'

export const App = () => {
  return (
    <div>
      <div className='app_h2'>
        <h2>Video Chat</h2>
      </div>
        <div className='chat_video_block'>
         <VideoPlayer/> 
         <Chat/> 
        </div>
        <Options/>
    </div>
  );
}


