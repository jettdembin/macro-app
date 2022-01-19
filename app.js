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

let weightValue = [];

//listen to weight input update
weightInput.addEventListener('keypress', function(e) {
    //validate valid weight submitted
    if (e.key === "Enter") {
        if (regex.test(e.target.value)) {
            weightValue.pop();
            const weightInfo = {
                weight: e.target.value,
                cut: {
                    total: Math.round(e.target.value*12),
                    carb: function() {
                        return Math.round((this.total*.4)/4);
                    },
                    protein: function() {
                        return Math.round((this.total*.4)/4);
                    },
                    fat: function() {
                        return Math.round((this.total*.2)/9);
                    }
                },
                maintain: {
                    total: Math.round(e.target.value*15),
                    carb: function() {
                        return Math.round((this.total*.5)/4);
                    },
                    protein: function() {
                        return Math.round((this.total*.2)/4);
                    },
                    fat: function() {
                        return Math.round((this.total*.3)/9);
                    }
                },
                bulk: {
                    total: Math.round(e.target.value*18),
                    carb: function() {
                        return Math.round((this.total*.5)/4);
                    },
                    protein: function() {
                        return Math.round((this.total*.15)/4);
                    },
                    fat: function() {
                        return Math.round((this.total*.35)/9);
                    }
                }
            };
            weightValue.push(weightInfo);
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
        const cut = weightValue[0].cut.total;
        console.log(weightValue[0].cut.carb())
        caloriesTotal.textContent =  cut;

        const carb = Math.round((cut * .4) / 4);
        const protein = Math.round((cut * .4) / 4);
        const fat = Math.round((cut * .2) / 9);
        caloricCarb.textContent = carb;
        caloricProtein.textContent = protein;
        caloricFat.textContent = fat;

        percentCarb.textContent = 40;
        percentProtein.textContent = 40;
        percentFat.textContent = 20;
    }
    if (e.target.id === 'maintain') {
        const calories = Math.round(weightInput.value * 15);
        caloriesTotal.textContent = calories;

        const carb = Math.round((calories * .5) / 4);
        const protein = Math.round((calories * .2) / 4);
        const fat = Math.round((calories * .3) / 9);
        caloricCarb.textContent = carb;
        caloricProtein.textContent = protein;
        caloricFat.textContent = fat;

        percentCarb.textContent = 50;
        percentProtein.textContent = 20;
        percentFat.textContent = 30;
    }
    if (e.target.id === 'bulk') {
        const calories = Math.round(weightInput.value * 18);
        caloriesTotal.textContent = calories;

        const carb = Math.round((calories * .5) / 4);
        const protein = Math.round((calories * .15) / 4);
        const fat = Math.round((calories * .35) / 9);
        caloricCarb.textContent = carb;
        caloricProtein.textContent = protein;
        caloricFat.textContent = fat;

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
    } else {
        calorieHeader.textContent = "Calories Per Meal";
    }
    if (e.target.textContent === "3") {
        let total = Number(caloriesTotal.textContent)/3;
        let carb = Number(caloricCarb.textContent)/3;
        let protein = Number(caloricFat.textContent)/3;
        let fat = Number(caloricProtein.textContent)/3;

        caloriesTotal.textContent = Math.round(total);
        caloricCarb.textContent = Math.round(carb);
        caloricProtein.textContent = Math.round(protein);
        caloricFat.textContent = Math.round(fat);

        e.target.removeEventListener('click', adjustMeals);
    }
    if (e.target.textContent === "4") {
        let total = Number(caloriesTotal.textContent)/4;
        let carb = Number(caloricCarb.textContent)/4;
        let protein = Number(caloricFat.textContent)/4;
        let fat = Number(caloricProtein.textContent)/4;

        caloriesTotal.textContent = Math.round(total);
        caloricCarb.textContent = Math.round(carb);
        caloricProtein.textContent = Math.round(protein);
        caloricFat.textContent = Math.round(fat);

        e.target.removeEventListener('click', adjustMeals);
    }
    if (e.target.textContent === "5") {
        let total = Number(caloriesTotal.textContent)/5;
        let carb = Number(caloricCarb.textContent)/5;
        let protein = Number(caloricFat.textContent)/5;
        let fat = Number(caloricProtein.textContent)/5;

        caloriesTotal.textContent = Math.round(total);
        caloricCarb.textContent = Math.round(carb);
        caloricProtein.textContent = Math.round(protein);
        caloricFat.textContent = Math.round(fat);

        e.target.removeEventListener('click', adjustMeals);
    }
}