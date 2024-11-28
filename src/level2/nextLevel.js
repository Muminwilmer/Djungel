function setUpNextLevel(){
  const nextLevelConfig = {
    left: 44,   // Position from left of door
    top: 59.8,    // Position from top of door
    width: 12,  // Width of door
    height: 14,  // Height of door
    element: "nextLevel", // Name of the element
    parentElement: "image-container"
  }

  addButtonDiv(nextLevelConfig);

  const doorArea = document.getElementById(nextLevelConfig.element);
  
  doorArea.addEventListener("click", function() {
    if (document.getElementById("gameContainer")) return;
    const memoryLevel2 = localStorage.getItem("memorylvl2");
    const mazeLevel2 = localStorage.getItem("mazelvl2");
    
    if (memoryLevel2 == "true" && mazeLevel2 == "true") {
      window.location.href = "../level3/treasure.html";
    } else {
      doorArea.style.cursor = "not-allowed";
      alert(`You have to complete the other rooms to pass!${makeBoolean(memoryLevel2)?"":"\nMemory: ❌"}${makeBoolean(mazeLevel2)?"":"\nMaze: ❌"}`).trim();
    }
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

function makeBoolean(value) {
  return value === "true";
}
