const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFormValid = true;

  // Required fields
  if (!checkRequired([username, email, password, confirmPassword])) {
    isFormValid = false;
  }

  // Field-specific checks
  if (!checkLength(username, 3, 15)) isFormValid = false;
  if (!checkEmail(email)) isFormValid = false;
  if (!checkLength(password, 6, 25)) isFormValid = false;
  if (!checkPasswordsMatch(password, confirmPassword)) isFormValid = false;

  if (isFormValid) {
    alert("Registration successful!");
    form.reset();

    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
      group.querySelector("small").innerText = "";
    });
  }
});

function checkRequired(inputs) {
  let valid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      valid = false;
    }
  });

  return valid;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters`,
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be less than ${max} characters`,
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(input) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(input.value.trim())) {
    showError(input, "Email is not valid");
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPasswordsMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    return false;
  } else {
    showSuccess(confirmPassword);
    return true;
  }
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  formGroup.querySelector("small").innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  formGroup.querySelector("small").innerText = "";
}

function formatFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
