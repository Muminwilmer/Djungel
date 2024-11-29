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
    
    // if (memoryLevel2 == "true" && mazeLevel2 == "true") {
      if (makeBoolean(localStorage.getItem("keyFound"))){
        console.log("Opening chest")
        localStorage.setItem("keyFound", "false");
        alert("You've found and opened the treasure! But inside you find it comes at a heavy cost..")
        alert('You find a note in a weird language. At the bottom it reads "By holding this note you shall be cursed to forever have damp socks!"')
        alert('And there it ends. Stuck in a temple with enough money to fill all your biggest dreams\nBut at the cost of having forver damp socks.')
        alert('Thanks for playing.')
        window.location.href = "../level4/credits.html"
      }else{
        alert("The chest is locked. Perhaps you can find the key hidden in this room.")
      }
    // } else {
    //   window.location.href = "../level2/corridor.html";
    // }
  });
}

function makeBoolean(value) {
  return value === "true";
}
