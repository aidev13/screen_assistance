// Define the HTML content as a string
const htmlContent = `
           <div id="draggable" class="screen-assistance-container noShow">
               <h6 class="noShow margin_fix">Screen Assistance</h6>
               <label for="borderCheck" id="checkBox" class="noShow">
                   <input type="checkbox" id="borderCheck" class="noShow"> Hovered borders
               </label>
               <label for="allBorderCheck" id="allCheckBox" class="noShow">
                   <input type="checkbox" id="allBorderCheck" class="noShow"> All borders
               </label>
               <div id="size" class="noShow"></div>
               <div id="getName" class="noShow"></div>
           </div>
           `;

// Set the HTML content to an element using innerHTML
document.getElementById("screen_assistance").innerHTML = htmlContent;

//  Gets the size of the screen in width (W) and height (H).
let size = document.getElementById("size");

const updateSize = () => {
  size.innerHTML =
    "<p class='noShow margin_fix'> Screen W: " +
    window.innerWidth +
    ", H: " +
    window.innerHeight +
    "</p>";
};

updateSize();
window.addEventListener("resize", updateSize);

// Get the #id and/or .className when hovered over
let elName = document.getElementById("getName");
const checkBox = document.getElementById('borderCheck');

window.addEventListener("mouseover", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const id = e.target.id ? `#${e.target.id}` : "";
  const className = e.target.className
    ? `.${e.target.className.split(" ").join(".")}`
    : "";

  if (e.target.classList.contains("noShow")) {
    elName.innerText = "";
  } else elName.innerText = `Element: ${tagName}${id}${className}`;

  // Check to see if user wants a border on or off
  if (checkBox.checked) {
    if (e.target.classList.contains("noShow")) {
      e.target.classList.remove("hovered-element");
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

// to put a border around all elements without hovering

// const allBorders = document.querySelectorAll("*");
// const allCheckBox = document.getElementById('allBorderCheck')

// allCheckBox.addEventListener('click', () => {
//    if (allCheckBox.checked) {

//       allBorders.forEach((element) => {
//           if (element.classList.contains('noShow')) {
//               element.style.border = 'none';
//           } else {
//             element.style.boxShadow = 'rgb(0, 145, 255) 0px 0px 0px 1px';

//           }
//       });
//     } else allBorders.forEach((element) => {
//       element.style.border = 'none'
//     })
// })




// --- --- --- --- ---

// Make it draggable
const draggable = document.getElementById("draggable");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// Load position from sessionStorage
const savedLeft = sessionStorage.getItem("draggableLeft");
const savedTop = sessionStorage.getItem("draggableTop");

if (savedLeft !== null && savedTop !== null) {
  draggable.style.left = `${savedLeft}px`;
  draggable.style.top = `${savedTop}px`;
}

// Load checkbox state from sessionStorage
const savedCheckboxState = sessionStorage.getItem("checkboxState");
if (savedCheckboxState !== null) {
  checkBox.checked = JSON.parse(savedCheckboxState);
}

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

    // Save position to sessionStorage
    sessionStorage.setItem("draggableLeft", left);
    sessionStorage.setItem("draggableTop", top);
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;

    // Reset cursor style
    draggable.style.cursor = "grab";
  }
});

// Save checkbox state to sessionStorage when it changes
checkBox.addEventListener("change", () => {
  sessionStorage.setItem("checkboxState", checkBox.checked);
});
