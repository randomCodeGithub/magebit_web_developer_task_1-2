const checkbox = document.getElementById("terms");
const subscriptionBtn = document.getElementById("send-email");
const checkboxError = document.getElementById("check-box-error");
const emailError = document.getElementById("email-errors");
const subEmail = document.getElementById("subscriber-email");

let emailMessages = null;

function emailRegularExpression(email, regularExpression) {
  let re = regularExpression;
  return re.test(email);
}

function emailValidate() {
  const email = document.forms["subscribe"]["email"].value;

  if (!(email == "")) {
    if (
      !emailRegularExpression(
        email,
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      emailMessages = "Please provide a valid e-mail address";
      return false;
    } else {
      emailMessages = "";

      if (emailRegularExpression(email, /.co\s*$/)) {
        emailMessages =
          "We are not accepting subscriptions from Colombia emails";
        return false;
      }
    }
  } else {
    emailMessages = "Email address is required";
    return false;
  }
  return true;
}

function sendButtonStatus() {
  let isEmailPassed = emailValidate();
  let isCheckboxPassed = checkboxValidate();

  if (isEmailPassed && isCheckboxPassed) {
    subscriptionBtn.disabled = false;
    return true;
  }
  subscriptionBtn.disabled = true;
  return false;
}

function validate() {
  const subscriptionForm = document.getElementById("subscription");
  let subscribeArea = document.querySelector(".subscribe__area");
  const h2 = document.querySelector("h2");
  const p = document.querySelector(".description");
  if (!checkboxValidate()) {
    checkboxError.innerHTML = "You must accept theterms and conditions";
  }

  if (!emailValidate()) {
    emailError.innerHTML = emailMessages;
    return false;
  }
  subscriptionForm.remove();
  h2.remove();
  p.remove();
  createSuccessBlock();
  subscribeArea.classList.add("sended");
}

function checkboxValidate() {
  if (checkbox.checked) {
    return true;
  }
  return false;
}

checkbox.addEventListener("click", function () {
  if (checkboxValidate()) {
    checkboxError.innerHTML = "";
  }
  sendButtonStatus();
});

subEmail.addEventListener("input", function () {
  emailValidate();
  emailError.innerHTML = emailMessages;
  sendButtonStatus();
});

function createSuccessBlock() {
  let subscribeArea = document.getElementById("subscribe");
  let successBlockArea = document.createElement("div");
  let img = document.createElement("img");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let headerMessage = document.createTextNode("Thanks for subscribing!");
  let successDescription = document.createTextNode(
    "You have successfully subscribed to our email listing. Check your email for the discount code."
  );

  img.setAttribute("src", "./assets/img/cup.svg");

  successBlockArea.classList.add("success");
  h2.appendChild(headerMessage);
  p.classList.add("description");
  p.appendChild(successDescription);

  successBlockArea.appendChild(img);
  successBlockArea.appendChild(h2);
  successBlockArea.appendChild(p);

  subscribeArea.insertBefore(successBlockArea, subscribeArea.firstChild);
}
sendButtonStatus();

// document
//   .getElementById("subscription")
//   .addEventListener("submit", function (evt) {
//     evt.preventDefault();
//     validate();
//   });
