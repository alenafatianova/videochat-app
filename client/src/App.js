import './App.css';
import { Options } from './components/Options/Options';
import { Room } from './components/Room/Room';
import { Chat } from './components/Chat/Chat'



export const App = () => {
  return (
    <>
      <div className='chat_video_block'>
        <Room />
        <Chat/>
      </div>
      <Options/>
    </>
  );
}


