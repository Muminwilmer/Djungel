// script.js

document.addEventListener("DOMContentLoaded", function() {
  const doorArea = document.getElementById("door-area");

  // Define position and size
  const doorAreaConfig = {
      left: 44,   // Position from left of door
      top: 56,    // Position from top of door
      width: 8,  // Width of door
      height: 6  // Height of door
  };

  function updateDoorPosition() {
      const image = document.querySelector('.background-image');
      const imageRect = image.getBoundingClientRect();
      
      // Calculate door position based on the door area configuration and image size
      const doorLeft = (doorAreaConfig.left / 100) * imageRect.width;
      const doorTop = (doorAreaConfig.top / 100) * imageRect.height;

      // Set the door's position and size
      doorArea.style.left = `${doorLeft}px`;
      doorArea.style.top = `${doorTop}px`;
      doorArea.style.width = `${(doorAreaConfig.width / 100) * imageRect.width}px`;
      doorArea.style.height = `${(doorAreaConfig.height / 100) * imageRect.height}px`;
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
});
