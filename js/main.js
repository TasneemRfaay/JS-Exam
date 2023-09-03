// loading
function ready() {
  $("#loading").slideUp(4000, function () {
    $("body").css("overflow-y", "scroll");
  });
}

// side NAV

let button = document.getElementById("btn");
let width = $(".sideNav").outerWidth();
console.log(width);

function open() {
  $(".rightSide").css({ left: width, transition: "all 1s" });
  $(".sideNav").css({
    left: "0",
    transition: "all 1s",
  });
  $("#btn").removeClass();
  $("#btn").addClass("fa-solid open-close-icon fa-2x fa-x");
}
function close() {
  $(".rightSide").css({ left: "0", transition: "all 1s" });
  $(".sideNav").css({
    left: -width,
    transition: "all 1s",
  });
  $("#btn").removeClass();
  $("#btn").addClass("fa-solid open-close-icon fa-2x fa-align-justify");
}
$("#btn").click(() => {
  console.log("clicked");
  if ($(".rightSide").css("left") == "0px") {
    open();
  } else {
    close();
  }
});
ready();
let catElement = `
   <div id="loading">
            <div class="d-flex justify-content-center align-items-center h-100">
              <i class="fa fa-spinner fa-spin text-white fa-4x "></i>
            </div>
  `;
$(".container-fluid .row").html(catElement);

let catElements;

// search
$("#search").click(() => {
  ready();
  catElement = `
   <div id="loading">
            <div class="d-flex justify-content-center align-items-center h-100">
              <i class="fa fa-spinner fa-spin text-white fa-4x "></i>
            </div>
  `;

  close();
  catElements = `
  <form>
  <input type="text" placeholder="Search By Name" id='name' >
  <input type="text" placeholder="Search Bt Letter" id='letter' maxlength="1">
  </form>
  `;
  $(".search").html(catElements);
  // search by name
  $("#name").keyup(async () => {
    target = $("#name").val();
    console.log(target);
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${target}`
    );
    let nameData = await res.json();
    console.log(nameData);
    let catElements = ``;
    if ($(nameData.meals).length == 0) {
      console.log("if");
      catElements = ``;
      $(".container-fluid .row").html(catElements);
    } else {
      for (let i = 0; i < nameData.meals.length; i++) {
        catElements += `
        <div class="col-md-3 col-12  m-auto position-relative my-2 " >
        <div class="layer position-absolute">
        <h3 class=" text-dark mt-5 " id="catName">${nameData.meals[i].strMeal}</h3>
        </div>
       <img src='${nameData.meals[i].strMealThumb}' class="w-100" class="catImg">
      </div> 
        `;
        $(".container-fluid .row").html(catElements);
      }
      $("h3").click((e) => {
        let tergetMeal = e.target;
        let meal = $(tergetMeal).text();

        mealClicked(meal);
      });
      return catElements;
    }
  });
  // search by letter
  $("#letter").keyup(async () => {
    targetL = $("#letter").val();
    let resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${targetL}`
    );
    let LetterData = await resp.json();
    console.log(LetterData);
    let catElementsL = ``;
    for (let i = 0; i < LetterData.meals.length; i++) {
      catElementsL += `
      <div class="col-md-3 col-12  m-auto position-relative my-2 " >
      <div class="layer position-absolute">
      <h2 class=" text-dark mt-5 " id="catName">${LetterData.meals[i].strMeal}</h2>
      </div>
     <img src='${LetterData.meals[i].strMealThumb}' class="w-100" class="catImg">
    </div> 
      `;
      $(".container-fluid .row").html(catElementsL);
    }
    $("h3").click((e) => {
      let tergetMeal = e.target;
      let meal = $(tergetMeal).text();

      mealClicked(meal);
    });
  });
});

// display categories
async function catergories() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let catergiresData = await response.json();
  ready();
  let catElement = `
   <div id="loading">
            <div class="d-flex justify-content-center align-items-center h-100">
              <i class="fa fa-spinner fa-spin text-white fa-4x "></i>
            </div>
  `;
  $(".container-fluid .row").html(catElement);
  return catergiresData;
}
$("#categories").click(async () => {
  close();
  catElements = ``;

  $(".search").html(catElements);

  let data = await catergories();
  catElement = ``;
  for (let i = 0; i < data.categories.length; i++) {
    // console.log(data.categories);
    catElement += `   <div class="col-md-3 col-12  m-2 position-relative " >
    <div class="layer position-absolute ">
    <h2 class="text-center text-dark mt-2 " id="catName">${data.categories[i].strCategory}</h2>
    <p class="m-3 overflow-hidden text-center" >${data.categories[i].strCategoryDescription}</p>
    </div>
    <img src="${data.categories[i].strCategoryThumb}" class="w-100" class="catImg">
   
  </div> `;
    $(".container-fluid .row").html(catElement);
    // console.log(data.categories[i].strCategoryThumb);
    // console.log(data.categories[i].strCategory);
  }
  $(".col-12").click((e) => {
    close();
    let target = e.target;
    let category = $(target).text();
    console.log(category);
    let finalCat = category;
    ready();
    let catElement = `
   <div id="loading">
            <div class="d-flex justify-content-center align-items-center h-100">
              <i class="fa fa-spinner fa-spin text-white fa-4x "></i>
            </div>
  `;
    $(".container-fluid .row").html(catElement);
    async function meals() {
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${finalCat}`
      );
      let mealsData = await res.json();
      console.log(mealsData);
      catElement = ``;
      for (let i = 0; i < mealsData.meals.length; i++) {
        catElement += `   <div class="col-md-3 col-12  m-2 position-relative " >
          <div class="layer position-absolute">
          <h3 class=" text-dark mt-5 " id="catName">${mealsData.meals[i].strMeal}</h3>

          </div>
         <img src='${mealsData.meals[i].strMealThumb}' class="w-100" class="catImg">

        </div> `;
        console.log(mealsData.meals[i].strMealThumb);
        $(".container-fluid .row").html(catElement);
      }
      $("h3").click((e) => {
        let tergetMeal = e.target;
        let meal = $(tergetMeal).text();

        mealClicked(meal);
      });
    }
    meals();
  });
});

// AREA
$("#area").click(async () => {
  catElements = ``;
  close();
  ready();
  let catElement = `
   <div id="loading">
            <div class="d-flex justify-content-center align-items-center h-100">
              <i class="fa fa-spinner fa-spin text-white fa-4x "></i>
            </div>
  `;
  $(".container-fluid .row").html(catElement);

  $(".search").html(catElements);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  catElement = ``;

  let areaData = await response.json();
  for (let i = 0; i < areaData.meals.length; i++) {
    catElement += `   <div class="col-md-3 col-12 d-flex flex-column text-white text-center mt-3" >

    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h2>${areaData.meals[i].strArea}</h2>


  </div> `;
    $(".container-fluid .row").html(catElement);
  }

  $(".col-12").click((e) => {
    close();
    let target = e.target;
    let targetArea = $(target).text();
    console.log(targetArea);
    async function mealsByArea() {
      catElement = ``;
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${targetArea}`
      );
      let mealsData = await res.json();
      console.log(mealsData);

      for (let i = 0; i < mealsData.meals.length; i++) {
        catElement += `   <div class="col-md-3 col-12  m-2 position-relative " >
          <div class="layer position-absolute">
          <h3 class=" text-dark mt-5 " id="catName">${mealsData.meals[i].strMeal}</h3>

          </div>
         <img src='${mealsData.meals[i].strMealThumb}' class="w-100" class="catImg">

        </div> `;
        console.log(mealsData.meals[i].strMealThumb);
        $(".container-fluid .row").html(catElement);
      }
      $("h3").click((e) => {
        let tergetMeal = e.target;
        let meal = $(tergetMeal).text();

        mealClicked(meal);
      });
    }
    mealsByArea();
  });
});

// ingrediantes
$("#Ingerdients").click(async () => {
  ready();
  let catElement = `
   <div id="loading">
            <div class="d-flex justify-content-center align-items-center h-100">
              <i class="fa fa-spinner fa-spin text-white fa-4x "></i>
            </div>
  `;
  $(".container-fluid .row").html(catElement);

  catElements = ``;
  close();
  $(".search").html(catElements);
  // console.log("ingerdients");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let ingerdientsData = await response.json();
  catElement = ``;
  for (let i = 0; i < 24; i++) {
    catElement += `
    <div id="ingredient" class="col-md-4 col-12 d-flex flex-column text-white text-center mt-3 h-25 overflow-hidden position-relative" >
<i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h2>${ingerdientsData.meals[i].strIngredient}</h2>
    <p class="">${ingerdientsData.meals[i].strDescription.slice(0, 200)}</p>

      </div> `;
    $(".container-fluid .row").html(catElement);
  }
  $("h2").click((e) => {
    close();
    let targetI = e.target;
    let targetIngrediante = $(targetI).text();
    console.log("hi");
    console.log(targetIngrediante);
    catElement = ``;
    async function mealsByIngradients() {
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${targetIngrediante}`
      );
      let mealsData = await res.json();
      console.log(mealsData);

      for (let i = 0; i < mealsData.meals.length; i++) {
        catElement += `   <div class="col-md-3 col-12  m-2 position-relative " >
            <div class="layer position-absolute">
            <h3 class=" text-dark mt-5 " id="catName">${mealsData.meals[i].strMeal}</h3>

            </div>
           <img src='${mealsData.meals[i].strMealThumb}' class="w-100" class="catImg">

          </div> `;
        console.log(mealsData.meals[i].strMealThumb);
        $(".container-fluid .row").html(catElement);
      }
      $("h3").click((e) => {
        let tergetMeal = e.target;
        let meal = $(tergetMeal).text();

        mealClicked(meal);
      });
    }
    mealsByIngradients();
  });
});

// ContactUs
$("#contactUS").click(() => {
  catElements = ``;
  catElement = ``;
  close();
  $(".search").html(catElements);
  catElement = `
  <div class="col-12">
  <form>
  <div class="contact mt-5 h-75 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row gx-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
  </form>
  </div>
  `;
  $(".container-fluid .row").html(catElement);
  // ----------------------

  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<li>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
// --------------------------------
// $("body").click((e) => {
//   console.log(e.target);
// });

async function mealClicked(ele) {
  catElement = ``;
  $(".container-fluid .row").html(catElement);
  console.log(ele);
  let respo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${ele}`
  );
  let mealData = await respo.json();
  console.log(mealData);
  catElement = `
<div class="col-md-8 text-white">
  <h2>Instructions</h2>
  <p>${mealData.meals[0].strInstructions}</p>
  <h3><span class="fw-bolder">Area : </span>${mealData.meals[0].strArea}</h3>
  <h3><span class="fw-bolder">Category : </span>${mealData.meals[0].strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure1} ${mealData.meals[0].strIngredient1}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure2} ${mealData.meals[0].strIngredient2}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure3} ${mealData.meals[0].strIngredient3}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure4} ${mealData.meals[0].strIngredient4}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure5} ${mealData.meals[0].strIngredient5}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure6} ${mealData.meals[0].strIngredient6}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure7} ${mealData.meals[0].strIngredient7}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure8} ${mealData.meals[0].strIngredient8}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure9} ${mealData.meals[0].strIngredient9}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure10} ${mealData.meals[0].strIngredient10}</li>
    <li class="alert alert-info m-2 p-1">${mealData.meals[0].strMeasure11} ${mealData.meals[0].strIngredient11}</li>


    
  </ul>

  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
      <li>${mealData.meals[0].strTags}</li>
  </ul>

  <a target="_blank" href="${mealData.meals[0].strSource}" class="btn btn-success">Source</a>
  <a target="_blank" href="${mealData.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
</div>
<div class="col-md-4">
  <img class="w-100 rounded-3" src="${mealData.meals[0].strMealThumb}" alt="">
      <h2>${mealData.meals[0].strMeal}</h2>
</div>
`;
  $(".container-fluid .row").html(catElement);
}
