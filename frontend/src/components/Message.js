import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const {user}=useSelector(state=>state.auth)

  return (
    <div  style={{ width: "100%" }}> 
    {user && <SideDrawer />}
<Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
{user && <MyChat  />}
{user && (
<ChatBox />
)}
</Box>
</div>
  )
}

export default Message