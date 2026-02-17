(function () {
    const STORAGE_KEY = 'todos';

    function loadTodos() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveTodos(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    let todos = loadTodos();

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    function render() {
        list.innerHTML = '';
        todos.forEach(function (todo) {
            const li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' completed' : '');
            li.dataset.id = todo.id;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', function () {
                toggleTodo(todo.id);
            });

            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;
            span.addEventListener('dblclick', function () {
                startEdit(todo.id);
            });

            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-delete';
            btnDelete.textContent = '삭제';
            btnDelete.addEventListener('click', function () {
                deleteTodo(todo.id);
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(btnDelete);
            list.appendChild(li);
        });
    }

    function addTodo(text) {
        const trimmed = text.trim();
        if (!trimmed) return;
        todos.push({
            id: Date.now(),
            text: trimmed,
            completed: false,
            createdAt: new Date().toISOString()
        });
        saveTodos(todos);
        render();
    }

    function deleteTodo(id) {
        todos = todos.filter(function (t) { return t.id !== id; });
        saveTodos(todos);
        render();
    }

    function toggleTodo(id) {
        todos = todos.map(function (t) {
            if (t.id === id) {
                return Object.assign({}, t, { completed: !t.completed });
            }
            return t;
        });
        saveTodos(todos);
        render();
    }

    function startEdit(id) {
        var todo = todos.find(function (t) { return t.id === id; });
        if (!todo) return;

        var li = list.querySelector('[data-id="' + id + '"]');
        if (!li) return;

        var span = li.querySelector('.todo-text');
        if (!span) return;

        var editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        span.replaceWith(editInput);
        editInput.focus();

        function finishEdit() {
            var newText = editInput.value.trim();
            if (newText && newText !== todo.text) {
                todos = todos.map(function (t) {
                    if (t.id === id) {
                        return Object.assign({}, t, { text: newText });
                    }
                    return t;
                });
                saveTodos(todos);
            }
            render();
        }

        editInput.addEventListener('blur', finishEdit);
        editInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                editInput.blur();
            } else if (e.key === 'Escape') {
                editInput.removeEventListener('blur', finishEdit);
                render();
            }
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
        input.focus();
    });

    render();
})();
