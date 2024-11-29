async function addButtonDiv(doorAreaConfig) {
  let doorArea = document.getElementById(doorAreaConfig.element);

  if (!doorArea){
    console.log("Door area not found, creating new!")
    doorArea = document.createElement("div")
    doorArea.id = doorAreaConfig.element
    doorArea.className = "door-area"
    document.getElementById(doorAreaConfig.parentElement).appendChild(doorArea);
  }

  function updateDoorPosition() {
      const image = document.querySelector('.background-image');
      
      // Get natural image aspect ratio
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;
      const aspectRatio = naturalWidth / naturalHeight;

      // Get current image aspect ratio
      const currentWidth = image.offsetWidth;
      const currentHeight = image.offsetHeight;

      // Divide the difference and combine for zoom amount
      const widthStretch = currentWidth / naturalWidth;
      const heightStretch = currentHeight / naturalHeight;
      const zoomFactor = Math.max(0, (window.innerWidth-widthStretch) / (window.innerHeight-heightStretch) - aspectRatio)*80

      // Get door position from image size and zoomFactor
      const doorLeft = (doorAreaConfig.left / 100) * image.offsetWidth;
      const doorTop = (doorAreaConfig.top / 100) * image.offsetHeight/* + zoomFactor;*/

      // Set the door's position and size
      doorArea.style.left = `${doorLeft}px`;
      doorArea.style.top = `${doorTop}px`;
      doorArea.style.width = `${(doorAreaConfig.width / 100) * image.offsetWidth}px`;
      doorArea.style.height = `${(doorAreaConfig.height / 100) * image.offsetHeight/*+(zoomFactor)*/}px`;
  }

  // Get percentage from left and top (Coords for button)
  // document.addEventListener("mousemove", function(event) {
  //     const image = document.querySelector('.background-image');
  //     const imageRect = image.getBoundingClientRect();
      
  //     const percentageXFromLeft = ((event.clientX - imageRect.left) / imageRect.width) * 100;
  //     const percentageXFromTop = ((event.clientY - imageRect.top) / imageRect.height) * 100; // From the right

  //     console.log("Percentage from the left: " + percentageXFromLeft.toFixed(2) + "%");
  //     console.log("Percentage from the top: " + percentageXFromTop.toFixed(2) + "%");
  // });

  window.addEventListener("resize", updateDoorPosition);
  updateDoorPosition();
}