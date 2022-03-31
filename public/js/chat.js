
        const socket = io('localhost:3000');
        const inputMessage = document.getElementById('input-message');
        const sendMessage = document.getElementById('send-message');
        const listUseronline = document.getElementById('list-user-online');
        const listMessageuser = document.getElementById('list-message-group');
        const listMessage = document.querySelector('.list-message');

        function addMessageuser(res) {
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            const name = document.createElement('span');
            const time = document.createElement('span');
            const liMessage = document.createElement('li');
            name.textContent = res.myName;
            time.textContent = res.time;
            liMessage.textContent = res.inputMessage;
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

        function addUser(data) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.classList.add('menu-item');
            li.textContent = data.name;
            listUseronline.appendChild(li);
        }

        let myData=null;
        sendMessage.addEventListener('click', function(e) {
            socket.emit('sendMessage',{myData: myData, inputMessage: inputMessage.value});
            inputMessage.value="";
        })

        const chatMessage = document.querySelectorAll('#list-message-ul');

        socket.on("receiveMessage",function(res) {
            addMessageuser(res);
            listMessage.scrollTop = listMessage.scrollHeight;  
        })

        socket.on("send", function(data) {
            addUser(data);
            if(!myData) {
                myData = data;
            }
        })

        socket.on("eventJoin", function(data) {
            console.log(data);
        })

        socket.on('userDisconnect', function(data) {

        })

        /* const url = 'https://test/com?x=a&y=b';
        function getUrlVars(url) {
            var vars = {};
            var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        } */