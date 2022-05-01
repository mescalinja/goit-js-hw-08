import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const inputEmail = document.querySelector("[name='email']")
const inputTxt = document.querySelector("[name='message'")

const KEY = "feedback-form-state";

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

let formData = {
    email: '',
    message: '',
};

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(KEY, JSON.stringify(formData));
};

function onPageReload() {
    const savedData = JSON.parse(localStorage.getItem(KEY));

    if (savedData) {
        inputEmail.value = savedData.email;
        inputTxt.value = savedData.message;

        formData.email = savedData.email;
        formData.message = savedData.message;
    }
};

onPageReload();

function onFormSubmit(e) {
    e.preventDefault();

    localStorage.removeItem(KEY);
    e.currentTarget.reset();

    console.log(formData)

    formData.email = '';
    formData.message = '';
};

