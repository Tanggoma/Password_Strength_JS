const meter = document.getElementById('meter');
const input = document.getElementById('input-pw');
const reasons = document.getElementById('reasons');

// Event listener 
input.addEventListener('input', updateMeter)
updateMeter(); // call function to show the meter once page load

// Update strength meter +// Event listener

function updateMeter() {
    const weaknesses = calPasswordStrength(input.value)

    let strength = 100 //start strength value

    reasons.innerHTML = ''

    weaknesses.forEach(weakness => {
        if (weakness == null) return
        strength -= weakness.deductScore

        const msgElm = document.createElement('div')
        msgElm.innerText = weakness.msg
        reasons.appendChild(msgElm)
    })
    //update meter by set property to CSS
    meter.style.setProperty('--strength', strength)

}


// create function calculate password strength

function calPasswordStrength(password) {
    const weaknesses = []
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowerCaseWeakness(password));
    weaknesses.push(upperCaseWeakness(password));
    weaknesses.push(numberWeakness(password));
    weaknesses.push(specialCharacterWeakness(password));
    weaknesses.push(repeatCharacterWeakness(password));
    return weaknesses
}

//check length of password 

function lengthWeakness(password) {
    const length = password.length
    if (length <= 3) {
        return {
            msg: 'Your password is too short',
            deductScore: 40
        }
    }

    if (length <= 10) {
        return {
            msg: 'Your password could be longer',
            deductScore: 20
        }
    }
}

function lowerCaseWeakness(password) {

    return characterWeakness(password, /[a-z]/g, 'lowercase characters')
}

function upperCaseWeakness(password) {

    return characterWeakness(password, /[A-Z]/g, 'uppercase characters')
}

function numberWeakness(password) {
    return characterWeakness(password, /[0-9]/g, 'numbers')
}
function specialCharacterWeakness(password) {
    return characterWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
}


function characterWeakness(password, regex, type) {
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return {
            msg: `Your password has no ${type}`,
            deductScore: 30
        }
    }
    if (matches.length <= 3) {
        return {
            msg: `Your password could use more of ${type}`,
            deductScore: 5
        }
    }
}

function repeatCharacterWeakness(password) {
    const matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
        return {
            msg: 'Your password has repeat characters',
            deductScore: matches.length * 10
        }
    }
}

