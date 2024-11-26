const doorArea = document.getElementById("door-area");
doorArea.addEventListener("click", validateLogin);

function validateLogin() {
  const password = prompt("Enter the password! 😡")

  const encodedPassword = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
  
  if (sha256(password) === encodedPassword){
    alert("✅");
    return true;
  } else {
    alert("❌");
    return false;
  }
}