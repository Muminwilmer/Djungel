function setUpEasterEgg(){
  const bird1 = {
    left: 37,   // Position from left of door
    top: 24,    // Position from top of door
    width: 5.4,  // Width of door
    height: 1.4,  // Height of door
    element: "bird1", // Name of the element
    parentElement: "image-container"
  }
  addButtonDiv(bird1);

  document.getElementById(bird1.element)
  .addEventListener("click", function() {
    alert("Who's that?");
  });
  

  const bird2 = {
    left: 43.5,   // Position from left of door
    top: 29,    // Position from top of door
    width: 5,  // Width of door
    height: 2.4,  // Height of door
    element: "bird2", // Name of the element
    parentElement: "image-container"
  }
  addButtonDiv(bird2);

  document.getElementById(bird2.element)
  .addEventListener("click", function() {
    alert("Imagine needing to walk, smh.");
  });


  const bird3 = {
    left: 59.8,   // Position from left of door
    top: 22,    // Position from top of door
    width: 5.4,  // Width of door
    height: 2.5,  // Height of door
    element: "bird3", // Name of the element
    parentElement: "image-container"
  }
  addButtonDiv(bird3);

  document.getElementById(bird3.element)
  .addEventListener("click", function() {
    alert("Hawk 1: Where's Hawk 3?\nHawk 2: uhhh");
  });
}