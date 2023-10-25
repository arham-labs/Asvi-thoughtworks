let overlay = document.getElementById("overlay");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const isValid = validateForm(); // Check for validation errors
        if (isValid) {
            // Ensure the reCAPTCHA is checked before sending the email
            const recaptchaCheckbox = grecaptcha.getResponse();
            if (recaptchaCheckbox !== "") {
                sendEmail(); // Send email if the form is valid and reCAPTCHA is checked
            } else {
                alert("Please complete the reCAPTCHA challenge before submitting the form.");
            }
        }
    });

    const inputFields = form.querySelectorAll("input[type='text'], input[type='email'], input[type='number']");
    inputFields.forEach(function (input) {
        input.addEventListener("input", function () {
            const errorId = input.id + "-error";
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = "";
            }
        });
    });

});

function recaptchaCallback() {
    const submitButton = document.getElementById("submit-button");
    submitButton.removeAttribute("disabled");
}

function validateForm() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const companyName = document.getElementById("company-name").value;
    const message = document.getElementById("message").value;

    const firstNameError = document.getElementById("first-name-error");
    const lastNameError = document.getElementById("last-name-error");
    const emailError = document.getElementById("email-error");
    const mobileError = document.getElementById("mobile-error");
    const companyNameError = document.getElementById("company-name-error");

    // Regular expression for email validation
    const emailPattern = /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/;

    // Reset error messages
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    mobileError.textContent = "";
    companyNameError.textContent = "";

    let isValid = true;

    if (firstName === "") {
        firstNameError.textContent = "First Name is required.";
        isValid = false;
    }

    if (lastName === "") {
        lastNameError.textContent = "Last Name is required.";
        isValid = false;
    }

    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!email.match(emailPattern)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    if (mobile === "") {
        mobileError.textContent = "Mobile number is required.";
        isValid = false;
    } else if (isNaN(mobile) || mobile.length !== 10) {
        mobileError.textContent = "Please enter a valid 10-digit mobile number.";
        isValid = false;
    }

    if (companyName === "") {
        companyNameError.textContent = "Company name is required.";
        isValid = false;
    }

    return isValid; // Return the validation status
}

function sendEmail() {
    (function(){
        emailjs.init("UQmFU3dXCFjA88dGL")
    })();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const companyName = document.getElementById("company-name").value;
    const message = document.getElementById("message").value;

    let params = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile : mobile,
        message: message,
        companyName: companyName,
        timestamp : new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })
    }
    let serviceID = "service_l1n6x5d";
    let templateID = "template_tifkpik";


    emailjs.send(serviceID, templateID, params).then(res => {
        document.querySelector('body').style.overflow = "hidden";
        overlay.classList.remove("hide")
        document.getElementById("first-name").value = ""
        document.getElementById("last-name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("mobile").value = ""
        document.getElementById("company-name").value = ""
        document.getElementById("message").value = ""
        recaptchaCheckbox = ""
    })
        .catch(error => {
            alert("Email sending failed: " + error);
        });
}

function CancelPopup() {
    overlay.classList.add("hide")
    document.querySelector('body').style.overflow = "scroll";
}