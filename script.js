// Define the HTML content as a string
const htmlContent = `
           <div id="draggable" class="screen-assistance-container noShow">
               <h6 class="noShow margin_fix">Screen Assistance</h6>

               <label for="hoveredBorders_input" id="hoverBordersCheckBox_label" class="noShow">
                   <input type="checkbox" id="hoveredBorders_input" class="noShow"> Hovered borders
               </label>

               <label for="allBorders_input" id="allBordersCheckBox_label" class="noShow">
                   <input type="checkbox" id="allBorders_input" class="noShow"> All borders
               </label>

               <div id="size" class="noShow"></div>
               <div id="getName" class="noShow"></div>
           </div>
           `;

// Set the HTML content to an element using innerHTML
document.getElementById("screen_assistance").innerHTML = htmlContent;

/* === === === VARIABLES === === === */

let size = document.getElementById("size");
let elName = document.getElementById("getName");
const hoverBordersCheckBox_label = document.getElementById(
  "hoverBordersCheckBox_label"
);
const hoveredBorders_input = document.getElementById("hoveredBorders_input");
const allBordersCheckBox_label = document.getElementById(
  "allBordersCheckBox_label"
);
const allBorders_input = document.getElementById("allBorders_input");
const allBorders_selected = document.querySelectorAll("*:not(.noShow)"); // Select all except those with noShow class

/* === === === SCREEN SIZE AND ELEMENT DISPLAY CODE === === === */

//  Gets the size of the screen in width (W) and height (H).
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

window.addEventListener("mouseover", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const id = e.target.id ? `#${e.target.id}` : "";
  const className = e.target.className
    ? `.${e.target.className.split(" ").join(".")}`
    : "";

  if (e.target.classList.contains("noShow")) {
    elName.innerText = "";
  } else elName.innerText = `Element: ${tagName}${id}${className}`;
});

/* === === === PREVENT LABEL FROM CHECKING CHECK BOX === === === */
// Keeps the user from clicking the label to check the checkboxes and allows for cursor to change styles (grab and grabbing)

window.addEventListener("mouseover", () => {
  hoverBordersCheckBox_label.addEventListener("click", (e) => {
    if (e.target !== hoveredBorders_input) {
      e.preventDefault();
    }
  });

  hoverBordersCheckBox_label.addEventListener("mouseup", () => {
    hoverBordersCheckBox_label.style.cursor = "grab";
  });

  hoverBordersCheckBox_label.addEventListener("mousedown", () => {
    hoverBordersCheckBox_label.style.cursor = "grabbing";
  });

  allBordersCheckBox_label.addEventListener("click", (e) => {
    if (e.target !== allBorders_input) {
      e.preventDefault();
    }
  });

  allBordersCheckBox_label.addEventListener("mouseup", () => {
    allBordersCheckBox_label.style.cursor = "grab";
  });

  allBordersCheckBox_label.addEventListener("mousedown", () => {
    allBordersCheckBox_label.style.cursor = "grabbing";
  });
});

/*  === === === CHECK BOX CODE === === === */

// Check to see if user wants a border on or off
const hovering = () => {
  window.addEventListener("mouseover", (e) => {
    if (hoveredBorders_input.checked) {
      if (e.target.classList.contains("noShow")) {
        e.target.classList.remove("hovered-element");
      } else e.target.classList.add("hovered-element");
    }
  });
};
// Remove border when mouse leaves the element
const removerHoveredBorder = () => {
  window.addEventListener("mouseout", (e) => {
    e.target.classList.remove("hovered-element");
  });
};

hovering();
removerHoveredBorder();

const addAllBorders = () => {
  allBorders_selected.forEach((element) => {
    element.style.boxShadow = "0 0 0 1px rgb(0, 145, 255)";
    element.classList.add("borderOn");
  });
};

const removeAllBorders = () => {
  allBorders_selected.forEach((element) => {
    element.style.boxShadow = "none";
    element.classList.remove("borderOn");
  });
};
// to put a border around all elements without hovering
allBorders_input.addEventListener("change", (e) => {
  if (allBorders_input.checked) {
    addAllBorders();
  } else {
    removeAllBorders();
  }
});

window.addEventListener("mouseover", (e) => {
  if (
    allBorders_input.checked &&
    hoveredBorders_input.checked &&
    e.target.classList.contains("borderOn")
  ) {
    e.target.classList.add("hovered-bg-color");
  }
});

window.addEventListener("mouseout", (e) => {
  if (
    allBorders_input.checked &&
    hoveredBorders_input.checked &&
    e.target.classList.contains("borderOn")
  ) {
    e.target.classList.remove("hovered-bg-color");
  }
});

/* === === === DRAGGABLE CODE === === === */

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

/* === === === SESSION STORAGE CODE === === === */

// Load position from sessionStorage
const savedLeft = sessionStorage.getItem("draggableLeft");
const savedTop = sessionStorage.getItem("draggableTop");

if (savedLeft !== null && savedTop !== null) {
  draggable.style.left = `${savedLeft}px`;
  draggable.style.top = `${savedTop}px`;
}

// Load checkbox state from sessionStorage
const savedCheckboxState = sessionStorage.getItem("checkboxState");
const savedAllCheckboxState = sessionStorage.getItem("allcheckboxState");

if (savedCheckboxState !== null) {
  hoveredBorders_input.checked = JSON.parse(savedCheckboxState);
  if (hoveredBorders_input.checked) {
    hovering();
  } else removerHoveredBorder();
}

if (savedAllCheckboxState !== null) {
  allBorders_input.checked = JSON.parse(savedAllCheckboxState);
  if (allBorders_input.checked) {
    addAllBorders();
  }
}

// Save checkbox state to sessionStorage when it changes
hoveredBorders_input.addEventListener("change", () => {
  sessionStorage.setItem("checkboxState", hoveredBorders_input.checked);
});

allBorders_input.addEventListener("change", () => {
  sessionStorage.setItem("allcheckboxState", allBorders_input.checked);
});
