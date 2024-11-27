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

  document.getElementById(diamond.element)
  .addEventListener("click", function() {
    alert("You try to steal the diamond but it's stuck..");
  });
  
}