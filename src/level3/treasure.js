function setUpTreasure(){
  const treasureConfig = {
    left: 42,   // Position from left of door
    top: 38,    // Position from top of door
    width: 16,  // Width of door
    height: 12,  // Height of door
    element: "treasure", // Name of the element
    parentElement: "image-container"
  }

  addButtonDiv(treasureConfig);

  const doorArea = document.getElementById(treasureConfig.element);
  
  doorArea.addEventListener("click", function() {
    const memoryLevel2 = localStorage.getItem("memorylvl2");
    const mazeLevel2 = localStorage.getItem("mazelvl2");
    
    if (memoryLevel2 == "true" && mazeLevel2 == "true") {
      if (makeBoolean(localStorage.getItem("keyFound"))){
        localStorage.setItem("keyFound", "false");
        alert("You've found and opened the treasure! You're now free from the curse of the jungle!")
        window.location.href = "../level4/credits.html"
      }else{
        alert("The chest is locked. Perhaps you can find the key hidden in this room.")
      }
    } else {
      window.location.href = "../level2/corridor.html";
    }
  });
}

function makeBoolean(value) {
  return value === "true";
}
