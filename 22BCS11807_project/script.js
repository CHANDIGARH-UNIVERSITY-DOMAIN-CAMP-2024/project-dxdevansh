const emailData = [
    { id: 1, subject: "Welcome!", content: "Welcome to EmailManager!" },
    { id: 2, subject: "Meeting Reminder", content: "Don't forget the meeting tomorrow at 10 AM." },
];

const emailsList = document.getElementById("emails");
const emailDetails = document.querySelector(".email-details");
const emailContent = document.getElementById("email-content");
const backBtn = document.getElementById("back-btn");
const composeBtn = document.getElementById("compose-btn");
const composeModal = document.getElementById("compose-modal");
const closeModal = document.getElementById("close-modal");
const composeForm = document.getElementById("compose-form");

// Function to render the list of emails
function renderEmails() {
    emailsList.innerHTML = "";
    emailData.forEach((email) => {
        const li = document.createElement("li");
        li.textContent = email.subject;
        li.onclick = () => viewEmail(email.id);
        emailsList.appendChild(li);
    });
}

// Function to display email details
function viewEmail(id) {
    const email = emailData.find((email) => email.id === id);
    emailContent.textContent = email.content;
    document.querySelector(".email-list").classList.add("hidden");
    emailDetails.classList.remove("hidden");
}

// Go back to the email list
backBtn.onclick = () => {
    emailDetails.classList.add("hidden");
    document.querySelector(".email-list").classList.remove("hidden");
};

// Check if "Compose Email" is enabled
if (composeBtn) {
    composeBtn.classList.remove("hidden");

    // Open the compose email modal
    composeBtn.onclick = () => {
        composeModal.classList.remove("hidden");
    };

    // Close the compose email modal when clicking the close button
    closeModal.onclick = () => {
        composeModal.classList.add("hidden");
    };

    // Close the compose email modal when clicking outside the modal content
    window.onclick = (event) => {
        if (event.target === composeModal) {
            composeModal.classList.add("hidden");
        }
    };

    // Handle form submission for composing emails
    composeForm.onsubmit = (e) => {
        e.preventDefault();

        // Get form values
        const to = document.getElementById("to").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Add the new email to the email data array
        if (subject || message) {
            emailData.push({ id: emailData.length + 1, subject, content: message });
            renderEmails();
        }

        // Close the modal and reset the form
        composeModal.classList.add("hidden");
        composeForm.reset();
    };
}

// Initial rendering of emails
renderEmails();
