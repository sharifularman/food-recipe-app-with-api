const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetaisContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event handler
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', ()=> {
    recipeCloseBtn.parentNode.classList.remove('showRecipe')
})

// get the meal list that matchces to the ingredients
function getMealList(){
    const searchInputText = document.getElementById('search-input').value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
   .then(response => response.json())
   .then(data =>{
       let html = "";
       if(data.meals){
           data.meals.forEach(meal => {
            html += `
            <div class="meal-item" data-id = "${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div> 
            </div>
            `;
           });
           mealList.classList.remove('notFound')
       }
       else{
        html = "Sorry, we Dont find your meal here";
        mealList.classList.add('notFound')
    }
       mealList.innerHTML = html; 
   })
};
// get recipe of the meal 
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        const mealItem = e.target.parentNode.parentNode;
        // console.log(mealItem);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => mealRecipeModal(data.meals[0]))
    }
}

// 

function mealRecipeModal(meal){
//  console.log(meal);
const html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruc">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>

    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>

    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `
    mealDetaisContent.innerHTML = html;
    mealDetaisContent.parentNode.classList.add('showRecipe')
    }