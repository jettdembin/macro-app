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
let weightTotalPerDay = [];

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
                    meals(e) {
                        const three = () =>  {
                            Math.round(this.total / 3);
                        }
                        if (e.target.textContent == "3") {
                            three();
                        }
                    },
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
            adjustOptions.forEach(option => {
                option.removeEventListener('click', adjustMeals);
                option.addEventListener('click', adjustMeals);
            });
        } else {
            alert("Please only enter integers. Only one decimal is allowed")
        }
    }
});

//listen to click for calculate
calculate.forEach(btn => {
    btn.addEventListener('click', (e)=> {
        calculateCal(e);
    });
});

//function to calculate calories
function calculateCal(e) {
    adjustOptions.forEach(option => {
        option.removeEventListener('click', adjustMeals);
        option.addEventListener('click', adjustMeals);
    });
    if (e.target.id === 'cut') {
        weightTotalPerDay = weightValues[0].cut.total;
        caloriesTotal.textContent = weightTotalPerDay;
        caloricCarb.textContent = weightValues[0].cut.carb();
        caloricProtein.textContent = weightValues[0].cut.protein();
        caloricFat.textContent = weightValues[0].cut.fat();

        percentCarb.textContent = 40;
        percentProtein.textContent = 40;
        percentFat.textContent = 20;
    }
    if (e.target.id === 'maintain') {
        weightTotalPerDay = weightValues[0].cut.total;
        caloriesTotal.textContent = weightTotalPerDay;
        caloricCarb.textContent = weightValues[0].maintain.carb();
        caloricProtein.textContent = weightValues[0].maintain.protein();
        caloricFat.textContent = weightValues[0].maintain.fat();
        
        percentCarb.textContent = 50;
        percentProtein.textContent = 20;
        percentFat.textContent = 30;
    }
    if (e.target.id === 'bulk') {
        weightTotalPerDay = weightValues[0].bulk.total;
        caloriesTotal.textContent = weightTotalPerDay;
        caloricCarb.textContent = weightValues[0].bulk.carb();
        caloricProtein.textContent = weightValues[0].bulk.protein();
        caloricFat.textContent = weightValues[0].bulk.fat();

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

let counter = 0;

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
    }
    if (e.target.textContent === "4") {
        caloriesTotal.textContent = weightTotalPerDay/4;
    }
    if (e.target.textContent === "5") {
        caloriesTotal.textContent = weightTotalPerDay/5;
    }
}