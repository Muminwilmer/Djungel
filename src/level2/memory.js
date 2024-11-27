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
  if (localStorage.getItem("memorylvl2")){
    doorArea.style.cursor = "not-allowed";
    doorArea.removeEventListener("click", startGame);
  }else{
    doorArea.addEventListener("click", startGame);
  }
  
}

let currentCardIndex = 0;
let amountOfCards = 0
let shuffledCards = []

const cards = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "pink",
  "brown",
  "black",
  "cyan",
];


async function startGame() {
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
  gameContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
  gameContainer.style.padding = "10px";

  imageContainer.appendChild(gameContainer);

  // Create the cards
  shuffledCards = cards.map((src, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.flipped = "false";
    card.style.position = "relative";
    card.style.width = "100%";
    card.style.paddingBottom = "100%"; // Square aspect ratio
    card.style.backgroundColor = "#ccc";
    card.style.cursor = "pointer";
    card.style.border = "1px solid #000";

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

    card.appendChild(colorCubes);
    gameContainer.appendChild(card);

    // Add click event to flip the card
    card.addEventListener("click", () => flipCard(card, true));
    return card;
  });

  shuffleArray(shuffledCards)
  shuffledCards.forEach((card, index) => {
    card.dataset.pickIndex = index
  });

  await showCards()

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

function flipCard(card, isClick) {
  const colorCubes = card.querySelector("div");
  const isFlipped = card.dataset.flipped === "true";

  // If it's flipped and player clicks
  if (!isFlipped && isClick){
    if (document.getElementById("showAgain")){
      document.getElementById("showAgain").remove()
    }
    checkOrder(card);
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function showCards(){
  // const cardsList = Array.from(document.querySelectorAll(`[class*="card"]`))

  await new Promise((resolve) => setTimeout(resolve, 800));
  for (const card of shuffledCards) {
    flipCard(card, false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    flipCard(card, false);
  }
}

function checkOrder(card) {
  // Compare the clicked card's pickIndex with the current correct index
  const pickedIndex = card.dataset.pickIndex;
  console.log(pickedIndex, currentCardIndex)
  if (pickedIndex == currentCardIndex) {
    console.log("Correct card!");

    // Update to next expected pickIndex
    currentCardIndex++;
    if (currentCardIndex>=cards.length){
      const gameContainer = document.getElementById("gameContainer")
      gameContainer.remove()
      localStorage.setItem("memorylvl2", "true");
      setUpMemory()
      // alert("You won!")
    }
  } else {
    console.log("Incorrect order! Game Over.");
    resetGame(); 
  }
}

function resetGame(){
  const gameContainer = document.getElementById("gameContainer")
  gameContainer.remove()
  startGame()
}