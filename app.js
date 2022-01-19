//
const weightInput = document.getElementById('weight');
const calculate = document.querySelectorAll('button');
const caloriesTotal = document.querySelector('.calories-total');

caloriesTotal.textContent = '2000';

//listen to weight input update
weightInput.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        updateWeight(e);
        console.log(weightInput.value)
    }
});

//listen to click for calculate
calculate.forEach(btn => {
    btn.addEventListener('click', calculateCal);
});

//function to calculate calories
function calculateCal(e) {
    if (e.target.id === 'cut') {
        const calories = weightInput.value * 12;
        caloriesTotal.textContent = calories;
    }
    if (e.target.id === 'maintain') {
        const calories = weightInput.value * 15;
        caloriesTotal.textContent = calories;
    }
    if (e.target.id === 'bulk') {
        const calories = weightInput.value * 18;
        caloriesTotal.textContent = calories;
    }
};

//function to update weight value
function updateWeight(e) {
    // weight = e.target.value;
    weightInput.setAttribute('value', e.target.value);
};