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

//listen to weight input update
weightInput.addEventListener('keypress', function(e) {
    //validate valid weight submitted
    if (e.key === "Enter") {
        if (regex.test(e.target.value)) {
            updateWeight(e);
        } else {
            alert("Please only enter integers. Only one decimal is allowed")
        }
    }
});

//listen to click for calculate
calculate.forEach(btn => {
    btn.addEventListener('click', calculateCal);
});

//function to calculate calories
function calculateCal(e) {
    if (e.target.id === 'cut') {
        const calories = Math.round(weightInput.value * 12);
        caloriesTotal.textContent = calories;

        const carb = Math.round((calories * .4) / 4);
        const protein = Math.round((calories * .4) / 4);
        const fat = Math.round((calories * .2) / 9);
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
    // weight = e.target.value;
    weightInput.setAttribute('value', e.target.value);
};