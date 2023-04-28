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
    return users[0].name === loggedUser.name ? users[1].name : users[0].name;
  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0].id === loggedUser.id ? users[1] : users[0];
  };
  
  export const calculateTop = (i) => {
    return { top: `${i * 40}px` };
  };
  