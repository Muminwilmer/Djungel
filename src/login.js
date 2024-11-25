function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const encodedUsername = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
  const encodedPassword = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
  
  if (sha256(username) === encodedUsername && sha256(password) === encodedPassword){
    alert("Login successful! You solved the puzzle!");
    return true;
  } else {
    alert("Incorrect username or password. Try again!");
    return false;
  }
}