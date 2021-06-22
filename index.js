// Import stylesheets
import './style.css';

const todo = [];
const done = [];
let count = 0;
document.getElementById('add').addEventListener('click', addTodo);

function addTodo() {
  const input = document.getElementById('text');
  const inputValue = input.value;
  todo.push({
    id: ++count,
    value: inputValue
  });
  document.getElementById('text').value = '';
  render('todo', todo);
}

function moveToDone() {
  let id = this.id;
  const removedIndex = todo.findIndex(el => el.id == id);
  const doneEL = todo.splice(removedIndex, 1);
  done.push(doneEL[0]);
  render('todo', todo);
  render('done', done);
}

function moveToTodo() {
  let id = this.id;
  const removedIndex = done.findIndex(el => el.id == id);
  const doneEL = done.splice(removedIndex, 1);
  todo.push(doneEL[0]);
  render('todo', todo);
  render('done', done);
}

function render(id, list) {
  const todoEl = document.getElementById(id);
  while (todoEl.firstChild) {
    todoEl.removeChild(todoEl.lastChild);
  }
  for (let i = 0; i < list.length; i++) {
    const para = document.createElement('div');
    para.setAttribute('id', list[i].id);
    para.setAttribute('class', 'list');
    const node = document.createTextNode(list[i].value);

    para.appendChild(node);
    todoEl.appendChild(para);
    if (id == 'todo') {
      const button = document.createElement('button');
      button.innerText = 'Move';
      button.addEventListener('click', moveToDone.bind({ id: list[i].id }));
      todoEl.appendChild(button);
    }
    if (id == 'done') {
      para.addEventListener('click', moveToTodo.bind({ id: list[i].id }));
    }
  }
}
