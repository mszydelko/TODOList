var toDoForm = document.querySelector("#todoForm");

$( document ).ready(function () {

    function getList() {
        fetch('https://todolist-mszydelko.firebaseio.com/todo.json', {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            createList(json);
            deleteTask();
            submitTask();
            taskThrough();
        });
    };

    function createList(json) {
        let list = document.getElementById('elements');

        list.innerText = '';
        for (let taskID in json) {
            let taskElement = document.createElement('li');
            let taskDeleteButton = document.createElement("button");

            taskDeleteButton.classList.add('button_delete');
            taskDeleteButton.setAttribute('id', taskID);

            taskElement.innerText = json[taskID].value;
            taskElement.setAttribute('id', 'li_' + taskID);

            list.appendChild(taskElement);
            list.appendChild(taskDeleteButton);
            taskDeleteButton.innerHTML = "&#10006;";
        }
        deleteTask();
    }

    function deleteTask() {
        $('.button_delete').on('click', function (event) {
            let taskID = event.target.id;

            fetch('https://todolist-mszydelko.firebaseio.com/todo/' + taskID + '.json', {
                method: "DELETE"
            }).then(function () {
                $('#li_' + taskID).remove();
                $('#' + taskID).remove();
            });
        });

    }

    function submitTask() {
        toDoForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let todoValue = document.querySelector("#add-new-element").value;
            fetch('https://todolist-mszydelko.firebaseio.com/todo.json', {
                method: "POST",
                body: JSON.stringify({value: todoValue})
            }).then(function (response) {
                if (response.ok) {
                    fetch('https://todolist-mszydelko.firebaseio.com/todo.json').then(function (response) {
                        return response.json();
                    }).then(function (json) {
                        createList(json);
                        document.getElementById("todoForm").reset();
                    })
                }
            })
        });
    }

    function taskThrough () {
        var list = document.querySelector('ul');
        list.addEventListener('click', function(ev) {

            if (ev.target.tagName === 'LI') {
                let task = ev.target;
                task.classList.toggle('through-line');
            }
        }, false);
    }

    getList();
});