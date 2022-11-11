



// const search = document.querySelector('.search input');
// const addForm = document.querySelector('.add');
// const ul = document.querySelector('ul');
// const today = document.querySelector('.date');
// const filters = document.querySelectorAll(".filters span");
// const clearAll = document.querySelector(".clear-btn");

const search = document.querySelector('.search input'),
addForm = document.querySelector('.add'),
ul = document.querySelector('ul'),
today = document.querySelector('.date'),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskMenu = document.querySelector("ul .task-menu");


// ellipsis = document.querySelectorAll("i.ellipsis"),
// listItem = document.querySelectorAll("li.task"),
// container = document.querySelector(".todo-list-container");



const date = new Date();


const todayDate = dateFns.format(date, 'MMMM Do, YYYY');
today.innerText = todayDate;


let todos = JSON.parse(localStorage.getItem("todo-list")); //getting ls todos


function generateTemplate() {
filters.forEach(btn => {
	btn.addEventListener('click', () => {
	
		document.querySelector("span.active").classList.remove("active");
		btn.classList.add("active");
		
		generateTemplate(btn.id);

	})
})

	let li = '';

	todos.forEach((todo, id) => {

		let isCompleted = '';

		if(todo.status == "complete") {
			isCompleted = 'checked';
		} else {
			isCompleted = '';
		}

		// let isCompleted = todo.status == "completed" ? "checked" : "";


		li += `
            <li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.taskName}</p>
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis ellipsis"></i>
                    <ul class="task-menu">
                        <li>
                            <i class="fa-regular fa-pen-to-square"></i>
                            <p class="body-class">Edit</p>
                        </li>
                        <li onclick="deleteTask(${id})">
                            <i class="fa-regular fa-trash-can"></i>
                            <p class="body-class">Delete</p>
                        </li>
                    </ul>
                </div>
            </li>
		`;

		ul.innerHTML = li;
	})
}

if (todos) {
	generateTemplate();
}
// generateTemplate();

function showMenu(selectedTask) {
	let taskMenu = selectedTask.parentElement.lastElementChild;
	console.log(taskMenu);
	taskMenu.classList.add("show");

	document.addEventListener('click', e => {
		if(e.target.tagName !== 'I' || e.target !== selectedTask) {
	taskMenu.classList.remove("show");

		}
	})
}


//delete task
function deleteTask(deleteId){
	todos.splice(deleteId, 1); //removed deleted id from array of todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    generateTemplate();

}

function updateStatus(selectedTask) { //caled from onclick
	let taskName = selectedTask.parentElement.lastElementChild; //getting the parent elements last child which is p tage

	if(selectedTask.checked) { //if clicked
		taskName.classList.add('checked'); //add class of checked
		todos[selectedTask.id].status = "completed"; //update the status to completed
	} else {
		taskName.classList.remove('checked');
		todos[selectedTask.id].status = "pending"; //update status to pending
	}
    localStorage.setItem("todo-list", JSON.stringify(todos)); //update local storage to have completed and pending

}


addForm.addEventListener('submit', e => {
    e.preventDefault();
    let newTodo = addForm.add.value.trim();

    if (newTodo.length) {
    	addForm.add.classList.remove('error');
    	addForm.reset();
    	// console.log(newTodo);

    	if (!todos) {
    		todos = []; //if todos don't exist, pass an empty array to todos
    	}
    	addForm.add.value = "";
    	let taskInfo = {taskName: newTodo, status: "pending"};
    	todos.push(taskInfo); //adding new task to todos
    	localStorage.setItem("todo-list", JSON.stringify(todos));
    	generateTemplate();

	} 

});



//delete todos
// ul.addEventListener('click', e => {
// 	if (e.target.classList.contains('delete')) {
// 		e.target.parentElement.parentElement.remove();
// 	};
	
// });


//filtering task
const filterTodos = (term) => {
	Array.from(ul.children)
		.filter( (todo) => !todo.textContent.toLowerCase().includes(term))
		.forEach((todo) => todo.classList.add('filtered'));

	Array.from(ul.children)
		.filter( (todo) => todo.textContent.includes(term))
		.forEach((todo) => todo.classList.remove('filtered'));
};


search.addEventListener('keyup', e => {
	const term = search.value.trim().toLowerCase();
	filterTodos(term);


});












