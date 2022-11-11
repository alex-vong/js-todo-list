// window.addEventListener('load', (event) => {
//   if (todos) {
// 	generateTemplate();
// }
// });



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

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list")); //getting ls todos


filters.forEach(btn => {
	btn.addEventListener('click', () => {
	
		document.querySelector("span.active").classList.remove("active");
		btn.classList.add("active");
		
		generateTemplate(btn.id);

	})
})

function generateTemplate(filter) {
	let li = '';
 	if(todos.length === 0) {
 		ul.innerHTML = `<span>You don't have any task here!</span>`;
 	}

	todos.forEach((todo, id) => {
		let isCompleted = '';

		if(todo.status == "completed") {
			isCompleted = 'checked';
		} else {
			isCompleted = '';
		}

		// let isCompleted = todo.status == "completed" ? "checked" : "";

		if(filter == todo.status || filter == "all"){
			li += `
	            <li class="task">
	                <label for="${id}">
	                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
	                    <p class="${isCompleted}">${todo.taskName}</p>
	                </label>
	                <div class="settings">
	                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis ellipsis"></i>
	                    <ul class="task-menu">
	                        <li onclick="editTask(${id}, '${todo.taskName}')">
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

		}

		ul.innerHTML = li || `<span>You don't have any task here!</span>`;
	})

};



if (todos) {
	generateTemplate("all");
}
// generateTemplate("all");

function showMenu(selectedTask) {
	let taskMenu = selectedTask.parentElement.lastElementChild;
	taskMenu.classList.add("show");

	document.addEventListener('click', e => {
		if(e.target.tagName !== 'I' || e.target !== selectedTask) {
	taskMenu.classList.remove("show");

		}
	})
}


//edit task
function editTask(taskId, taskName) {
	editId = taskId;
	isEditedTask = true;
	addForm.add.value = taskName;
	addForm.add.classList.add('highlight');

}

//delete task
function deleteTask(deleteId, filter){
	todos.splice(deleteId, 1); //removed deleted id from array of todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    generateTemplate("all");

}


//delete entire list

clearAll.addEventListener("click", () => {
	todos.splice(0, todos.length); //removed deleted id from array of todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    generateTemplate();

})

function updateStatus(selectedTask) { //caled from onclick
	let taskName = selectedTask.parentElement.lastElementChild; //getting the parent elements last child which is p tage

	if(selectedTask.checked) { //if clicked
		taskName.classList.add('checked'); //add class of checked
		console.log(taskName);
		todos[selectedTask.id].status = "completed"; //update the status to completed
	} else {
		taskName.classList.remove('checked');
		todos[selectedTask.id].status = "pending"; //update status to pending
	}
    localStorage.setItem("todo-list", JSON.stringify(todos)); //update local storage to have completed and pending

}


addForm.addEventListener('submit', e => {
    e.preventDefault();
    let value = addForm.add.value.trim();
	
	const setTodo = value.split(" ");
	for (let i = 0; i < setTodo.length; i++) {
	    setTodo[i] = setTodo[i][0].toUpperCase() + setTodo[i].substr(1);
	}

	const newTodo= setTodo.join(" ");


    if (newTodo.length) {
    	addForm.add.classList.remove('error');
    	addForm.reset();
		addForm.add.classList.remove('highlight');

    	// console.log(newTodo);

    	if(!isEditedTask) {
    		if (!todos) {
    		todos = []; //if todos don't exist, pass an empty array to todos
	    	}
	    	let taskInfo = {taskName: newTodo, status: "pending"};
	    	todos.push(taskInfo); //adding new task to todos
    	} else {
    		isEditedTask = false;
    		todos[editId].taskName = newTodo;
    	}

    	addForm.add.value = "";
    	localStorage.setItem("todo-list", JSON.stringify(todos));
    	generateTemplate("all");

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












