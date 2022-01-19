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
            updateWeight(e);
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
function updateWeight(e) {
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