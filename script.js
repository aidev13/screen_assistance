//  Gets the size of the screen in width (W) and height (H).
let size = document.getElementById("size");

function updateSize() {
  size.innerHTML =
    "<p class='noShow margin_fix'> Screen W: " +
    window.innerWidth +
    ", H: " +
    window.innerHeight +
    "</p>";
}

updateSize();
window.addEventListener("resize", updateSize);

// Get the #id and/or .className when hovered over
let elName = document.getElementById("getName");
const checkBox = document.querySelector("input");

window.addEventListener("mouseover", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const id = e.target.id ? `#${e.target.id}` : "";
  const className = e.target.className
    ? `.${e.target.className.split(" ").join(".")}`
    : "";

  if (e.target.classList.contains('noShow')) {
    elName.innerText = "";
  } else elName.innerText = `Element: ${tagName}${id}${className}`;

  // Check to see if user wants a border on or off
  if (checkBox.checked) {
    // Add border when element is hovered
    if (e.target.classList.contains('noShow')) {
      e.target.classList(null);
    } else e.target.classList.add("hovered-element");
  }

  // Keeps the user from clicking the label to check the checkbox and allows for cursor to change styles (grab and grabbing)
  const label = document.getElementById("checkBox");

  label.addEventListener("click", (event) => {
    if (event.target !== checkBox) {
      event.preventDefault();
    }
  });

  label.addEventListener("mouseup", () => {
    label.style.cursor = "grab";
  });

  label.addEventListener("mousedown", () => {
    label.style.cursor = "grabbing";
  });
});

// Remove border when mouse leaves the element
window.addEventListener("mouseout", (e) => {
  e.target.classList.remove("hovered-element");
});

// --- --- --- --- //

// Make it draggable
const draggable = document.getElementById("draggable");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

draggable.addEventListener("mousedown", (event) => {
  // Calculate the offset from the element's position
  offsetX = event.clientX - draggable.getBoundingClientRect().left;
  offsetY = event.clientY - draggable.getBoundingClientRect().top;
  isDragging = true;

  // Change cursor style for dragging
  draggable.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    // Prevent default behavior to avoid text selection
    event.preventDefault();

    // Calculate new position
    const left = event.clientX - offsetX;
    const top = event.clientY - offsetY;

    // Set new position
    draggable.style.left = `${left}px`;
    draggable.style.top = `${top}px`;
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;

    // Reset cursor style
    draggable.style.cursor = "grab";
  }
});
