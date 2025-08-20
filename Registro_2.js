const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const registroForm  = document.getElementById('registroForm');

togglePassword.addEventListener('click', () => {
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  togglePassword.classList.toggle('bx-show');
  togglePassword.classList.toggle('bx-hide');
});

registroForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // (Opcional) valida campos mínimos
  const nombre = document.getElementById('name').value.trim();
  const email  = document.getElementById('email').value.trim();
  const rol    = document.getElementById('rol').value;

  if (!nombre || !email || !rol) {
    alert('Completa nombre, correo y selecciona un rol.');
    return;
  }

  if (rol === 'admin') {
    window.location.href = 'http://127.0.0.1:5500/admin.html';
  } else if (rol === 'user') {
    window.location.href = 'http://127.0.0.1:5500/user.html';
  }
});
