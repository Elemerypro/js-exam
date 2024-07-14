/// <reference types="../@types/jquery" />

let rowData = document.querySelector("#rowData");
let loadingScreen = document.querySelector(".loading-screen");
let navTab = document.querySelector(".nav-tab");
let searchInput = document.getElementById("searchByName");
let searchInput2 = document.getElementById("searchByLetter");

$('.open-close-icon').on('click', function () {
    const sideNavWidth = $('.side-nav-menu').innerWidth();
    const sideList = $('.nav-tab').innerWidth();
    const navHeader = $('nav-header').innerWidth();

    if ($('.side-nav-menu').css("left") == "0px") {
        $('.side-nav-menu').animate({ left: -sideList + "px" }, 500)
        $('.open-close-icon').animate({ left: navHeader + "px" }, 500);
        $('li').css("top", "300px");
        $("li").css("transition", "all 1s");
        $('.open-close-icon').removeClass("fa-x");
        $('.nav-tab').removeClass("d-none");
    } else {
        $('.side-nav-menu').animate({ left: "0px" }, 500)
        $('.open-close-icon').animate({ left: sideNavWidth + "px" }, 500)
        $('li').css("top", "0px");
        $('.nav-tab').addClass("d-flex");
        $('.open-close-icon').addClass("fa-x");
    }
});

let allFoods = [];
async function getMeal(searchTerm = '') {
    try {
        let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        let finalResult = await result.json();
        allFoods = finalResult.meals || [];
        console.log(finalResult.meals);
        displayMeals(allFoods);
    } catch (error) {
        console.error('Error fetching food data:' + error);
    }
}

async function searchByLetter(letter) {
    if (letter.length > 1) return;
    try {
        let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let finalResult = await result.json();
        allFoods = finalResult.meals || [];
        displayMeals(allFoods);
    } catch (error) {
        console.error('Error fetching food data: ' + error);
    }
}

// Function to display meals
function displayMeals(allFoods) {
    let cartona = ``;
    for (let i = 0; i < allFoods.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getMealDetailsById('${allFoods[i].idMeal}')">
                    <img src="${allFoods[i].strMealThumb}" class="w-100">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${allFoods[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    rowData.innerHTML = cartona;
}

function displayIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    return ingredients;
}

function showSearchInputs() {
    let cartona = `
        <div class="col-md-6">
            <input id="searchByName" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="searchByLetter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    `;
    rowData.innerHTML = cartona;

    let searchInput = document.getElementById("searchByName");
    let searchInput2 = document.getElementById("searchByLetter");

    searchInput.addEventListener("input", function (e) {
        let searchTerm = e.target.value;
        getMeal(searchTerm);
    });
    searchInput2.addEventListener("input", function (e) {
        let searchTerm = e.target.value;
        searchByLetter(searchTerm);
    });
}

function closeSideNav() {
    navTab.classList.replace("d-flex", "d-none");
    $('.open-close-icon').removeClass("fa-x");
}

let allCategories = [];
async function getCategory() {
    try {
        let result = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let finalResult = await result.json();
        allCategories = finalResult.categories || [];
        console.log(allCategories);
        displayCategories(allCategories);
    } catch (error) {
        console.error('Error fetching categories:' + error);
    }
}

function displayCategories() {
    let cartona = ``;
    for (let i = 0; i < allCategories.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getCategoryMeal('${allCategories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${allCategories[i].strCategoryThumb}" alt="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${allCategories[i].strCategory}</h3>
                    <p>${allCategories[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartona;
}

let allMeal = [];
async function getCategoryMeal(category) {
    try {
        let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let finalResult = await result.json();
        allMeal = finalResult.meals || [];
        console.log(allMeal);
        displayCategoryMeal(allMeal);
    } catch (error) {
        console.error('Error fetching meals by category:' + error);
    }
}

function displayCategoryMeal(allMeal) {
    let cartona = ``;
    for (let i = 0; i < allMeal.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getMealDetailsById('${allMeal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${allMeal[i].strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${allMeal[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = cartona;
}




let allArea = [];
async function getArea() {
    try {
        let result = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        let finalResult = await result.json();
        allArea = finalResult.meals || [];
        console.log(allArea);
        displayArea(allArea);
    } catch (error) {
        console.error('Error fetching areas:' + error);
    }
}

function displayArea() {
    let cartona = ``;
    for (let i = 0; i < allArea.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${allArea[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${allArea[i].strArea}</h3>
            </div>
        </div>
        `;
    }
    let rowData = document.getElementById('rowData');
    if (rowData) {
        rowData.innerHTML = cartona;
    } else {
        console.error("Element with id 'rowData' not found.");
    }
}

let areaMeals = [];
async function getAreaMeals(area) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let data = await response.json();
        areaMeals = data.meals || [];
        console.log(areaMeals);
        displayAreaMeals(areaMeals);
    } catch (error) {
        console.error("Error fetching area meals:", error);
    }
}

function displayAreaMeals(area) {
    let cartona = ``;
    for (let i = 0; i < area.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div onclick="getMealDetailsById('${area[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${area[i].strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${area[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    }
    let rowData = document.getElementById('rowData');
    if (rowData) {
        rowData.innerHTML = cartona;
    } else {
        console.error("Element with id 'rowData' not found.");
    }
}

let ingerMeals = [];

async function getIngrediant() {
    try {
        let result = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        let finalResult = await result.json();
        ingerMeals = finalResult.meals || [];
        console.log(ingerMeals);
        displayIngredients();
    } catch (error) {
        console.error("Error fetching Ingredient meals:", error);
    }
}

function displayIngredients() {
    let cartona = "";
    const maxItems = Math.min(ingerMeals.length, 25);
    for (let i = 0; i < maxItems; i++) {
        let description = (ingerMeals[i].strDescription || "").split(" ").slice(0, 4).join(" ");
        cartona += `
            <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ingerMeals[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${ingerMeals[i].strIngredient}</h3>
                    <p>${description}.</p>
                </div>
            </div>
        `;
    }
    let rowData = document.getElementById('rowData');
    if (rowData) {
        rowData.innerHTML = cartona;
    } else {
        console.error("Element with id 'rowData' not found.");
    }
}

let ingredientMeals = [];
async function getIngredientsMeals(ingredient) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        let data = await response.json();
        ingredientMeals = data.meals || [];
        console.log(ingredientMeals);
        displayIngrediantMeals(ingredientMeals);
    } catch (error) {
        console.error("Error fetching ingredient meals:", error);
    }
}

function displayIngrediantMeals(ingredient) {
    let cartona = "";
    for (let i = 0; i < ingredient.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div onclick="getMealDetailsById('${ingredient[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${ingredient[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${ingredient[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    let rowData = document.getElementById('rowData');
    if (rowData) {
        rowData.innerHTML = cartona;
    } else {
        console.error("Element with id 'rowData' not found.");
    }
}

async function getMealDetailsById(mealId) {
    try {
        $('.inner-loading-screen').removeClass("d-none").addClass("d-flex");
        let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let finalResult = await result.json();
        let mealDetails = finalResult.meals[0];

        let cartona = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${mealDetails.strMealThumb}" alt="">
            <h2>${mealDetails.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${mealDetails.strInstructions}</p>
            <h3><span class="fw-bolder">Area: </span>${mealDetails.strArea}</h3>
            <h3><span class="fw-bolder">Category: </span>${mealDetails.strCategory}</h3>
            <h3>Recipes:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${displayIngredients(mealDetails)}
            </ul>
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${mealDetails.strTags || 'No Tags'}</li>
            </ul>
            <a target="_blank" href="${mealDetails.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
        `;
        let rowData = document.getElementById('rowData');
        if (rowData) {
            rowData.innerHTML = cartona;
        } else {
            console.error("Element with id 'rowData' not found.");
        }
        $('.inner-loading-screen').removeClass("d-flex").addClass("d-none");
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}



getMeal();




function showContacts(){
    let cartona=``

    cartona+=`
               <div div class="contact min-vh-100 d-flex justify-content-center align-items-center" >
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="nameInput" onkeyup="inputsValidation(this)" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                    </div>
                    <div class="col-md-6">
                        <input id="emailInput" onkeyup="inputsValidation(this)" type="email" class="form-control " placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *exemple@yyy.com
                            </div>
                    </div>
                    <div class="col-md-6">
                        <input id="phoneInput" onkeyup="inputsValidation(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput" onkeyup="inputsValidation(this)" type="number" class="form-control " placeholder="Enter Your Age">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                    </div>
                    <div class="col-md-6">
                        <input id="passwordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                    </div>
                    <div class="col-md-6">
                        <input id="repasswordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Repassword">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword
                            </div>
                    </div>
                </div>
                <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
        </div >

    `
    rowData.innerHTML = cartona;

}

let userName = document.getElementById("nameInput");
let userEmail = document.getElementById("emailInput");
let userPhone = document.getElementById("phoneInput");
let userAge = document.getElementById("ageInput");
let userPassword = document.getElementById("passwordInput");
let userRePassword = document.getElementById("repasswordInput");

function inputsValidation(element){
    let regex={
        nameInput:/^[Aa-z]{3,10} [Aa-z]{3,10}$/,
        emailInput:/^[Aa-z]\@[a-z]\.com$/,
        phoneInput: /^(002|\+2)?01[0125][0-9]{8}$/,
        ageInput:/^[0-9]{1,2}$/,
        passwordInput:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        repasswordInput: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    }
    
    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.add("d-none")
        element.classList.remove('is-invalid')
        element.classList.add('is-valid')
        return true;
    } else {
        element.nextElementSibling.classList.remove("d-none")
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')

        return false

    }
    
}