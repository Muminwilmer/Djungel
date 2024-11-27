const doorArea = document.getElementById("door-area");
doorArea.addEventListener("click", validateLogin);

function validateLogin() {
  const password = prompt("Skriv det gömda lösenordet från pusslet.")

  const encodedPassword = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
  
  if (sha256(password) === encodedPassword){
    window.location.href = "../level2/level2.html"
    return true;
  } else {
    console.log("Wrong password")
    return false;
  }
}