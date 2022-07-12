// !QUERYSELECTORS
const todoListWrapper = document.querySelector('ul');
const input = document.querySelector('input');
const btn = document.querySelector('.addtodo-btn');
const alert = document.querySelector('.alert-message');
const clearAllBtn = document.querySelector('.clear-btn');

// !EVENT LISTENERS
window.addEventListener('load', () => {
  const data = JSON.parse(localStorage.getItem('todos'));
  if (data !== null) {
    todosArray = data;
    mapArrayHandler(todosArray);
  }
});
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btn.click();
  }
});
btn.addEventListener('click', addTodoHandler);
clearAllBtn.addEventListener('click', clearTodosHandler);
todoListWrapper.addEventListener('click', eventHandler);

// !DECLARE VARIABLES GLOBALLY
let todosArray = [];
let todoItem = { text: null, completed: false };
let editedElement = null;
let editCheck = false;

// !FUNCTIONS
// addTodoHandler
function addTodoHandler() {
  let inputValue = input.value.trim();
  if (
    inputValue.length > 0 &&
    !todosArray.includes({ ...todoItem, text: inputValue }) &&
    !editCheck
  ) {
    // ***update todosArray***
    todoItem = {
      ...todoItem,
      completed: false,
      text: inputValue,
    };
    todosArray.push(todoItem);
    alertHandler('todo elave olundu!', 'success', 'danger');
  } else if (inputValue.length === 0) {
    alertHandler('input bosdur!', 'danger', 'success');
  } else if (todosArray.includes({ ...todoItem, text: inputValue })) {
    alertHandler('Bu item listde movcuddur', 'danger', 'success');
  } else if (editCheck) {
    // *** update todosArray ***
    const findItem = todosArray.find((item) => {
      return item.text === editedElement;
    });
    const indexItem = todosArray.indexOf(findItem);
    todosArray.splice(indexItem, 1, {
      ...todoItem,
      text: inputValue,
    });
    btn.textContent = 'Add';
    editCheck = false;
  }
  setLocalStorage(todosArray);
  mapArrayHandler(todosArray);
}

// alertHandler
function alertHandler(text, add, remove) {
  alert.innerHTML = text;
  alert.classList.add(`alert-${add}`);
  alert.classList.remove(`alert-${remove}`);
  setTimeout(() => {
    alert.innerHTML = null;
  }, 2000);
}

// eventHandler (delete and edit)
function eventHandler(e) {
  const target = e.target;
  switch (target.className) {
    case 'delete-btn':
      todosArray = todosArray.filter((item) => {
        return (
          item.text !==
          target.parentElement.previousElementSibling.previousElementSibling
            .textContent
        );
      });
      mapArrayHandler(todosArray);
      deleteLocalStorage(todosArray);
      btn.textContent = 'Add todo';
      break;
    case 'edit-btn':
      editCheck = true;
      const value =
        target.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      input.value = value;
      editedElement = value;
      btn.textContent = 'Edit';
      input.focus();
      break;
    case 'check-box':
      if (target.checked) {
        console.log('checked');
        target.nextElementSibling.classList.add('checked');
        const findCheckedItem = todosArray.find(
          (item) => item.text === target.nextElementSibling.textContent
        );
        findCheckedItem['completed'] = true;
        todoItem = findCheckedItem;
        const indexCheckedItem = todosArray.indexOf(todoItem);
        todosArray.splice(indexCheckedItem, 1, todoItem);
        console.log(todoItem);

        setLocalStorage(todosArray);
        mapArrayHandler(todosArray);
      } else {
        console.log('unchecked');
        target.nextElementSibling.classList.remove('checked');
        const findCheckedItem = todosArray.find(
          (item) => item.text === target.nextElementSibling.textContent
        );
        findCheckedItem['completed'] = false;
        todoItem = findCheckedItem;
        const indexUnCheckedItem = todosArray.indexOf(todoItem);
        todosArray.splice(indexUnCheckedItem, 1, todoItem);
        console.log(todoItem);

        setLocalStorage(todosArray);
        mapArrayHandler(todosArray);
      }
  }
}

// clearTodosHandler
function clearTodosHandler() {
  // ***update todosArray***
  if (todosArray.length > 0) {
    todosArray = [];
    mapArrayHandler(todosArray);
    btn.textContent = 'Add todo';
    alert.textContent = 'Enter what you want to procastinate:)';

    clearLocalStorage();
  }
}

// mapArrayHandler
function mapArrayHandler(arr) {
  const newArray = arr.map((item) => {
    const { text, completed } = item;
    return `<li>
              <input type="checkbox" ${
                completed ? 'checked' : ''
              } class="check-box"/>
              <p class="todo-text" ${
                completed ? 'style=text-decoration:line-through' : ''
              }>${text}</p>
              <p class="status" ${completed ? 'style=color:green' : ''}>${
      completed ? 'completed' : 'uncompleted'
             }</p> 
              <div class='button-wrapper'>
                <button class='edit-btn'>Edit</button>
                <button class='delete-btn'>Delete</button>
              </div>    
             </li>`;
  });

  const toJoin = newArray.join('');
  const tostring = toJoin.toString();
  todoListWrapper.innerHTML = tostring;
  input.value = null;
  console.log('map', todosArray);
}

// setLocalStorage
function setLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}
// clearLocalStorage
function clearLocalStorage() {
  localStorage.removeItem('todos');
}
// deleteLocalStorage
function deleteLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// ? js features have been used in this project?

// 1. DOM Manipulation
// 2. EventListeners
// 3. Using and updating arrays, objects and primitive data types
// 4. 90% of array methods
// 5. if/else and switch/case statements
// 6. ternary operators
// 7. spread operator
// 8. template literals
// 9. object destructuring
// 10.LocalStorage