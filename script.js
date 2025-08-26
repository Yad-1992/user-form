let users = [];
let editIndex = -1;

function addUser() {
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const ageInput = document.getElementById('ageInput');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const age = ageInput.value.trim();

  if (!name || !email || !age) {
    alert('Please fill in all fields');
    return;
  }

  const user = { name, email, age: parseInt(age) };
  if (editIndex === -1) {
    users.push(user);
  } else {
    users[editIndex] = user;
    editIndex = -1;
  }

  nameInput.value = '';
  emailInput.value = '';
  ageInput.value = '';
  renderTable();
}

function editUser(index) {
  const user = users[index];
  document.getElementById('nameInput').value = user.name;
  document.getElementById('emailInput').value = user.email;
  document.getElementById('ageInput').value = user.age;
  editIndex = index;
  renderTable();
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    renderTable();
  }
}

function renderTable() {
  const tableBody = document.getElementById('userTableBody');
  tableBody.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>
        <button class="edit-btn" onclick="editUser(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Handle Enter key press
document.getElementById('nameInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addUser();
  }
});
