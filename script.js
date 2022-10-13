const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const dark = document.querySelector('.dark')
const body = document.querySelector('.body')
const h1 = document.querySelector('.h1')
const small = document.querySelector('.small')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addtodo(todo))
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    addtodo()
})

function addtodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }
    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed){
            todoEl.classList.add('completed')
        }
        todoEl.innerText = todoText
        // to add completed
        todoEl.addEventListener('click',()=>{
            todoEl.classList.toggle('completed')
            updatels()
        })
        // remove todo
        todoEl.addEventListener('contextmenu',(e)=>{
            e.preventDefault()
            todoEl.remove()
            updatels()
        })

        todosUL.appendChild(todoEl)
        input.value =''
    // remove completed task after 10s
        setInterval(()=>{
            if(todoEl.classList.contains('completed')){
                todoEl.remove()
                updatels()
            }
        }, 10000)

        updatels()
    }
}

function updatels() {
    todoEl = document.querySelectorAll('li')

    const todos = []

    todoEl.forEach(todoEl=> {
        todos.push({
            text:todoEl.innerText,
            completed:todoEl.classList.contains('completed')
        })
    })
    localStorage.setItem('todos',JSON.stringify(todos))
}

//Dark mode
dark.addEventListener('click',()=>{
    body.classList.toggle('on')
    h1.classList.toggle('on')
    small.classList.toggle('on')
})