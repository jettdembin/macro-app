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
    });
});

weightInput.addEventListener('keypress', function(e) {
    //validate valid weight submitted
    if (e.key === "Enter") {
        if (regex.test(e.target.value)) {
            weightValues.pop();
            const weightInfo = {
                cut: {
                    total() {
                        weightTotalPerDay = Math.round(e.target.value*12);
                        caloriesTotal.textContent = weightTotalPerDay;
                        return
                    }
                },
                maintain: {
                    total() {
                        weightTotalPerDay = Math.round(e.target.value*15);
                        caloriesTotal.textContent = weightTotalPerDay;
                        return
                    }
                },
                bulk: {
                    total() {
                        weightTotalPerDay = Math.round(e.target.value*18);
                        caloriesTotal.textContent = weightTotalPerDay;
                        return
                    }
                }
            };
            weightValues.push(weightInfo);
            updateValue(e);
            console.log("hi")
        } else {
            alert("Please only enter integers. Only one decimal is allowed")
        }
    }
});
// [weightTotalPerDay, carbTotal, proteinTotal, fatTotal] = totalArray;

function totals(total, carb, protein, fat) {
    let totalArray = {  
        weightTotalPerDay: total,
        carbTotal() {
            return caloricCarb.textContent = carb;
        },
        proteinTotal() {
            return caloricProtein.textContent = protein;
        },
        fatTotal() {
            return caloricFat.textContent = fat;
        }
    }
    totalArray.carbTotal();
    totalArray.proteinTotal();
    totalArray.fatTotal();
    console.log(totalArray)
    return totalArray;
}; 

function value(type) {
    let percentCarb;
    let percentProtein;
    let percentFat;
    switch (type) {
        case "cut":
            percentCarb = .4;
            percentProtein = .4;
            percentFat = .2;
            totals(weightTotalPerDay, calcMacroTotal(weightTotalPerDay, percentCarb, carbsOrProteinFn), calcMacroTotal(weightTotalPerDay, percentProtein, carbsOrProteinFn), calcMacroTotal(weightTotalPerDay, percentFat, fatFn));
          break;
        case "maintain":
            percentCarb = .5;
            percentProtein = .2;
            percentFat = .3;
            totals(weightTotalPerDay, calcMacroTotal(weightTotalPerDay, percentCarb, carbsOrProteinFn), calcMacroTotal(weightTotalPerDay, percentProtein, carbsOrProteinFn), calcMacroTotal(weightTotalPerDay, percentFat, fatFn));
          break;
        case "bulk":
            percentCarb = .5;
            percentProtein = .15;
            percentFat = .35;
            totals(weightTotalPerDay, calcMacroTotal(weightTotalPerDay, percentCarb, carbsOrProteinFn), calcMacroTotal(weightTotalPerDay, percentProtein, carbsOrProteinFn), calcMacroTotal(weightTotalPerDay, percentFat, fatFn));
          break;
    }
}
let calcMacroTotal = function(weight, percentage, callback) {
    return callback(weight, percentage);
}
function carbsOrProteinFn(w, p) {
    return Math.round((w*p)/4);
}
function fatFn(w, p) {
    return Math.round((w*p)/9);
}

//function to update weight value
function updateValue(e) {
    weightInput.setAttribute('value', e.target.value);
};


//listen for meals per day adjuster
adjustOptions.forEach(option => {
    option.addEventListener('click', adjustMeals);
});
//listen to click for calculate
calculate.forEach(btn => {
    btn.addEventListener('click', (e)=> {
        displayCal(e);
    });
});
// END EVENT LISTENERS

const displayWeight = document.querySelector('.weight-input h1');
const displayGoal = document.querySelectorAll('.goal-header-cntr h2');

//function to display cuurent goal
function displayHeader(goal) {
    for (const header of displayGoal) {
        header.textContent = `Current Goal: ${goal.toUpperCase()}`;
    }
};

//function to map macors to variables after calculation

//function to calculate calories
function displayCal(e) {
    if (e.target.id === 'cut') {
        weightValues[0].cut.total();
        displayHeader(e.target.id);
        value(e.target.id);

        percentCarb.textContent = 40;
        percentProtein.textContent = 40;
        percentFat.textContent = 20;
    }
    if (e.target.id === 'maintain') {
        weightValues[0].maintain.total();
        displayHeader(e.target.id);
        value(e.target.id);
        
        percentCarb.textContent = 50;
        percentProtein.textContent = 20;
        percentFat.textContent = 30;
    }
    if (e.target.id === 'bulk') {
        weightValues[0].bulk.total();
        displayHeader(e.target.id);
        value(e.target.id);

        percentCarb.textContent = 50;
        percentProtein.textContent = 15;
        percentFat.textContent = 35;
    }
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
        console.log(carbTotal);
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
        document.getElementById(e.textContent.trim()).classList.add("show-cntr");
    }
    if (e.textContent === "Home") {
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

//function to update weight value
function updateFood(dataItem, cntr) {
    if (document.getElementById(dataItem)) {
        if (dataItem !== 'data-food') {
            if (regex.test(document.getElementById(dataItem).value)) {
                cntr.setAttribute(`${dataItem}`, document.getElementById(dataItem).value);
            } else {
                alert('Please only input a valid integer to 2 decimal places.');
            }
        } else {
            cntr.setAttribute(`${dataItem}`, document.getElementById(dataItem).value);
        }
        cntr.setAttribute(`${dataItem}`, document.getElementById(dataItem).value);
    }
};

//listen to weight input update
formInputs.forEach(input => {
    let data = input.id;
    console.log(input.id)
    input.addEventListener('input', function(e) {
        e.preventDefault();
        updateFood(data, foodInputCntr);
    });
});

const foodList = document.querySelector('.food-list');
const foodInputForm = document.querySelector('.food-input-cntr');

//listen for addition of food
foodInputForm.addEventListener('submit',addFood);

function addFood(e) {
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
    foodList.appendChild(foodItem);
    updateCalories();
    formInputs.forEach(input => {
        input.value = '';
    });
}
foodInputForm.addEventListener('submit', addFood);

//listen for update of calories
function updateCalories() {
    const foodMacrosRemaining = document.querySelectorAll('.food-item-macro-header h6');
    foodMacrosRemaining.forEach(macro => {
        let macroType = macro.dataset;
        for (const key in macroType) {
            if (macroType.hasOwnProperty(key)) {
                //set value of data-attrib on header
                console.log(macro.dataset)
                updateFood(`data-${key}`, macro);
                macro.textContent = `${macroType[key]}`;
            }
        }
    });
};
