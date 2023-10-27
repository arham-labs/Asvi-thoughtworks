let overlay = document.getElementById("overlay");
// Serve static files (HTML)
let response1;
var CaptchaCallback = function() {
    grecaptcha.render('captcha1', {'sitekey' : '6LfFbMcoAAAAALrPpcPEwPkvZrKnhNZU9s4Bg2ud'});
    grecaptcha.render('captcha2', {'sitekey' : '6LfFbMcoAAAAALrPpcPEwPkvZrKnhNZU9s4Bg2ud'});
    
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const isValid = validateForm(); // Check for validation errors
        if (isValid) {
            // Ensure the reCAPTCHA is checked before sending the email
            response1 = grecaptcha.getResponse(0)
            console.log(response1,'response');
            if (isValid) {
                if (response1 != "") {
                    sendFooterEmail(); // Send email if the form is valid and reCAPTCHA is checked
                } else {
                    alert("Please complete the reCAPTCHA challenge before submitting the form.");
                }
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
    const Name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const NameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    // Regular expression for email validation
    const emailPattern = /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/;

    // Reset error messages
    NameError.textContent = "";
    emailError.textContent = "";

    let isValid = true;

    if (Name === "") {
        NameError.textContent = "Name is required.";
        isValid = false;
    }
    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!email.match(emailPattern)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    return isValid; // Return the validation status
}

function sendEmail() {
    console.log("click");
    const Name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const mailOptions = {
        name : Name,
        email: email, 
        timestamp : new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })
    };


    fetch('/mail.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailOptions),
    })
        .then(response => {
            if (!response.ok) {
                alert("Failed to send mail")
                throw new Error("Failed to send mail");
            }
            else {
                document.querySelector('body').style.overflow = "hidden";
                overlay.classList.remove("hide");
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                recaptchaCheckbox = "";
            }
        })
}

function CancelPopup() {
    overlay.classList.add("hide")
    document.querySelector('body').style.overflow = "scroll";
}

