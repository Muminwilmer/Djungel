const doorArea = document.getElementById("door-area");
doorArea.addEventListener("click", validateLogin);

function validateLogin() {
  const password = prompt("Skriv det gömda lösenordet från pusslet.")

  const encodedPassword = "766af62a6275002e9909af31d1f15e02609d9443de336c0ce13ba52cb3e56042";
  
  if (sha256(password) === encodedPassword){
    window.location.href = "../level2/corridor.html"
    return true;
  } else {
    console.log("Wrong password")
    return false;
  }
}