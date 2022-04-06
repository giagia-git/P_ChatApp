/* function addMessageuser(username,timeNow,message) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const name = document.createElement('span');
    const time = document.createElement('span');
    const liMessage = document.createElement('li');
    name.textContent = username;
    time.textContent = timeNow;
    liMessage.textContent = message;
    ul.setAttribute('id','list-message-ul')
    name.setAttribute('id',"list-message-item-name")
    time.setAttribute('id',"list-message-item-date");
    liMessage.setAttribute('id',"list-message-item-content");
    li.appendChild(name);
    li.appendChild(time);
    ul.appendChild(li);
    ul.appendChild(liMessage);
    listMessageuser.append(ul);
}

function addUser(username) {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('menu-item');
    li.textContent = username;
    listUseronline.appendChild(li);
    console.log(username);
    console.log(listUseronline);
}

sendMessage.addEventListener('click', function(e) {
    socket.emit('sendMessage',{inputMessage: inputMessage.value});
    inputMessage.value="";
}) */