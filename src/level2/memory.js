function setUpMemory(){
  const memoryConfig = {
    left: 31,   // Position from left of door
    top: 56,    // Position from top of door
    width: 8,  // Width of door
    height: 24,  // Height of door
    element: "memoryGame", // Name of the element
    parentElement: "image-container"
  }

  addButtonDiv(memoryConfig);

  const doorArea = document.getElementById(memoryConfig.element);
  doorArea.addEventListener("click", preStartMemoryGame);
  doorArea.addEventListener("mousemove", checkIfHide);
}

function checkIfHide(){
  if (document.getElementById("gameContainer")){
    this.style.cursor = "default"
  }else{
    this.style.cursor = "pointer"
  }
}

let currentCardIndex = 0;
let amountOfCards = 0
let shuffledCards = []
let isFlashing = false;
const cards = [
  "#708238",
  "#0B6623",
  "#3F704D",
  "#004B49",
  "#3B7A57",
  "#29AB87",
  "#8F9779",
  "#50C878",
  // "cyan",
];
let memoryAudio
async function preStartMemoryGame() {
  if (document.getElementById("gameContainer")) return;
  if (document.getElementById("memoryAudio")) return;
  memoryAudio = document.createElement("audio");
  memoryAudio.id = "memoryAudio"

  memoryAudio.src = "../assets/puzzleMusic.mp3"
  memoryAudio.play()
  startMemoryGame()
}
async function startMemoryGame() {
  currentCardIndex = 0
  shuffledCards = []

  window.scrollTo(0, 0);

  const imageContainer = document.getElementById("image-container");


  // Create a game container
  const gameContainer = document.createElement("div");
  gameContainer.id = "gameContainer";
  gameContainer.style.position = "absolute"; // Keep this for absolute positioning
  gameContainer.style.top = "50%"; // Position from the top
  gameContainer.style.left = "50%"; // Position from the left
  gameContainer.style.transform = "translate(-50%, -50%)"; // Move the element back by half its size
  gameContainer.style.width = "40%";
  // gameContainer.style.height = "80%";
  gameContainer.style.backgroundColor = "#f9f9f9";
  gameContainer.style.border = "2px solid black";
  gameContainer.style.display = "grid";
  gameContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
  gameContainer.style.padding = "10px";
  gameContainer.style.borderRadius = "10px";
  gameContainer.style.background = "rgb(17,17,88)";
  gameContainer.style.background = "-moz-linear-gradient(35deg, rgba(17,17,88,1) 35%, rgba(0,212,255,1) 100%)";
  gameContainer.style.background = "-webkit-linear-gradient(35deg, rgba(17,17,88,1) 35%, rgba(0,212,255,1) 100%)";
  gameContainer.style.background = "linear-gradient(35deg, rgba(17,17,88,1) 35%, rgba(0,212,255,1) 100%)";
  gameContainer.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='#111158',endColorstr='#00d4ff',GradientType=1)";
  imageContainer.appendChild(gameContainer);

  // Create the cards
  shuffledCards = cards.map((src, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.flipped = "false";
    card.style.position = "relative";
    // card.style.width = "auto";
    // card.style.height = "auto";
    card.style.paddingBottom = "100%"; // Square aspect ratio
    // card.style.backgroundColor = "#ccc";
    const img = new Image();
    img.src = "../assets/card.png";

    img.onload = function () {
      card.style.width = `auto`;
      card.style.height = "auto"
      card.style.backgroundImage = `url('${img.src}')`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center center"
      card.style.maxWidth = "85%"
      card.style.maxHeight = "100%"
    };
    card.style.cursor = "pointer";
    card.style.border = "1px solid #000";
    card.style.borderRadius = "10px";
    card.style.margin = "5px";
    card.style.boxShadow = "3px 4px rgba(0, 0, 0, 1)"

    // Create a hidden image inside the card
    const colorCubes = document.createElement("div");
    colorCubes.style.backgroundColor = src;
    colorCubes.id = "colorCube";
    colorCubes.style.width = "100%";
    colorCubes.style.height = "100%";
    colorCubes.style.objectFit = "cover";
    colorCubes.style.position = "absolute";
    colorCubes.style.top = "0";
    colorCubes.style.left = "0";
    colorCubes.style.display = "none"; // Hidden by default
    colorCubes.style.borderRadius = "10px"; // Hidden by default

    card.appendChild(colorCubes);
    gameContainer.appendChild(card);

    // Add click event to flip the card
    card.addEventListener("click", () => flipMemoryCard(card, true));
    return card;
  });

  shuffleMemoryArray(shuffledCards)
  shuffledCards.forEach((card, index) => {
    card.dataset.pickIndex = index
  });

  await showMemoryCards()

  // const showAgain = document.createElement("button");
  // showAgain.innerHTML = "Show again"
  // showAgain.id = "showAgain"
  // showAgain.style.width = "300%"
  // showAgain.style.height = "fit-content"
  // showAgain.style.paddingTop = "10px"
  // showAgain.style.paddingBottom = "10px"

  // showAgain.addEventListener("click", showCards(false));
  
  gameContainer.appendChild(showAgain);
  imageContainer.appendChild(gameContainer);
}

function flipMemoryCard(card, isClick) {
  const colorCubes = card.querySelector("div");
  const isFlipped = card.dataset.flipped === "true";

  // If it's flipped and player clicks
  if (!isFlipped && isClick){
    if (isFlashing){
      console.log("Can't press now")
      return;
    }
    if (document.getElementById("showAgain")){
      document.getElementById("showAgain").remove()
    }
    checkMemoryOrder(card);
  }

  // If it's flipped but the show cards is flipping it
  if (isFlipped && !isClick) {
    console.log("Un-Flipping card");
    card.dataset.flipped = "false";

    colorCubes.style.display = "none";
  }else{
    // if not the one above
    console.log("Flipping card")
    card.dataset.flipped = "true";
  
    colorCubes.style.display = "block";
  }


}

function shuffleMemoryArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function showMemoryCards(){
  // const cardsList = Array.from(document.querySelectorAll(`[class*="card"]`))
  isFlashing = true
  await new Promise((resolve) => setTimeout(resolve, 800));
  for (const card of shuffledCards) {
    flipMemoryCard(card, false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    flipMemoryCard(card, false);
  }
  isFlashing = false
}

async function checkMemoryOrder(card) {
  // Compare the clicked card's pickIndex with the current correct index
  const pickedIndex = card.dataset.pickIndex;
  console.log(pickedIndex, currentCardIndex)
  if (pickedIndex == currentCardIndex) {
    console.log("Correct card!");

    // Update to next expected pickIndex
    currentCardIndex++;
    if (currentCardIndex>=cards.length){
      await new Promise((resolve) => setTimeout(resolve, 250));
      const gameContainer = document.getElementById("gameContainer")
      gameContainer.remove()
      localStorage.setItem("memorylvl2", "true");
      location.reload();
      // alert("You won!")
    }
  } else {
    console.log("Incorrect order! Game Over.");
    resetMemoryGame(); 
  }
}

function resetMemoryGame(){
  const gameContainer = document.getElementById("gameContainer")
  gameContainer.remove()
  startMemoryGame()
}