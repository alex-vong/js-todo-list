



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
clearAll = document.querySelector(".clear-btn");
clearAll = document.querySelector(".clear-btn"),
taskMenu = document.querySelector("ul .task-menu");

const date = new Date();





const todayDate = dateFns.format(date, 'MMMM Do, YYYY');
today.innerText = todayDate;




const generateTemplate = (todo) => {
    const html = `
		<li class="body-copy todo-item">
			    <span>${todo}</span>
			<div class="delete-btn">
			    <i class="fa-regular fa-trash-can delete"></i>
			</div>
		</li>
	`;

	ul.innerHTML += html;

};
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
    const newTodo = addForm.add.value.trim();

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
ul.addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.parentElement.remove();
	};
	
});


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












