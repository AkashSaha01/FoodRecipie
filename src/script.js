console.log("script.js is running");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("mealContainer");
  const loader = document.getElementById("grid-loader");
  const searchInput = document.querySelector("input[type='text']");
  const searchButton = document.getElementById("SearchButton");

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.remove("hidden");
    } else {
      scrollTopBtn.classList.add("hidden");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  fetchMeals("");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      fetchMeals(query);
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  function fetchMeals(foodName) {
    loader.style.display = "flex";
    container.classList.add("hidden");
    container.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
      .then((res) => res.json())
      .then((data) => {
        const meals = data.meals;

        loader.style.display = "none";
        container.classList.remove("hidden");

        if (!meals) {
          container.innerHTML =
            '<p class="text-red-500 col-span-full text-center">No meals found.</p>';
          return;
        }

        meals.forEach((meal) => {
          const card = document.createElement("div");
          card.className =
            "bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden";

          card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-bold mb-1">${meal.strMeal}</h3>
              <p class="text-sm text-gray-600 mb-2">${meal.strCategory} | ${meal.strArea}</p>
             <button class="view-details bg-yellow-600 py-1 px-2 rounded text-white">View Details</button>

            </div>
          `;

          container.appendChild(card);
          const button = card.querySelector(".view-details");
          button.addEventListener("click", () => {
            modalImg.src = meal.strMealThumb;
            modalTitle.textContent = meal.strMeal;
            modalCategory.textContent = `${meal.strCategory} | ${meal.strArea}`;
            modalInstructions.textContent =
              meal.strInstructions || "No instructions available.";
            modal.classList.remove("hidden");
          });
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        loader.style.display = "none";
        container.classList.remove("hidden");
        container.innerHTML =
          '<p class="text-red-500 col-span-full text-center">Failed to load meals.</p>';
      });
  }

  const modal = document.getElementById("mealModal");
  const closeModal = document.getElementById("closeModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalInstructions = document.getElementById("modalInstructions");

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
