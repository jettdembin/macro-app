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

//listen to weight input update
weightInput.addEventListener('keypress', function(e) {
    //validate valid weight submitted
    if (e.key === "Enter") {
        if (regex.test(e.target.value)) {
            updateWeight(e);
            adjustOptions.forEach(option => {
                option.removeEventListener('click', adjustMeals);
                option.addEventListener('click', adjustMeals);
                console.log(option)
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
        console.log(option)
    });
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

// //function to listen adjust meals
// adjustOptions.forEach(option => {
//     option.addEventListener('click', adjustMeals);
// });

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
        calorieHeader.textContent = "Calories Per Meal";
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
        caloriesTotal.textContent = Math.round(Number(caloriesTotal.textContent)/4);
        caloricCarb.textContent = Math.round(Number(caloricCarb.textContent)/4);
        caloricProtein.textContent = Math.round(Number(caloricProtein.textContent)/4);
        caloricFat.textContent = Math.round(Number(caloricFat.textContent)/4);
    }
    if (e.target.textContent === "5") {
        caloriesTotal.textContent = Math.round(Number(caloriesTotal.textContent)/5);
        caloricCarb.textContent = Math.round(Number(caloricCarb.textContent)/5);
        caloricProtein.textContent = Math.round(Number(caloricProtein.textContent)/5);
        caloricFat.textContent = Math.round(Number(caloricFat.textContent)/5);
    }
}