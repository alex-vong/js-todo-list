



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


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const toDo = addForm.add.value.trim();

    if (toDo.length) {
    	addForm.add.classList.remove('error');
    	generateTemplate(toDo);
    	addForm.reset();
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












