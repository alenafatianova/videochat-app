import './App.css';
import { Options } from './components/Options/Options';
import { Room } from './components/Room/Room';
import { Chat } from './components/Chat/Chat'



export const App = () => {
  
  const user = prompt('Enter your name')

  console.log(user)
  return (
    <>
      <div className='chat_video_block'>
        <Room user={user}/>
        <Chat user={user} />
      </div>
      <Options/>
    </>
  );
}


