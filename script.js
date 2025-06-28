const form = document.getElementById("ticketForm");
const mainContent = document.getElementById("mainContent");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clearing old errors
  form.querySelectorAll(".error-message").forEach(el => el.textContent = "");

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const avatar = document.getElementById("file-upload").files[0];
  let hasError = false;

  if (!name) {
    showError("fullName", "Name is required.");
    hasError = true;
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    showError("fullName", "Letters and spaces only.");
    hasError=true;
  }

  if (!email) {
    showError("email", "Email is required.");
    hasError = true;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError("email", "Invalid email format.");
    hasError = true;
  }

  if (!avatar) {
    showError("file-upload", "Avatar required.");
    hasError = true;
  } else if (!["image/png", "image/jpeg"].includes(avatar.type)) {
    showError("file-upload", "PNG or JPEG only.");
    hasError = true;
  } else if (avatar.size > 500 * 1024) {
    showError("file-upload", "Max 500KB.");
    hasError = true;
  }

  if (hasError) return;

  const ticketNumber = `TCKT-${Math.floor(1000 + Math.random() * 9000)}`;

  const reader = new FileReader();
  reader.onload = function (event) {
   
    mainContent.innerHTML = `
  <div class="ticket-container">
    <h1>Congrats, <span style="color:#ff7675">${name}</span>!<br>Your ticket is ready.</h1>
    <p class="ticket-subtext">We’ve emailed your ticket to <strong>${email}</strong> and will send updates in the run up to the event.</p>
    <div class="ticket-card">
      <img src="${event.target.result}" alt="Avatar" class="avatar"/>
      <div class="ticket-details">
        <h2>Coding Conf</h2>
        <h2>${name}</h2>
        <p>${email}</p>
        <p class="event-info">31 June 2025 | Austin, Tx</p>
        <p class="ticket-id">${ticketNumber}</p>
      </div>
    </div>
  </div>
`;
  };
  reader.readAsDataURL(avatar);
});

function showError(fieldId, message) {
  let errorSpan;
  switch(fieldId) {
    case "file-upload":
      errorSpan = document.getElementById("avatarError");
      break;
    case "fullName":
      errorSpan = document.getElementById("fullNameError");
      break;
    case "email":
      errorSpan = document.getElementById("emailError");
      break;
    default:
      
      const field = document.getElementById(fieldId);
      errorSpan = field.parentElement.querySelector(".error-message");
  }

  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

function updateFileName() {
  const input = document.getElementById("file-upload");
  const display = document.getElementById("fileNameDisplay");
  if (input.files.length > 0) {
    display.textContent = input.files[0].name;
  } else {
    display.textContent = "";
  }
}