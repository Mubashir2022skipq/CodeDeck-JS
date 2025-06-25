const todoInput = document.getElementById('todo-input')
const addTodoItem = document.getElementById('add-btn')
const todoListItems = document.getElementById('todo-list')

const todoContainer = document.querySelector('.todo-container')
let todoListValue = [];

const getTodoListItem = () => {
    return JSON.parse(localStorage.getItem("todoname")) ?? [];
}


const addTodoListLocalStorage = (todos) => {

    return localStorage.setItem("todoname", JSON.stringify(todos))


}


const showTodoList = () => {


    todoListValue = getTodoListItem();
    todoListValue.forEach(currentTodo => {
        const elementliCreate = document.createElement('li');
        elementliCreate.innerHTML = currentTodo;
        const iconSpan = document.createElement('span')
        iconSpan.innerHTML = `<svg  id="edit_item"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
     <svg id="delete_item"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
     `


        elementliCreate.appendChild(iconSpan);
        todoListItems.appendChild(elementliCreate);

    });
}


const editTodoList = (e) => {
    const editIcon = e.target.closest('svg');
    if (editIcon && editIcon.id === 'edit_item') {
        const todoItem = editIcon.closest('li')

        let editTodoItem = todoItem.textContent.trim();

        let newTextValue = prompt("Edit item ", editTodoItem)



        if (editTodoItem == null || editTodoItem.trim() == "") {
            return;
        }


        deleteEdit(todoItem);



        todoListValue.push(newTextValue.trim());
        addTodoListLocalStorage(todoListValue);

        showTodoList();




    }
}

const removeTodoList = (e) => {
    const deleteIcon = e.target.closest('svg');
    if (deleteIcon && deleteIcon.id === 'delete_item') {
        const todoItem = e.target.closest('li');
        const todoText = todoItem.textContent.trim();

        todoItem.remove();

        todoListValue = todoListValue.filter((todo) => todo !== todoText);
        addTodoListLocalStorage(todoListValue)

    }
}





const addTodoList = () => {


    todoListValue = getTodoListItem();
    let newTodo = todoInput.value.trim();

    todoInput.value = " ";



    if (newTodo.length != 0 && !todoListValue.includes(newTodo.toLowerCase())) {

        console.log(newTodo.length);
        console.log(todoListValue.includes(newTodo));



        todoListValue.push(newTodo)

        addTodoListLocalStorage(todoListValue);


        const elementliCreate = document.createElement('li');
        elementliCreate.innerHTML = newTodo;
        const iconSpan = document.createElement('span')
        iconSpan.innerHTML = `<svg  id="edit_item"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
     <svg id="delete_item"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
     `


        elementliCreate.appendChild(iconSpan);
        todoListItems.appendChild(elementliCreate);




    }
    else {

        alert("Invalid Input or Duplicate Item.");
        console.log(newTodo.length);
        console.log(todoListValue.includes(newTodo));
    }
}


const deleteEdit = (todoItem) => {


    todoItem.remove();

    todoListValue = todoListValue.filter((currenttodo) => currenttodo !== todoItem.textContent.trim())
    addTodoListLocalStorage(todoListValue);
}




showTodoList();

addTodoItem.addEventListener('click', () => {
    addTodoList();
})

todoListItems.addEventListener('click', (e) => {
    editTodoList(e);
})

todoListItems.addEventListener('click', (e) => {
    removeTodoList(e);
})