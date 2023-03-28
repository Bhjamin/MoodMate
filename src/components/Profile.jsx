import React from 'react'
import Header from './Header'

const Profile = () => {

  
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // January is 0, so we need to add 1
  const year = today.getFullYear();

  console.log(`${month}/${date}/${year}`);

  return (
    <div>
      <Header/>

      
    </div>
  )
}

export default Profile