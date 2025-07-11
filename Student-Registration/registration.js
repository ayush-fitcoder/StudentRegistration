// Get All elements
const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const idInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const contactInput = document.getElementById('contact');
const tableBody = document.querySelector('#studentTable tbody');

// Load existing data from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

// Initial render
renderTable();

// Form submission handler
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validate inputs
  if (!validateInputs()) return;

  const student = {
    name: nameInput.value.trim(),
    studentId: idInput.value.trim(),
    email: emailInput.value.trim(),
    contact: contactInput.value.trim()
  };

  if (editIndex !== null) {
    students[editIndex] = student;
    editIndex = null;
  } else {
    students.push(student);
  }

  // Save and update 
  saveData();
  renderTable();
  form.reset();
});

// Validate inputs
function validateInputs() {
  const nameRegex = /^[a-zA-Z ]+$/;
  const idRegex = /^[0-9]+$/;
  const contactRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(nameInput.value.trim())) {
    alert("Name should contain only letters.");
    return false;
  }

  if (!idRegex.test(idInput.value.trim())) {
    alert("Student ID should contain only numbers.");
    return false;
  }

  if (!contactRegex.test(contactInput.value.trim())) {
    alert("Contact number should be 10 digits.");
    return false;
  }

  if (!emailRegex.test(emailInput.value.trim())) {
    alert("Please enter a valid email.");
    return false;
  }

  return true;
}

// Render table rows
function renderTable() {
  tableBody.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Save to localStorage
function saveData() {
  localStorage.setItem('students', JSON.stringify(students));
  alert("Student registered successfully!");
}

// Edit student
function editStudent(index) {
  const student = students[index];
  nameInput.value = student.name;
  idInput.value = student.studentId;
  emailInput.value = student.email;
  contactInput.value = student.contact;
  editIndex = index;
}

// Delete student
function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this record?')) {
    students.splice(index, 1);
    saveData();
    renderTable();
  }
}
