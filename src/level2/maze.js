function setUpMouseMaze(){
  const mazeConfig = {
    left: 61,   // Position from left of door
    top: 56,    // Position from top of door
    width: 8,  // Width of door
    height: 24,  // Height of door
    element: "maze", // Name of the element
    parentElement: "image-container"
  }

  addButtonDiv(mazeConfig);

  const doorArea = document.getElementById(mazeConfig.element);
  doorArea.addEventListener("click", startMazeGame);
}

function startMazeGame(){

  window.scrollTo(0, 0);

  const imageContainer = document.getElementById("image-container");

  // Create a game container
  const gameContainer = document.createElement("div");
  gameContainer.id = "gameContainer";
  gameContainer.style.position = "absolute"; // Keep this for absolute positioning
  gameContainer.style.top = "50%"; // Position from the top
  gameContainer.style.left = "50%"; // Position from the left
  gameContainer.style.transform = "translate(-50%, -50%)"; // Move the element back by half its size
  gameContainer.style.width = "80vh";
  gameContainer.style.height = "80vh";
  gameContainer.style.backgroundColor = "#f9f9f9";
  gameContainer.style.border = "2px solid black";
  gameContainer.style.display = "grid";
  // gameContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
  gameContainer.style.padding = "10px";

  imageContainer.appendChild(gameContainer);
}