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
// let totalArray = [];
// let [weightTotalPerDay, carbTotal, proteinTotal, fatTotal] = totalArray;
let weightTotalPerDay;
let carbTotal = 0;
let proteinTotal = 0;
let fatTotal = 0;
let remainingContainer = {};

// START EVENT LISTENERS
//listen for navigation
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        showActive(e.currentTarget);
    });
});


// let [weightTotalPerDay, carbTotal, proteinTotal, fatTotal] = totalArray;
function percentAmount(type) {
    switch (type) {
        case "cut":
            percentCarb.textContent = 40;
            percentProtein.textContent = 40;
            percentFat.textContent = 20;
          break;
        case "maintain":
            percentCarb.textContent = 40;
            percentProtein.textContent = 40;
            percentFat.textContent = 20;
          break;
        case "bulk":
            percentCarb.textContent = 40;
            percentProtein.textContent = 40;
            percentFat.textContent = 20;
          break;
    }
}

function value(type, callback) {
    let percentCarb;
    let percentProtein;
    let percentFat;
    switch (type) {
        case "cut":
            percentCarb = .4;
            percentProtein = .4;
            percentFat = .2;
          break;
        case "maintain":
            percentCarb = .5;
            percentProtein = .2;
            percentFat = .3;
          break;
        case "bulk":
            percentCarb = .5;
            percentProtein = .15;
            percentFat = .35;
          break;
    }
    let calcMacroTotal = function (percentage, callback) {
        return callback(percentage);
    }
    calcMacroTotal()
    caloricCarb.textContent = Math.round((weightTotalPerDay*percentCarb)/4);
    caloricProtein.textContent = Math.round((weightTotalPerDay*percentProtein)/4);
    caloricFat.textContent = Math.round((weightTotalPerDay*percentFat)/4);
}

// function percentValues(totalWeight, )
// totalArray.map(total => {

// })

//listen to weight input update
weightInput.addEventListener('keypress', function(e) {
    //validate valid weight submitted
    if (e.key === "Enter") {
        if (regex.test(e.target.value)) {
            weightValues.pop();
            const weightInfo = {
                cut: {
                    values() {
                        const total = () => {
                            weightTotalPerDay = Math.round(e.target.value*12);
                            caloriesTotal.textContent = weightTotalPerDay;
                            return
                        }
                        total();
                        const carb = () => {
                            carbTotal = Math.round((weightTotalPerDay*.4)/4);
                            caloricCarb.textContent = carbTotal;
                            return
                        }
                        const protein = () => {
                            proteinTotal = Math.round((weightTotalPerDay*.4)/4);
                            caloricProtein.textContent = proteinTotal;
                            return
                        }
                        const fat = () => {
                            fatTotal = Math.round((weightTotalPerDay*.2)/9);
                            caloricFat.textContent = fatTotal;
                            return
                        }
                        carb();
                        protein();
                        fat();
                    }
                },
                maintain: {
                    values() {
                        const total = () => {
                            weightTotalPerDay = Math.round(e.target.value*15);
                            caloriesTotal.textContent = weightTotalPerDay;
                            return
                        }
                        total();
                        const carb = () => {
                            carbTotal = Math.round((weightTotalPerDay*.5)/4);
                            caloricCarb.textContent = carbTotal;
                            return
                        }
                        const protein = () => {
                            proteinTotal = Math.round((weightTotalPerDay*.2)/4);
                            caloricProtein.textContent = proteinTotal;
                            return
                        }
                        const fat = () => {
                            fatTotal = Math.round((weightTotalPerDay*.3)/9);
                            caloricFat.textContent = fatTotal;
                            return
                        }
                        carb();
                        protein();
                        fat();
                    }
                },
                bulk: {
                    values() {
                        const total = () => {
                            weightTotalPerDay = Math.round(e.target.value*18);
                            caloriesTotal.textContent = weightTotalPerDay;
                            return
                        }
                        total();
                        const carb = () => {
                            carbTotal = Math.round((weightTotalPerDay*.5)/4);
                            caloricCarb.textContent = carbTotal;
                            return
                        }
                        const protein = () => {
                            proteinTotal = Math.round((weightTotalPerDay*.15)/4);
                            caloricProtein.textContent = proteinTotal;
                            return
                        }
                        const fat = () => {
                            fatTotal = Math.round((weightTotalPerDay*.35)/9);
                            caloricFat.textContent = fatTotal;
                            return
                        }
                        carb();
                        protein();
                        fat();
                    }
                }
            };
            updateValue(e);
            
            weightValues.push(weightInfo);
            //update values on new weight enter
            remainingContainer = {
                carb: carbTotal,
                protein: proteinTotal,
                fat: fatTotal,
                total: 0
            };
        } else {
            alert("Please only enter integers. Only one decimal is allowed")
        }
    }
});

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


//function to display current goal
function displayHeader(goal) {
    for (const header of displayGoal) {
        header.textContent = `Current Goal: ${goal.toUpperCase()}`;
    }
};

//function to map macors to variables after calculation

//function to calculate calories
function displayCal(e) {
    if (e.target.id === 'cut') {
        weightValues[0].cut.values();
        displayHeader(e.target.id);
        //show log item total macros
        updateCalories(e);

        percentCarb.textContent = 40;
        percentProtein.textContent = 40;
        percentFat.textContent = 20;
    }
    if (e.target.id === 'maintain') {
        weightValues[0].maintain.values();
        displayHeader(e.target.id);
        //show log item total macros
        updateCalories(e);
        
        percentCarb.textContent = 50;
        percentProtein.textContent = 20;
        percentFat.textContent = 30;
    }
    if (e.target.id === 'bulk') {
        weightValues[0].bulk.values();
        displayHeader(e.target.id);
        //show log item total macros
        updateCalories(e);

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

//save added food item into one

//function to update weight value
function updateFood(dataItem, cntr, value) {
    if (document.getElementById(dataItem)) {
        if (dataItem !== 'data-food') {
            if (regex.test(1)) {
                // (regex.test(document.getElementById(dataItem).value))
                cntr.setAttribute(`${dataItem}`, document.getElementById(dataItem).value);
                // cntr.setAttribute(`${dataItem}-total`, document.getElementById(dataItem).value);
            } else {
                alert('Please only input a valid integer to 2 decimal places.');
            }
        } else {
            cntr.setAttribute(`${dataItem}`, document.getElementById(dataItem).value);
        }
    } else {    
        cntr.setAttribute(`${dataItem}`, value);
    }
};

//listen to weight input update
formInputs.forEach(input => {
    let data = input.id;
    input.addEventListener('input', function(e) {
        e.preventDefault();
        updateFood(data, foodInputCntr);
    });
});

const foodList = document.querySelector('.food-list');
const foodInputForm = document.querySelector('.food-input-cntr');

//listen for addition of food and deletion
foodList.addEventListener('click',updateCalories);
foodInputForm.addEventListener('submit',addFood);
//retain all foods added by user
const foodsAdded = [];

//create object to push into foodsAdded array;
function returnFood(item, carb, protein, fat) {
    let idVal = Math.floor(Math.random() * 10000);
    let foodValues = {
        id: idVal,
        food: item,
        carb: Number(carb),
        protein: Number(protein),
        fat: Number(fat),
        total: (Number(carb) + Number(protein) + Number(fat))
    }; 
    return foodValues
}

function addFood(e) {
    e.preventDefault();
    const foodItem = document.createElement('li');
    foodItem.innerHTML = `
        <div class="food">
            <p>${foodInputCntr.dataset.food}</p>
        </div>
        <div class="item-macro-cntr">
            <div class="macro" data-carb>
            ${foodInputCntr.dataset.carb}
            </div>
            <div class="macro" data-protein>
            ${foodInputCntr.dataset.protein}
            </div>
            <div class="macro" data-fat>
            ${foodInputCntr.dataset.fat}
            </div>
        </div>
        <button class="item-button" type="submit">
            <i class="fas fa-plus-square"></i>
        </button>
    `;
    foodList.appendChild(foodItem);
    //add food to array of foods added
    foodsAdded.push(returnFood(foodInputCntr.dataset.food, foodInputCntr.dataset.carb, foodInputCntr.dataset.protein, foodInputCntr.dataset.fat));
    console.log(foodsAdded);
    updateCalories(e);
    //save food
    saveLocalFoods(foodInputCntr.dataset.food, foodInputCntr.dataset.carb, foodInputCntr.dataset.protein, foodInputCntr.dataset.fat);
    //clear inputs
    formInputs.forEach(input => {
        input.value = '';
    });
}

//update of calories
function updateCalories(e) {
    document.querySelectorAll('.food-item-macro-header h6').forEach(macro => {
        getCall(e, macro);
    });
     document.querySelectorAll('.goal h4 span').forEach(macro => {
        getCall(e, macro);
     });
};

function deleteFood(e) {
    const item = e.target;
    const food = item.parentElement;

    removeLocalFoods(food);
    food.remove();
} 
let decide = function(e, val1, val2) {
    if (e.target.classList[0] === "item-button") {
        deleteFood(e);
        // console.log('reduceCal')
        // console.log(reduceCal(val1, val2))
        // console.log('reduceCal')
        console.log('reduceCal')
        console.log(val1, "val 1")
        console.log(val2, "val 2")
        return val1 - val2
    } else {
        // console.log('addBackCal')
        // console.log(addBackCal(val1, val2))
        val1 + val2
        console.log(val1)
        return val1
    }
}

function addOrReduce(e, val1, val2, callback) {
    if (callback) {
        return callback(e, val1, val2);
    } else {
        if (e.target.classList[0] === "item-button") {
            console.log('reduce')
            return reduceCal(val1, val2)
        } else {
            console.log('add')
            return addBackCal(val1, val2)
        }
    }
}

//function to recieve prevTotal 
function prevTotal(key) {
    document.querySelectorAll('.food-item-macro-header h6').forEach(cntr => {
        let total = cntr.dataset[`${key}Total`]
        return total
    })
}

//function to reduce calories
function reduceCal(v, amnt) {  
    v = v - amnt;
    return v
}

function addBackCal(v, amnt) {
    v = v + amnt;
    return v
}
let macroTotals = [];
function getCall(e, cntr) {
    // const goals = document.querySelectorAll('.goal h4 span');
    // goals.forEach(macro => {
        // if (e.target.classList[0] === 'item-button') {
        //     deleteFood(e);
        // }
        remainingContainer = {
            carb: carbTotal,
            protein: proteinTotal,
            fat: fatTotal,
            total: 1
        };
    
        let macroType = cntr.dataset;
        for (const key in macroType) {
            if (macroType.hasOwnProperty(key) && remainingContainer[key]) {
                let totalNow = 0;
                let prevTotal = 0;
                let macroAmnt = 0;
                //update value of key
                if (e.target.classList[0] !== 'item-button') {
                    updateFood(`data-${key}`, cntr);
                }
                // } else {
                //     let arr = [...e.target.previousElementSibling.children];
                //     arr.forEach(child => {
                //         if (child.dataset.hasOwnProperty(key)) {
                //             console.log(Number(child.textContent))
                //             updateFood(`data-${key}`, child, Number(child.textContent))
                //             console.log(child.dataset[key] , key)
                //         }
                //     })
                // }
                let total = macroType[`${key}Total`];
                
                //if first food item added
                if (total === undefined) {
                    console.log('first');
                    updateFood(`data-${key}-total`, cntr, `${macroType[key]}`);
                    updateFood(`data-${key}-remaining`, cntr, `${reduceCal(remainingContainer[key], macroType[key])}`);
                    console.log(cntr.dataset)
                    cntr.textContent = `${reduceCal(remainingContainer[key], macroType[key])}`;
                } else {
                    console.log('second');

                    let arr = [...e.target.previousElementSibling.children];
                    let prevTotalArr =  document.querySelectorAll('.food-item-macro-header h6');
                    
                    // macroAmnt = Number(`${e.target.classList[0] ==='item-button' ? Number(macroType[key]) : Number(macroType[key])}`);
                    // totalNow = Number(`${e.target.classList[0] ==='item-button' ? Number(total) - Number(macroType[key]) : Number(total) + Number(macroType[key])}`);
                    // prevTotalArr.forEach(cntr => {
                    //     let total = cntr.dataset[`${cntr.}Total`]
                    //     return total
                    // })
                    arr.forEach(child => {
                        if (child.dataset.hasOwnProperty(key)) {
                            console.log(typeof(Number(child.textContent)), key)
                            return Number(child.textContent)
                        }
                    })
                    totalNow = Number(`${e.target.classList[0] ==='item-button' ? 2 - 2 : Number(total) + Number(macroType[key])}`);
                    updateFood(`data-${key}-total`, cntr, totalNow);

                    prevTotal = Number(total) + Number(macroType[key]);
                    let macroTotalVal = [key, prevTotal];
                    if (macroTotals.length < 6) {
                        macroTotals.push(macroTotalVal)
                    } else {
                        macroTotals.splice(0,6)
                        macroTotals.push(macroTotalVal)
                    }
                    console.log(macroTotals);

                    updateFood(`data-${key}-remaining`, cntr, `${remainingContainer[key] - totalNow}`);
                    // updateFood(`data-${key}-remaining`, cntr, `${remainingContainer[key] - (addOrReduce(e, totalNow , macroAmnt, decide))}`);
                    // updateFood(`data-${key}-remaining`, cntr, `${remainingContainer[key] - (addOrReduce(e, Number(total), Number(macroType[key])))}`); // works for setting remaining on addition of items
                    // console.log(addOrReduce(e, Number(total), Number(macroType[key])));
                    // console.log(addOrReduce(e, (Number(total) + Number(macroType[key])), Number(macroType[key]))); //total for next iteration on new tem submission (this works for deleting items and having the total fixed)
                    console.log(cntr.dataset);
                    //header content
                    console.log(remainingContainer[key] - totalNow)
                    cntr.textContent = `${remainingContainer[key] - totalNow}`; // this works for adding new items
                }
                //Number(total) is previous total number
                
                //display total
                if (macroType['total']) {
                    cntr.textContent = `${remainingContainer[cntr.id]}`;
                }
            }
        }
    // });
}
// function getMacros(cntr) {
//     let calc = function(num1, num2,callback) {
//         return callback(num1, num2);
//     }
//     // let calc = function(num1, num2, callback) {
//     //     return callback(num1, num2)
//     // }
//     remainingContainer = {
//         carb: carbTotal,
//         protein: proteinTotal,
//         fat: fatTotal,
//         total: 1
//     };

//     let macroType = cntr.dataset;
//     for (const key in macroType) {
//         if (macroType.hasOwnProperty(key) && remainingContainer[key]) {
//             console.log(cntr)
//             console.log(remainingContainer)
//             //update value of key
//             updateFood(`data-${key}`, cntr);
//             let total = macroType[`${key}Total`];
            
//             //if first food item added
//             if (total === undefined) {
//                 updateFood(`data-${key}-total`, cntr, `${macroType[key]}`);
//                 updateFood(`data-${key}-remaining`, cntr, `${
//                     calc(remainingContainer[key], macroType[key], reduceCal)
//                 }`);
//                 // updateFood(`data-${key}-remaining`, cntr, `${calc(reduceCal(remainingContainer[key], macroType[key]))}`);
//                 // cntr.textContent = `${reduceCal(remainingContainer[key], macroType[key])}`;
//                 cntr.textContent = `${reduceCal(remainingContainer[key], macroType[key])}`;
//             } else {

//                 updateFood(`data-${key}-total`, cntr, `${Number(macroType[key]) + Number(total) }`);
//                 updateFood(`data-${key}-remaining`, cntr, `${remainingContainer[key] - (Number(total) + Number(macroType[key]))}`);
//                 //header content
//                 cntr.textContent = `${reduceCal(remainingContainer[key], (Number(total) + Number(macroType[key])))}`;
//             }

//             //display total
//             if (macroType['total']) {
//                 cntr.textContent = `${remainingContainer[cntr.id]}`;
//             }
//         }
//     }
// }

//functions to save, remove and get items

function saveLocalFoods(foodItem, carb, protein, fat) {
    let food = {
        food: foodItem,
        carb: carb,
        protein: protein,
        fat: fat
    };
    let foods;
    if (localStorage.getItem("foods") === null) {
        foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem("foods"));
    }
    foods.push(food);
    localStorage.setItem("foods", JSON.stringify(foods));
}


function removeLocalFoods(food) {
    let foods;
    if (localStorage.getItem("foods") === null) {
        foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem("foods"));
    }
    const foodIndex = food.children[0].innerText;
    foods.splice(foods.indexOf(foodIndex), 1);
    localStorage.setItem("foods", JSON.stringify(foods));
}

function getFoods() {
    let foods;
    if (localStorage.getItem("foods") === null) {
      foods = [];
    } else {
        foods = JSON.parse(localStorage.getItem("foods"));
    }
    foods.forEach(function(food) {
        const foodItem = document.createElement('li');
        foodItem.innerHTML = `
        <div class="food">
            <p>${food.food}</p>
        </div>
        <div class="item-macro-cntr">
            <div class="macro">
            ${food.carb}
            </div>
            <div class="macro">
            ${food.protein}
            </div>
            <div class="macro">
            ${food.fat}
            </div>
        </div>
        <button class="item-button" type="submit">
            <i class="fas fa-plus-square"></i>
        </button>
        `;
        foodList.appendChild(foodItem);
        // updateCalories();
    });
}
//get foods from storage on load
document.addEventListener("DOMContentLoaded", getFoods);
// console.log(JSON.parse(localStorage.getItem("foods")));



