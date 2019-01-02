"use strict";
const log = console.log;

const send = document.querySelector('#send-button');
send.setAttribute("style", "width: 100px; margin-left: 10px;");

const validate = function () {
    const ver_input = document.querySelector('#ver-code');
    if (ver_input.value.length === 0) {
        alert("Verification code is required");
        return false;
    }
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


let times = 10;
let timer = null;
send.onclick = function () {
    timer = setInterval(function () {
        times--;
        if (times <= 0) {
            send.value = "Send";
            clearInterval(timer);
            times = 10;
            send.disabled = false;
        } else {
            send.value = times;
            send.disabled = true;
        }
    }, 1000);
    sendEmail();
};

/* AJAX fetch() calls */
function sendEmail() {
    const url = '/verify';
    if (document.querySelector('#newUsername').value.length === 0) {
        alert("Please enter the email address.");
        return false;
    } else if (!validateEmail(document.querySelector('#newUsername').value)) {
        alert("Invalid email address.");
        return false;
    }
    // The data we are going to send in our request
    const data = {
        email: document.querySelector('#newUsername').value
    };
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function(res) {
            const message = document.querySelector('#message');
            if (res.status === 200) {
                message.innerText = 'Success: Email is sent.';
                message.setAttribute("style", "color: green");
            } else {
                message.innerText = 'Failed, please try again.';
                message.setAttribute("style", "color: red");
            }
        }).catch((error) => {
            console.log(error);
        })
}