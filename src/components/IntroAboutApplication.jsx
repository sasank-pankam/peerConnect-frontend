import React from 'react'
import { UsersContext } from '../contexts/UsersContextProvider';

function IntroAboutApplication() {
  const {  currentActiveUser } = React.useContext(UsersContext);
  return (
    <div className='chats-container flex justify-center intro-page' style={{
      alignItems:'center',
      display: currentActiveUser !== null ? 'none':'flex',
  }} id='intro-box'>IntroAboutApplication</div>
  )
}

export default IntroAboutApplication;