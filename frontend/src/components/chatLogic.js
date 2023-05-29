export const isSameSenderMargin = (messages, m, i, userId) => {
  if (i <= messages.length - 1 && m.sender._id === userId) {
    return { right: "30px" };
  } else {
    return { left: "30px" };
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id;
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender.id === m.sender.id;
};

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderId = (loggedUser, users) => {
  
  return  users.length>0 &&  users[0]._id === loggedUser._id ? users[1]._id : users[0]._id;
};
export const getPhoto = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].photo : users[0].photo;
};
export const getSenderFull = (loggedUser, users) => {
  return users.to._id === loggedUser._id ? "other" :"me";
};

export const photo=(loggedUser,users)=>{
  return users.to._id === loggedUser._id ? users.to.photo :users.from.photo;
}

export const calculateTop = (i) => {
  return { top: `${i * 40}px` };
};

 export const getTimeStamp = (time) => {
  // const time=new Date(time)
  console.log(time)
  let now=Date.now()
  const timeDifference = now.toString()-time

  console.log(timeDifference)

  const second = timeDifference / 1000;

  if (second > 60) {
    let min = second / 60;

    if (min > 60) {
      let hour = min / 60;

      if (hour > 24) {
        let day = hour / 24;
        return `${day} day ago`;
      } else {
        return `${hour} hour ago`;
      }
    } else {
      return `${min} minute ago`;
    }
  } else {
    return `${second} sec ago`;
  }
};
