
        const socket = io('localhost:3000');
        const inputMessage = document.getElementById('input-message');
        const sendMessage = document.getElementById('send-message');
        const listUseronline = document.getElementById('list-user-online');
        const listMessageuser = document.getElementById('list-message-group');
        const listMessage = document.querySelector('.list-message');
        const chatMessage = document.querySelectorAll('#list-message-ul');

        const nameRoom = document.getElementById('name-room');
        const btnLeave = document.getElementById('leave-room');

        function addMessageuser(username,timeNow,message) {
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
        }
        
        sendMessage.addEventListener('click', function(e) {
            socket.emit('sendMessage',{inputMessage: inputMessage.value});
            inputMessage.value="";
        })

        const params = new URL(window.location).searchParams;
        const username = params.get('username');
        const room = params.get('room');

        btnLeave.addEventListener('click', function(e) {
            const leaveRoom = confirm('Are you sure want to leave the chatroom?');
            if(leaveRoom) {
                console.log("Leave");
                window.location.assign(`/room?username=${username}`);
            } else {

            }
        })

        socket.on("receiveMessage",({username,timeNow,message}) => {
            addMessageuser(username,timeNow,message);
            listMessage.scrollTop = listMessage.scrollHeight;
        })
        socket.on("roomUsers", ({room,username}) => {
            nameRoom.textContent = room;
            addUser(username);
        });

        socket.emit('joinRoom',{username: username,room: room});
