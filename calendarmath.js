let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let state = 0
let year
let month
let day
let running_value
let step1
let step2
let step3
let score = 0
let audio = new Audio('./ding.mp3')
let bad_audio = new Audio('./error.mp3')
let win_sound = new Audio('./winner.mp3')

document.addEventListener('DOMContentLoaded', () => {
    let input = document.querySelector('.answer')
    let running_count = document.querySelector('.running_count')
    input.addEventListener('keyup', (event) => {
        if (event.key === "Enter"){
            let answer = input.value
            if (state === 0){
                document.querySelector('.running_count').style.color = "black"
                running_count.innerHTML = "Ready"
                randomDate()
                state = 1
            }else if(state === 1){
                step1 = String(year).slice(-2)
                step1 = parseInt(step1)
                step1 = Math.floor(step1/4)
                running_count.innerHTML = answer
                
                if (parseInt(answer) === step1){
                    set_color(true)
                    state = 2
                    input.value = ""
                }else{
                    set_color(false)
                    bad_audio.play()
                    state = 0
                    score = 0
                    set_score(score)
                }
            }else if(state === 2){
                step2 = String(year).slice(-2)
                step2 = parseInt(step2)
                step2 = step2%7
                running_count.innerHTML = answer
                
                if (parseInt(answer) === step2){
                    set_color(true)
                    state = 3
                    input.value = ""
                }else{
                    set_color(false)
                    bad_audio.play()
                    state = 0
                    score = 0
                    set_score(score)
                }

            }else if(state === 3){
                step3 = (step1 + step2) % 7

                if (parseInt(answer) === step3){  
                    set_color(true)              
                    score ++
                    running_count.innerHTML = "Perfect"
                    if (score === 10){
                        running_count.innerHTML = "YOU'VE WON!"
                        running_count.style.fontSize = "50px"
                        running_count.style.color = "green"
                        win_sound.play()
                    }else{
                        audio.play()
                    }
                }else{
                    bad_audio.play()
                    score = 0
                    set_color(false)
                    running_count.innerHTML = answer
                }

                input.value = ""
                set_score(score)

                randomDate()
                state = 1
            }
        }
    })
})


function randomDate(){
    //YYYY-MM-DD format
    year = randomNumber(1900,2100)
    month = randomNumber(1, 12);
    day= randomNumber(1,30);
    let suffix

    if(day < 20 && day > 10){
        suffix = "th"
    }else if(day %10 === 1){
        suffix = "st"
    }else if (day %10 === 2){
        suffix = "nd"
    }else if (day %10 === 3){
        suffix = "rd"
    }else{
        suffix = "th"
    }

    month = months[month]

    document.querySelector('.date').innerHTML = `<div class="year">${year}</div><div class="day">${day}${suffix}</div><div class="month">${month}</div>`;
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

function set_color(bool){
    if (bool == true){
        document.querySelector('.running_count').style.color = "green"
    }else{
        document.querySelector('.running_count').style.color = "red"
    }
}

function set_score(score){
    let display =     document.querySelector('.score_display')
    display.innerHTML = score
    if (score > 0){
        display.style.color = "green"
    }else{
        display.style.color = "red"
    }
}