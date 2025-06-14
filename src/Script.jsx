console.log("Script.jsx is running");
const container = document.getElementById("mealContainer");

fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then((res) => res.json())
  .then((data) => {
    const meals = data.meals;
    console.log(meals);
    meals.forEach((meal) => {
      console.log("hello " + meal.strMealThumb);
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden";

      card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">${meal.strMeal}</h3>
            <p class="text-sm text-gray-600 mb-2">${meal.strCategory} | ${meal.strArea}</p>
            <a href="${meal.strYoutube}" target="_blank" class="text-blue-500 text-sm hover:underline">▶ Watch Recipe</a>
          </div>
        `;

      container.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
    container.innerHTML =
      '<p class="text-red-500 col-span-full text-center">Failed to load meals.</p>';
  });
