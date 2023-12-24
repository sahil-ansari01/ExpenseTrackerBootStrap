document.addEventListener('DOMContentLoaded', function () {
    const expenseList = document.getElementById('expenseList');
    const expenseForm = document.getElementById('expenseForm'); // Add a form element reference

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const expenseAmount = document.getElementById('expenseAmount').value;
        const expenseName = document.getElementById('expenseName').value;
        const expenseCategory = document.getElementById('expenseCategory').value;

        const expenseData = {
            amount: expenseAmount,
            name: expenseName,
            category: expenseCategory
        };

        const expenseKey = expenseName; // Use the name as the key
        const expenseDataStringify = JSON.stringify(expenseData);
        localStorage.setItem(expenseKey, expenseDataStringify);

        const listItem = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        listItem.className = 'list-group-item tab-space';
        deleteBtn.className = 'btn btn-danger btn-sm float-right ml-2';
        editBtn.className = 'btn btn-warning btn-sm float-right ml-2';

        listItem.textContent = `$${expenseAmount} ${expenseName} ${expenseCategory}`;
        deleteBtn.textContent = 'Delete';
        editBtn.textContent = 'Edit';

        expenseList.appendChild(listItem);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(editBtn);

        deleteBtn.addEventListener('click', deleteEl);
        editBtn.addEventListener('click', editEl);

        function deleteEl() {
            expenseList.removeChild(listItem); // Use removeChild to remove the specific listItem
            localStorage.removeItem(expenseKey);
        }

        function editEl() {
            const values = JSON.parse(localStorage.getItem(expenseKey));
            document.getElementById('expenseAmount').value = values.amount; // Fix the value assignment
            document.getElementById('expenseName').value = values.name;
            document.getElementById('expenseCategory').value = values.category;
            deleteEl();
        }

        // Clear input
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseCategory').value = '';
    });
});
