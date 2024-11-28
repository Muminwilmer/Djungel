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
  doorArea.addEventListener("click", preStartMazeGame);
  doorArea.addEventListener("mousemove", checkIfHide);
}
let gameStarted = false
let mazeAudio;

function checkIfHide(){
  if (document.getElementById("gameContainer")){
    this.style.cursor = "default"
  }else{
    this.style.cursor = "pointer"
  }
}

async function preStartMazeGame() {
  if (document.getElementById("gameContainer")) return;
  if (document.getElementById("mazeAudio")) return;

  mazeAudio = document.createElement("audio");
  mazeAudio.id = "mazeAudio"
  
  mazeAudio.src = "../assets/puzzleMusic.mp3"
  mazeAudio.play()
  startMazeGame()
}
function startMazeGame() {
  window.scrollTo(0, 0);
  if (document.getElementById("gameContainer"))return;
  
  // Game container setup
  const imageContainer = document.getElementById("image-container");

  const gameContainer = document.createElement("div");
  
  gameContainer.id = "gameContainer";
  gameContainer.style.position = "relative";
  gameContainer.style.width = "100vh";
  gameContainer.style.height = "100vh";
  gameContainer.style.backgroundColor = "#f9f9f9";
  gameContainer.style.border = "2px solid black";
  gameContainer.style.overflow = "hidden";
  imageContainer.appendChild(gameContainer);

  // Walls configuration
  const walls = [

    /* Corner walls */
    // Left
    { left: "0%", top: "0%", width: "2%", height: "100%" },

    // Right with opening
    { left: "92%", top: "20%", width: "8%", height: "80%" },

    // Top
    { left: "0%", top: "0%", width: "100%", height: "2%" },

    // Bottom
    { left: "0%", top: "98%", width: "100%", height: "2%" },

    // Row 1
    { left: "10%", top: "17%", width: "90%", height: "8%" },

    // Bumps
    // Top
    
    // { left: "10%", top: "20%", width: "5%", height: "10%" },

    { left: "20%", top: "20%", width: "5%", height: "15%" },
    { left: "40%", top: "20%", width: "5%", height: "15%" },
    { left: "60%", top: "20%", width: "5%", height: "15%" },
    { left: "80%", top: "20%", width: "20%", height: "15%" },
    // Bottom

    { left: "10%", top: "30%", width: "5%", height: "15%" },
    { left: "30%", top: "30%", width: "5%", height: "15%" },
    { left: "50%", top: "30%", width: "5%", height: "15%" },
    { left: "70%", top: "30%", width: "5%", height: "15%" },
    // Row 2
    { left: "0%", top: "40%", width: "90%", height: "8%" },

    // Row 3
    { left: "5%", top: "51%", width: "95%", height: "8%" },

    // Cubes

    { left: "5%", top: "58%", width: "5%", height: "6%" },
    { left: "5%", top: "69%", width: "5%", height: "6%" },

    { left: "15%", top: "64%", width: "5%", height: "5%" },
    { left: "25%", top: "61%", width: "5%", height: "5%" },
    { left: "25%", top: "67%", width: "5%", height: "5%" },
    { left: "35%", top: "64%", width: "5%", height: "5%" },
    { left: "45%", top: "61%", width: "5%", height: "5%" },
    { left: "45%", top: "67%", width: "5%", height: "5%" },
    { left: "55%", top: "64%", width: "5%", height: "5%" },
    { left: "65%", top: "61%", width: "5%", height: "15%" },
    { left: "72%", top: "57%", width: "7%", height: "15%" },
    { left: "82%", top: "62%", width: "8%", height: "20%" },
    // Row 4
    { left: "0%", top: "74%", width: "90%", height: "8%" },
    
    { left: "20%", top: "80%", width: "5%", height: "15%" },
    { left: "40%", top: "80%", width: "5%", height: "15%" },
    { left: "60%", top: "80%", width: "5%", height: "15%" },
    { left: "80%", top: "80%", width: "5%", height: "15%" },
    // Bottom

    { left: "30%", top: "85%", width: "5%", height: "15%" },
    { left: "50%", top: "85%", width: "5%", height: "15%" },
    { left: "70%", top: "85%", width: "5%", height: "15%" },
    // Add more wall objects here
  ];

  // Add walls to the maze
  walls.forEach((wallConfig, index) => {
    const wall = document.createElement("div");
    wall.className = "maze-wall";
    wall.style.position = "absolute";
    wall.style.backgroundColor = "black";
    wall.style.left = wallConfig.left;
    wall.style.top = wallConfig.top;
    wall.style.width = wallConfig.width;
    wall.style.height = wallConfig.height;
    gameContainer.appendChild(wall);
  });

  // Add start and end points
  const startArea = document.createElement("div");
  startArea.id = "startArea";
  startArea.style.position = "absolute";
  startArea.style.right = "2.5%";
  startArea.style.top = "4.5%";
  startArea.style.width = "10%";
  startArea.style.height = "10%";
  startArea.style.backgroundColor = "green";
  gameContainer.appendChild(startArea);

  const endArea = document.createElement("div");
  endArea.id = "endArea";
  endArea.style.position = "absolute";
  endArea.style.left = "6%";
  endArea.style.bottom = "5%";
  endArea.style.width = "10%";
  endArea.style.height = "10%";
  endArea.style.backgroundColor = "green";
  endArea.style.display = "none"
  gameContainer.appendChild(endArea);

  // Start game
  gameContainer.addEventListener("mousemove", (event) => {
    const walls = document.querySelectorAll(".maze-wall");
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Check collision
    let isColliding = false;
    walls.forEach((wall) => {
      const rect = wall.getBoundingClientRect();
      if (
        mouseX > rect.left &&
        mouseX < rect.right &&
        mouseY > rect.top &&
        mouseY < rect.bottom
      ) {
        isColliding = true;
      }
    });

    if (isColliding) {
      // alert("You lost!")
      gameStarted = false
      gameContainer.remove()
      startMazeGame()
      // window.location.reload();
    }

    // Check if reached the end
    const endRect = endArea.getBoundingClientRect();
    if (
      mouseX > endRect.left &&
      mouseX < endRect.right &&
      mouseY > endRect.top &&
      mouseY < endRect.bottom && gameStarted
    ) {
      const gameContainer = document.getElementById("gameContainer")
      gameContainer.remove()
      localStorage.setItem("mazelvl2", "true");
      location.reload();
    }

    const startRect = startArea.getBoundingClientRect();
    if (
      mouseX > startRect.left &&
      mouseX < startRect.right &&
      mouseY > startRect.top &&
      mouseY < startRect.bottom
    ) {
      gameStarted = true
      endArea.style.display = "block"
      startArea.style.display = "none"
    }
  });
}
