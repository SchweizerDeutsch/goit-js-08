import throttle from "lodash.throttle";

function saveFormData() {
    const emailInput = document.querySelector('input[name="email"]')
    const messageInput = document.querySelector('textarea[name="message"]')

    const formData = {
        email: emailInput.value,
        message: messageInput.value
    }

    localStorage.setItem("feedback-form-state", JSON.stringify(formData))
}

const feedbackFormData = document.querySelector(".feedback-form")
feedbackFormData.addEventListener("input", throttle(saveFormData, 500))

function loadFormData() {
    const storerData = localStorage.getItem("feedback-form-state")
    if (storerData){
        const formData = JSON.parse(storerData)
        const emailInput = document.querySelector('input[name="email"]')
        const messageInput = document.querySelector('textarea[name="message"]')

        emailInput.value = formData.email
        messageInput.value = formData.message
    }
}

window.addEventListener("load", loadFormData)

function handleSubmit(event){
    event.preventDefault()
    const storerData = localStorage.getItem("feedback-form-state")
    if(storerData){
        const formData = JSON.parse(storerData)
        console.log(storerData)
    }

    localStorage.removeItem("feedback-form-state")
    event.target.reset()
}

feedbackFormData.addEventListener("submit", handleSubmit)
