function setUpEasterEgg(){
  const diamond = {
    left: 48,   // Position from left of door
    top: 50,    // Position from top of door
    width: 4,  // Width of door
    height: 3.5,  // Height of door
    element: "diamond", // Name of the element
    parentElement: "image-container"
  }
  addButtonDiv(diamond);

  const doorArea = document.getElementById(diamond.element)
  doorArea.addEventListener("click", function() {
    if (document.getElementById("gameContainer")){ 
      console.log("Pressed diamond, but game is active.")
      return;
    }
    console.log("Pressed diamond, resetting everything.")
    alert("You try to steal the diamond. Suddenly the diamond lights up and you remember no more..");
    localStorage.setItem("memorylvl2", "false");
    localStorage.setItem("mazelvl2", "false");
    localStorage.setItem("keyFound", "false");
    window.location.href = "../level1/outside.html"
  });
  doorArea.addEventListener("mousemove", checkIfHide);
}

function checkIfHide(){
  if (document.getElementById("gameContainer")){
    this.style.cursor = "default"
    this.style.display = "none"
  }else{
    this.style.cursor = "pointer"
    this.style.display = "block"
  }
}