document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  if (localStorage.getItem(username)) {
    alert('Username already exists. Choose another.');
    return;
  }

  localStorage.setItem(username, password);

  alert('Signup successful! Please login.');
  window.location.href = 'login.html';
});
