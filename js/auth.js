window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('loggedInUser')) {
    window.location.href = 'movies.html';
  }
});

function switchTab(tab) {
  const login = tab === 'login';

  document.getElementById('loginPanel').classList.toggle('hidden', !login);
  document.getElementById('signupPanel').classList.toggle('hidden', login);

  document.getElementById('loginTab').classList.toggle('bg-[#22263a]', login);
  document.getElementById('signupTab').classList.toggle('bg-[#22263a]', !login);

  document.getElementById('formHeading').textContent =
    login ? 'Sign in to watch' : 'Create your account';

  document.getElementById('formSubheading').textContent =
    login ? 'Welcome back — your movies are waiting.' : 'It’s free. No credit card needed.';

  clearAlerts();
}

// ALERTS
function show(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hide(id) {
  const el = document.getElementById(id);
  el.classList.add('hidden');
}

function clearAlerts() {
  ['loginError','loginSuccess','signupError','signupSuccess'].forEach(hide);
}

// STORAGE
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// SIGNUP
function handleSignup() {
  clearAlerts();

  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value.trim();
  const confirm = document.getElementById('signupConfirm').value.trim();

  if (!email || !password || !confirm) {
    return show('signupError', 'Fill all fields');
  }

  if (password.length < 6) {
    return show('signupError', 'Password must be at least 6 characters');
  }

  if (password !== confirm) {
    return show('signupError', 'Passwords do not match');
  }

  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return show('signupError', 'Email already exists');
  }

  users.push({ email, password });
  saveUsers(users);

  show('signupSuccess', 'Account created!');

  setTimeout(() => switchTab('login'), 1000);
}

// LOGIN
function handleLogin() {
  clearAlerts();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    return show('loginError', 'Fill all fields');
  }

  const users = getUsers();

  const match = users.find(u => u.email === email && u.password === password);

  if (!match) {
    return show('loginError', 'Invalid credentials');
  }

  // ✅ FIXED: store as STRING (IMPORTANT)
  localStorage.setItem('loggedInUser', email);

  show('loginSuccess', 'Logged in successfully');

  setTimeout(() => {
    window.location.href = 'movies.html';
  }, 800);
}

// ENTER KEY
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  if (!document.getElementById('loginPanel').classList.contains('hidden')) {
    handleLogin();
  } else {
    handleSignup();
  }
});