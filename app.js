//
const weightInput = document.getElementById('weight');
const calculate = document.querySelectorAll('button');
const caloriesTotal = document.querySelector('.calories-total');
const caloricCarb = document.getElementById('calculation-c');
const caloricProtein = document.getElementById('calculation-p');
const caloricFat = document.getElementById('calculation-f');
const percentCarb = document.getElementById('percentage-c');
const percentProtein = document.getElementById('percentage-p');
const percentFat = document.getElementById('percentage-f');
const hiddenSections = document.querySelectorAll('.hide-cntr');
const navItems = document.querySelectorAll('.nav-item');

const regex = /^(0|[1-9]\d*)(\.\d+)?$/;

caloriesTotal.textContent = '2000';
caloricCarb.textContent = "0";
caloricProtein.textContent = "0";
caloricFat.textContent = "0";
percentCarb.textContent = "0";
percentProtein.textContent = "0";
percentFat.textContent = "0";

const adjustOptions = document.querySelectorAll('.adjust-selection');

let weightValues = [];
let weightTotalPerDay;
let carbTotal;
let proteinTotal;
let fatTotal;

// START EVENT LISTENERS
//listen for navigation
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        showActive(e.currentTarget);
        console.log(e.currentTarget)
    });
});

//listen to weight input update
weightInput.addEventListener('keypress', function(e) {
    //validate valid weight submitted
    if (e.key === "Enter") {
        if (regex.test(e.target.value)) {
            weightValues.pop();
            const weightInfo = {
                weight: e.target.value,
                cut: {
                    total: Math.round(e.target.value*12),
                    carb() {
                        return Math.round((this.total*.4)/4);
                    },
                    protein() {
                        return Math.round((this.total*.4)/4);
                    },
                    fat() {
                        return Math.round((this.total*.2)/9);
                    }
                },
                maintain: {
                    total: Math.round(e.target.value*15),
                    carb() {
                        return Math.round((this.total*.5)/4);
                    },
                    protein() {
                        return Math.round((this.total*.2)/4);
                    },
                    fat() {
                        return Math.round((this.total*.3)/9);
                    }
                },
                bulk: {
                    total: Math.round(e.target.value*18),
                    carb() {
                        return Math.round((this.total*.5)/4);
                    },
                    protein() {
                        return Math.round((this.total*.15)/4);
                    },
                    fat() {
                        return Math.round((this.total*.35)/9);
                    }
                }
            };
            weightValues.push(weightInfo);
            updateValue(e);
        } else {
            alert("Please only enter integers. Only one decimal is allowed")
        }
    }
});
//listen for meals per day adjuster
adjustOptions.forEach(option => {
    option.addEventListener('click', adjustMeals);
});
//listen to click for calculate
calculate.forEach(btn => {
    btn.addEventListener('click', (e)=> {
        calculateCal(e);
    });
});
// END EVENT LISTENERS

//function to calculate calories
function calculateCal(e) {
    if (e.target.id === 'cut') {
        carbTotal = weightValues[0].cut.carb();
        proteinTotal = weightValues[0].cut.protein();
        fatTotal = weightValues[0].cut.fat();
        weightTotalPerDay = weightValues[0].cut.total;
        caloriesTotal.textContent = weightTotalPerDay;
        caloricCarb.textContent = carbTotal;
        caloricProtein.textContent = proteinTotal;
        caloricFat.textContent = fatTotal;

        percentCarb.textContent = 40;
        percentProtein.textContent = 40;
        percentFat.textContent = 20;
    }
    if (e.target.id === 'maintain') {
        carbTotal = weightValues[0].maintain.carb();
        proteinTotal = weightValues[0].maintain.protein();
        fatTotal = weightValues[0].maintain.fat();
        weightTotalPerDay = weightValues[0].maintain.total;
        caloriesTotal.textContent = weightTotalPerDay;
        caloricCarb.textContent = carbTotal;
        caloricProtein.textContent = proteinTotal;
        caloricFat.textContent = fatTotal;
        
        percentCarb.textContent = 50;
        percentProtein.textContent = 20;
        percentFat.textContent = 30;
    }
    if (e.target.id === 'bulk') {
        carbTotal = weightValues[0].bulk.carb();
        proteinTotal = weightValues[0].bulk.protein();
        fatTotal = weightValues[0].bulk.fat();
        weightTotalPerDay = weightValues[0].bulk.total;
        caloriesTotal.textContent = weightTotalPerDay;
        caloricCarb.textContent = carbTotal;
        caloricProtein.textContent = proteinTotal;
        caloricFat.textContent = fatTotal;

        percentCarb.textContent = 50;
        percentProtein.textContent = 15;
        percentFat.textContent = 35;
    }
};

//function to update weight value
function updateValue(e) {
    weightInput.setAttribute('value', e.target.value);
};

const calorieHeader = document.querySelector(".calories-header h2");

//function to show values of macros per meal
function adjustMeals(e) {
    if (e.target.textContent === "All") {
        calorieHeader.textContent = "Calories Per Day";
        caloriesTotal.textContent = weightTotalPerDay;
    } else {
        calorieHeader.textContent = "Calories Per Meal";
    }
    if (e.target.textContent === "3") {
        caloriesTotal.textContent = weightTotalPerDay/3;
        caloricCarb.textContent = Math.round(carbTotal/3);
        caloricProtein.textContent = Math.round(proteinTotal/3);
        caloricFat.textContent = Math.round(fatTotal/3);
    }
    if (e.target.textContent === "4") {
        caloriesTotal.textContent = weightTotalPerDay/4;
        caloricCarb.textContent = Math.round(carbTotal/4);
        caloricProtein.textContent = Math.round(proteinTotal/4);
        caloricFat.textContent = Math.round(fatTotal/4);
    }
    if (e.target.textContent === "5") {
        caloriesTotal.textContent = weightTotalPerDay/5;
        caloricCarb.textContent = Math.round(carbTotal/5);
        caloricProtein.textContent = Math.round(proteinTotal/5);
        caloricFat.textContent = Math.round(fatTotal/5);
    }
}
//show active navigation tab
function showActive(e) {
    hiddenSections.forEach(section => {
    section.classList.remove('show-cntr');
    });
    if (e.textContent === "Log Items") {
        console.log(document.getElementById(e.textContent.trim()))
        document.getElementById(e.textContent.trim()).classList.add("show-cntr");
    }
    if (e.textContent === "Home") {
        console.log(document.getElementById(e.textContent.trim()))
        document.getElementById(e.textContent.trim()).classList.add("show-cntr");
    }
};

const formInputs = document.querySelectorAll('form input');
const foodInputCntr = document.querySelector('.food-input-wrapper');
const foodInput = document.querySelector('#data-food');
const foodCarb = document.querySelector('#data-carb');
const foodProtein = document.querySelector('#data-protein');
const foodFat = document.querySelector('#data-fat');
//save added food item into one
console.log(foodInputCntr.dataset)

//function to update weight value
function updateFood(e) {
    foodInputCntr.setAttribute('data-food', foodInput.value);
    foodInputCntr.setAttribute('data-carb', foodCarb.value);
    foodInputCntr.setAttribute('data-protein', foodProtein.value);
    foodInputCntr.setAttribute('data-fat', foodFat.value);
};

//listen to weight input update
formInputs.forEach(input => {
    input.addEventListener('click', function(e) {
        e.preventDefault();
        updateFood(e);
    });
});

const foodList = document.querySelector('.food-list');
const foodInputForm = document.querySelector('.food-input-cntr');
console.log(foodInputForm);
foodInputForm.addEventListener('submit', function(e) {
    console.log(foodInputCntr.dataset.food);
    e.preventDefault();
    const foodItem = document.createElement('li');
    foodItem.innerHTML = `
        <div class="food">
            <p>${foodInputCntr.dataset.food}</p>
        </div>
        <div class="item-macro-cntr">
            <div class="macro">
            ${foodInputCntr.dataset.carb}
            </div>
            <div class="macro">
            ${foodInputCntr.dataset.protein}
            </div>
            <div class="macro">
            ${foodInputCntr.dataset.fat}
            </div>
        </div>
        <button class="item-button" type="submit">
            <i class="fas fa-plus-square"></i>
        </button>
    `;
    console.log(foodItem);
    foodList.appendChild(foodItem);
});

// const buttons = document.querySelectorAll("[data-modal-id]")

// buttons.forEach(button => {
//   button.addEventListener("click", () => {
//     const modalId = button.dataset.modalId
//     const modal = document.getElementById(modalId)
//     modal.classList.add("show")
//   })
// })
