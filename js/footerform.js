let reponse;
var CaptchaCallback = function () {
    grecaptcha.render('captcha1', { 'sitekey': '6LfFbMcoAAAAALrPpcPEwPkvZrKnhNZU9s4Bg2ud' });
    grecaptcha.render('captcha2', { 'sitekey': '6LfFbMcoAAAAALrPpcPEwPkvZrKnhNZU9s4Bg2ud' });

};


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("footer-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const isValid = validateFooterForm(); // Check for validation errors
        response = grecaptcha.getResponse(1)
        console.log(response, 'response');
        if (isValid) {
            if (response != "") {
                sendFooterEmail(); // Send email if the form is valid and reCAPTCHA is checked
            } else {
                alert("Please complete the reCAPTCHA challenge before submitting the form.");
            }
        }
    });

    const inputFields = form.querySelectorAll("input[type='email']");
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

function recaptchaFooterCallback() {
    const submitButton = document.getElementById("submit-footer-button");
    submitButton.removeAttribute("disabled");
}

function validateFooterForm() {
    const email = document.getElementById("footer-email").value;

    const emailError = document.getElementById("footer-email-error");

    // Regular expression for email validation
    const emailPattern = /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/;

    // Reset error messages
    emailError.textContent = "";

    let isValid = true;

    if (email === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!email.match(emailPattern)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    return isValid; // Return the validation status
}

function sendFooterEmail() {

    const email = document.getElementById("footer-email").value;

    let params = {
        mail_type: "email_footer",
        email_id: email,
        timestamp: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })
    }

    fetch('http://asvithoughtworks.com/mail/index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            if (!response.ok) {
                alert("Failed to send mail")
                throw new Error("Failed to send mail");
            }
            else {
                document.querySelector('body').style.overflow = "hidden";
                overlay.classList.remove("hide")
                document.getElementById("footer-email").value = ""
                recaptchaFooterCheckbox = ""
            }
        })

}

function CancelPopup() {
    overlay.classList.add("hide")
    document.querySelector('body').style.overflow = "scroll";
}