function setUpKey(){
  const keyConfig = {
    left: 77,   // Position from left of door
    top: 71,    // Position from top of door
    width: 10,  // Width of door
    height: 10,  // Height of door
    element: "key", // Name of the element
    parentElement: "image-container"
  }

  addButtonDiv(keyConfig);

  const doorArea = document.getElementById(keyConfig.element);
  
  doorArea.addEventListener("click", function() {
    alert("You found the key!")
    localStorage.setItem("keyFound", "true")
  });
}
