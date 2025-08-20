// COMMON VALIDATION LOGIC
export function validateForm(formType) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const nameRegex = /^[A-Z][a-zA-Z]{2,30}$/;

    let isValid = true;

    const email = document.querySelector(`#${formType}Email`);
    const password = document.querySelector(`#${formType}Password`);
    const firstName = document.querySelector(`#${formType}FirstName`);
    const lastName = document.querySelector(`#${formType}LastName`);
    const phone = document.querySelector(`#${formType}Phone`);
    const confirmPassword = document.querySelector(`#${formType}ConfirmPassword`);

    const emailError = document.querySelector(`#${formType}EmailError`);
    const passwordError = document.querySelector(`#${formType}PasswordError`);
    const firstNameError = document.querySelector(`#${formType}FirstNameError`);
    const lastNameError = document.querySelector(`#${formType}LastNameError`);
    const confirmPasswordError = document.querySelector(`#${formType}ConfirmPasswordError`);

    // Reset errors
    if (emailError) emailError.style.display = "none";
    if (passwordError) passwordError.style.display = "none";
    if (firstNameError) firstNameError.style.display = "none";
    if (lastNameError) lastNameError.style.display = "none";
    if (confirmPasswordError) confirmPasswordError.style.display = "none";

    if (!emailRegex.test(email?.value || "")) {
        if (emailError) {
            emailError.textContent = "Invalid email";
            emailError.style.display = "initial";
            emailError.style.color = "red";
        }
        isValid = false;
    }

    if (!passwordRegex.test(password?.value || "")) {
        if (passwordError) {
            passwordError.textContent =
                "Password must be at least 8 characters with uppercase, number, special char.";
            passwordError.style.display = "initial";
            passwordError.style.color = "red";
        }
        isValid = false;
    }

    if (formType === "register") {
        if (!nameRegex.test(firstName?.value || "")) {
            if (firstNameError) {
                firstNameError.textContent = "First name must start with capital and be 3+ letters.";
                firstNameError.style.display = "initial";
                firstNameError.style.color = "red";
            }
            isValid = false;
        }

        if (!nameRegex.test(lastName?.value || "")) {
            if (lastNameError) {
                lastNameError.textContent = "Last name must start with capital and be 3+ letters.";
                lastNameError.style.display = "initial";
                lastNameError.style.color = "red";
            }
            isValid = false;
        }

        if (password?.value !== confirmPassword?.value) {
            if (confirmPasswordError) {
                confirmPasswordError.textContent = "Passwords do not match";
                confirmPasswordError.style.display = "initial";
                confirmPasswordError.style.color = "red";
            }
            isValid = false;
        }
    }

    return { isValid, firstName, lastName, email, phone, password };
}
