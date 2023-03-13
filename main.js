
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
        const modal = document.createElement('div');
        const modalContent = document.createElement('div');
        const close = document.createElement('i');
        const title = document.createElement('h3');
        const modalList = document.createElement('ul');
        const modalItem = document.createElement('li');
        const modalInfo = document.createElement('p');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        modal.classList.add('services__modal')
        title.classList.add('services__modal-title')
        modalContent.classList.add('services__modal-content')
        modalContent.classList.add('services__modal-content')
        close.classList.add('bx', 'bx-x', 'services__modal-close')
        modalList.classList.add('services__modal-list')
        modalItem.classList.add('services__modal-item')
        modalInfo.classList.add('services__modal-info')

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Ver';
		deleteButton.innerHTML = 'Deletar';

    title.innerHTML =`${todo.category}`
    modalInfo.innerHTML=`${todo.content}`

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
        todoItem.appendChild(modal);
        modal.appendChild(modalContent);
        modalContent.appendChild(close);
        modalContent.appendChild(title);
        modalContent.appendChild(modalList);
        modalList.appendChild(modalItem);
        modalItem.appendChild(modalInfo);
		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		// edit.addEventListener('click', (e) => {
		// 	const input = content.querySelector('input');
		// 	input.removeAttribute('readonly');
		// 	input.focus();
		// 	input.addEventListener('blur', (e) => {
		// 		input.setAttribute('readonly', true);
		// 		todo.content = e.target.value;
		// 		localStorage.setItem('todos', JSON.stringify(todos));
		// 		DisplayTodos()

		// 	})
		// })

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
    const modalViews = document.querySelectorAll('.services__modal')
const modalBtns = document.querySelectorAll('.edit')
const modalClose = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb,i)=>{
    mb.addEventListener('click', () =>{
        modal(i)
        console.log(mb)
        
    }
)})



modalClose.forEach((mc) =>{
    mc.addEventListener('click', () =>{
        modalViews.forEach((mv) =>{
            mv.classList.remove('active-modal')
        })
    })
})

}



