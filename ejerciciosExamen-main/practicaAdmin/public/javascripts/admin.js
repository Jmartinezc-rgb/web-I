document.addEventListener('DOMContentLoaded', async () => {
    const usersTable = document.getElementById('usersTable');
    fetch('/admin/obtenerArray')
        .then((response) => response.json())
        .then((data) => {
            console.log('Datos recibidos:', data.users);
            const users = data.users; 
                for (let key in users) {
                    if(users[key].role == 'user' || users[key].role == 'admin'){
                        console.log(users[key]);
                        const fila = document.createElement('tr');
                        fila.id = 'fila';
                        const column = document.createElement('td');
                        column.textContent = users[key].username;
                        const column2 = document.createElement('td');
                        column2.textContent = users[key].role;
                        const column3 = document.createElement('td');
                        column3.textContent = users[key].last_login;
                        const column4 = document.createElement('td');
                        const deleteButton = document.createElement('button');
                        deleteButton.id = 'deleteButton' + key;
                        deleteButton.textContent = 'Delete';
                        deleteButton.value = users[key].username;
                        if(users[key].role != 'admin'){
                        column4.appendChild(deleteButton);
                        }
                        fila.appendChild(column);
                        fila.appendChild(column2);
                        fila.appendChild(column3);
                        fila.appendChild(column4);
                        usersTable.appendChild(fila);
                        deleteButton.addEventListener('click', async () => {
                            console.log('vamos bien');
                            let user = deleteButton.value;
                            console.log(user);
                            await fetch('/admin/deleteUser', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ user })
                            })
                            .then(response => console.log(response));
                            fila.remove();
                        });
                    };
            };
        })
        .catch((error) => {
        console.error('Error:', error);
        });
});
