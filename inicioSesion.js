const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const tabla = document.getElementById('tabla');
const body = document.querySelector('body');
const loginBtn = document.getElementById('loginBtn'); 

const nameImages = [
    {range: [0,8], src:'assets/image_2.png'},
    {range: [9,15], src: 'assets/image_3.png'},
    {range: [15,23], src: 'assets/image_4.png'},
    {range: [23,30], src: 'assets/image_5.png'}
]
nameInput.addEventListener('keyup', (Event) => {
    const userValue = nameInput.value.length;
    const image = nameImages.find(
        ({range}) => userValue >= range[0] && userValue <= range[1]
    )
    if(image){
        tabla.src = image.src
    }
})

nameInput.addEventListener("focus", (Event) =>{
    tabla.src =nameImages[0].src
})

const passwordImages = [
    {range: [0,3], src:'assets/image_Contra1.png'},
    {range: [4,8], src: 'assets/image_Contra2.png'},
    {range: [9,11], src: 'assets/image_Contra3.png'},
    {range: [12,30], src: 'assets/image_Contra4.png'}
]
passwordInput.addEventListener('keyup', (Event) => {
    const userValue = passwordInput.value.length;
    const image = passwordImages.find(
        ({range}) => userValue >= range[0] && userValue <= range[1]
    )
    if(image){
        tabla.src = image.src
    }
})

passwordInput.addEventListener("focus", (Event) =>{
    tabla.src =passwordImages[0].src
})

// Animación de despedida al presionar el botón
loginBtn.addEventListener("click", () => {
    tabla.src = 'assets/image_Despi1.png'; // Primera imagen
    setTimeout(() => {
        tabla.src = 'assets/image_Despedida3.png'; // Segunda imagen
    }, 700); // Cambia después de 0.5 segundos
});

togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    //Cambiar icono
    togglePassword.classList.toggle("bx-show");
    togglePassword.classList.toggle("bx-hide");
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Error en el login");
    }

    const data = await response.json();

    // 👇 Aquí rediriges según el rol
    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else if (data.role === "user") {
      window.location.href = "user.html";
    }
  } catch (error) {
    alert("Credenciales inválidas");
  }
});
