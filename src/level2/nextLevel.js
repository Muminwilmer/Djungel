function setUpNextLevel(){
  const nextLevelConfig = {
    left: 44,   // Position from left of door
    top: 59,    // Position from top of door
    width: 12,  // Width of door
    height: 16,  // Height of door
    element: "nextLevel", // Name of the element
    parentElement: "image-container"
  }

  addButtonDiv(nextLevelConfig);

  const doorArea = document.getElementById(nextLevelConfig.element);
  
  doorArea.addEventListener("click", function() {
    const memoryLevel2 = localStorage.getItem("memorylvl2");
    const mouseMazeLevel2 = localStorage.getItem("mouseMazelvl2");
    
    if (memoryLevel2 && mouseMazeLevel2) {
      window.location.href = "../level3/treasure.html";
    } else {
      doorArea.style.cursor = "not-allowed";
      alert("You need to complete the other rooms to pass!");
    }
  });
}
