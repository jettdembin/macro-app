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


function percentAmount(type) {
    switch (type) {
        case "cut":
            percentCarb.textContent = 40;
            percentProtein.textContent = 40;
            percentFat.textContent = 20;
          break;
        case "maintain":
            percentCarb.textContent = 50;
            percentProtein.textContent = 20;
            percentFat.textContent = 30;
          break;
        case "bulk":
            percentCarb.textContent = 50;
            percentProtein.textContent = 15;
            percentFat.textContent = 35;
          break;
    }
}

// function value(type, callback) {
//     let percentCarb;
//     let percentProtein;
//     let percentFat;
//     switch (type) {
//         case "cut":
//             percentCarb = .4;
//             percentProtein = .4;
//             percentFat = .2;
//           break;
//         case "maintain":
//             percentCarb = .5;
//             percentProtein = .2;
//             percentFat = .3;
//           break;
//         case "bulk":
//             percentCarb = .5;
//             percentProtein = .15;
//             percentFat = .35;
//           break;
//     }
//     let calcMacroTotal = function (percentage, callback) {
//         return callback(percentage);
//     }
//     calcMacroTotal()
//     caloricCarb.textContent = Math.round((weightTotalPerDay*percentCarb)/4);
//     caloricProtein.textContent = Math.round((weightTotalPerDay*percentProtein)/4);
//     caloricFat.textContent = Math.round((weightTotalPerDay*percentFat)/4);
// }

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
                        // let totals = {
                        //     total: weightTotalPerDay,
                        //     carb: carbTotal,
                        //     protein: proteinTotal,
                        //     fat: fatTotal
                        // }
                        // return totals
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
const displayGoal = document.querySelectorAll('.goal-header-cntr h2');


//function to display current goal
function displayHeader(goal) {
    for (const header of displayGoal) {
        header.textContent = `Current Goal: ${goal.toUpperCase()}`;
    }
};

//function to map macors to variables after calculation
//function to calculate calories
function displayCal(e, val) {
    if (e.target.id === 'cut' || val === 'cut') {
        weightValues[0].cut.values();
        saveTotals(weightTotalPerDay, carbTotal, proteinTotal, fatTotal, "cut");
        displayHeader(e.target.id);
        //show log item total macros
        updateCalories(e);

        //display percents
        percentAmount(e.target.id);

        // percentCarb.textContent = 40;
        // percentProtein.textContent = 40;
        // percentFat.textContent = 20;
    }
    if (e.target.id === 'maintain') {
        weightValues[0].maintain.values();
        saveTotals(weightTotalPerDay, carbTotal, proteinTotal, fatTotal, "maintain");
        displayHeader(e.target.id);
        //show log item total macros
        updateCalories(e);
        
        //display percents
        percentAmount(e.target.id);
    }
    if (e.target.id === 'bulk') {
        weightValues[0].bulk.values();
        saveTotals(weightTotalPerDay, carbTotal, proteinTotal, fatTotal, "bulk");
        displayHeader(e.target.id);
        //show log item total macros
        updateCalories(e);

        //display percents
        percentAmount(e.target.id);
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
    switch (e.target.textContent) {
        case "3":
            caloriesTotal.textContent = weightTotalPerDay/3;
            caloricCarb.textContent = Math.round(carbTotal/3);
            caloricProtein.textContent = Math.round(proteinTotal/3);
            caloricFat.textContent = Math.round(fatTotal/3);
            break;
        case "4":
            caloriesTotal.textContent = weightTotalPerDay/4;
            caloricCarb.textContent = Math.round(carbTotal/4);
            caloricProtein.textContent = Math.round(proteinTotal/4);
            caloricFat.textContent = Math.round(fatTotal/4);
            break;
        case "5":
            caloriesTotal.textContent = weightTotalPerDay/5;
            caloricCarb.textContent = Math.round(carbTotal/5);
            caloricProtein.textContent = Math.round(proteinTotal/5);
            caloricFat.textContent = Math.round(fatTotal/5);
            break;    
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
    updateCalories(e);
    //save food
    saveLocalFoods(foodInputCntr.dataset.food, foodInputCntr.dataset.carb, foodInputCntr.dataset.protein, foodInputCntr.dataset.fat);
    // //init remain amnt
    saveRemaining();
    //clear inputs
    formInputs.forEach(input => {
        input.value = '';
    });
}

//update of calories
function updateCalories(e) {
    if (e.target.classList[0] === 'item-button') {
        deleteFood(e);
    }
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
// let decide = function(e, val1, val2) {
//     if (e.target.classList[0] === "item-button") {
//         deleteFood(e);
//         return val1 - val2
//     } else {
//         val1 + val2
//         console.log(val1)
//         return val1
//     }
// }

// function addOrReduce(e, val1, val2, callback) {
//     if (callback) {
//         return callback(e, val1, val2);
//     } else {
//         if (e.target.classList[0] === "item-button") {
//             console.log('reduce')
//             return reduceCal(val1, val2)
//         } else {
//             console.log('add')
//             return addBackCal(val1, val2)
//         }
//     }
// }

//function to reduce calories
function reduceCal(v, amnt) {  
    v = v - amnt;
    return v
}

// function addBackCal(v, amnt) {
//     v = v + amnt;
//     return v
// }

let macroTotals = [];
function getCall(e, cntr) {
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

                //update value of key
                if (e.target.classList[0] !== 'item-button') {
                    updateFood(`data-${key}`, cntr);
                }
               
                let total = macroType[`${key}Total`];
                
                //if first food item added
                if (total === undefined) {
                    console.log('first');
                    updateFood(`data-${key}-total`, cntr, `${macroType[key]}`);
                    updateFood(`data-${key}-remaining`, cntr, `${reduceCal(remainingContainer[key], macroType[key])}`);

                    cntr.textContent = `${reduceCal(remainingContainer[key], macroType[key])}`;
                } else {
                    console.log('second');
                    let prevTotalArr =  document.querySelectorAll('.food-item-macro-header h6');
                    
                    //function to return user target deletion nu,
                    let returnTargetNum = (e, key) => {
                        let arr = [...e.target.previousElementSibling.children];
                        let num;
                        arr.forEach(child => {
                            if (child.dataset.hasOwnProperty(key)) {
                                num = Number(child.textContent)
                            }

                        })
                        return num
                    }

                    //REFACTOR
                    totalNow = Number(`${e.target.classList[0] ==='item-button' ? Number(total) - returnTargetNum(e, key) : Number(total) + Number(macroType[key])}`);
                    updateFood(`data-${key}-total`, cntr, totalNow);

                    updateFood(`data-${key}-remaining`, cntr, `${remainingContainer[key] - totalNow}`);
                    console.log(cntr.dataset);
                    console.log(typeof(remainingContainer[key] - totalNow))

                    //header content
                    cntr.textContent = `${remainingContainer[key] - totalNow}`; // this works for adding new items

                    //save remaining amount
                    saveRemaining((remainingContainer[key] - totalNow), key);
                }
                //Number(total) is previous total numberm
                
                //display total
                if (macroType['total']) {
                    cntr.textContent = `${remainingContainer[cntr.id]}`;
                }
            }
        }
}

//functions to save, remove and get items
//save remaing amount
function saveRemaining(total,key) {
    console.log(total, key, "save")
    total;
    // total = Number(`${e.target.classList[0] ==='item-button' ? Number(total) - currentVal : Number(total) + Number(currentVal)}`);
    let remaining = {
        carb:undefined,
        protein:undefined,
        fat:undefined
    };

    // const isMyObjectEmpty = Object.keys(remaining).length === 0;
    
    let remainingAmnt;
    if (localStorage.getItem("remainingAmnt") === null) {
        remainingAmnt = [];
    } else {
        remainingAmnt = JSON.parse(localStorage.getItem("remainingAmnt"));
    }
    if (remainingAmnt.length > 3) {
        remainingAmnt.splice(0,3)
    }
    if (remaining.hasOwnProperty(key)) {
        remaining[`${key}`] = Number(total);
        remainingAmnt.push(remaining)
        console.log(key, "pushed")
    }
    localStorage.setItem("remainingAmnt", JSON.stringify(remainingAmnt));

}



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

function saveTotals(totalCal, carbTotal, proteinTotal, fatTotal, goal) {
    let total = {
        weight: totalCal,
        carb: carbTotal,
        protein: proteinTotal,
        fat: fatTotal,
        goal: goal
    };
    let totals;
    if (localStorage.getItem("totals") === null) {
        totals = [];
    } else {
        totals = JSON.parse(localStorage.getItem("totals"));
    }
    //remove prior totals
    totals.pop();
    totals.push(total);
    localStorage.setItem("totals", JSON.stringify(totals));
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
    });
}

function getTotals() {
    let totals;
    if (localStorage.getItem('totals') === null) {
        totals = [];
    } else {
        totals = JSON.parse(localStorage.getItem('totals'))
    }
    
    //functions to display current goal and percents
    displayHeader(totals[0].goal);
    percentAmount(totals[0].goal);

    //set totals for log items section
    document.querySelectorAll('.goal h4 span').forEach(macro => {
        if (totals[0].hasOwnProperty(macro.id)) {
            macro.textContent = totals[0][`${macro.id}`];
        }
     });
    //  document.querySelectorAll('.food-item-macro-header h6').forEach(macro => {
    //     if (totals[0].hasOwnProperty(macro.id)) {
    //         macro.textContent = totals[0][`${macro.id}`];
    //     }
    //  });

    caloriesTotal.textContent = totals[0].weight;
    caloricCarb.textContent = totals[0].carb;
    caloricProtein.textContent = totals[0].protein;
    caloricFat.textContent = totals[0].fat;
}
//get foods from storage on load
document.addEventListener("DOMContentLoaded", getFoods);
document.addEventListener("DOMContentLoaded", getTotals);
// console.log(JSON.parse(localStorage.getItem("foods")));



