document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  const storedPassword = localStorage.getItem(username);

  if (!storedPassword) {
    alert('User not found. Please signup first.');
    return;
  }

  if (password === storedPassword) {
    alert('Login successful!');
    window.location.href = 'index.html';  // direct main game page
  } else {
    alert('Incorrect password. Try again.');
  }
});
