//OBJECTS: male and female //
//OBJECT-PROPERTIES: under25 / age25to29 / age30to34 / age35to39 / age40to44 / age45to49 / age50to54 / age55to59 / over60 //
//AGE GROUP PROPERTIES: / twoMile / hamr / pushUps / handRelease / sitUps / crossLegReverseCrunch /  plank //
//EXERCISE PROPERTIES: / threshold / points //

//* TO DO //
/// Below min scores breaking and not populating
/// Need to accumulate scores for total
/// add in WHtR calculator
//* implement exempt statuses
//* maxPoints will need to be subtracted
//* increase and decrease buttons
/// add in options buttons on UI
//* get UI animation on scores to work
//* add in min and max calculations
//* add in shuttle levels
//* create excellent, satisfactory & unsatisfactory labels
/// WHtR ratio UI
/// redesign - MOBILE FIRST/RESPONSIVE

//User profile
const userProfile = {
  ageGroup: "under25",
  gender: "male",
  cardioExercise: "twoMile",
  cardioPoints: 0,
  cardioScore: 0,
  strengthExercise: "pushUps",
  strengthPoints: 0,
  strengthScore: 0,
  coreExercise: "sitUps",
  coreScore: 0,
  corePoints: 0,
  WHtRScore: 0,
  WHtRPoints: 0,
  totalPoints: 0,
};

//Variables
let maxPoints = 100;
let cardioInput = document.getElementById("cardio-input");
let cardioLabel = document.getElementById("cardio-label");
let strengthInput = document.getElementById("strength-input");
let strengthLabel = document.getElementById("strength-label");
let coreInput = document.getElementById("core-input");
let coreLabel = document.getElementById("core-label");
let heightInput = document.getElementById("height");
let waistInput = document.getElementById("waist");

//Mobile Tab Buttons
document.getElementById("tab-score").addEventListener("click", (e) => {
document.getElementById("left-div").classList.remove("hidden");
document.getElementById("tab-score").classList.add("selected");
document.getElementById("right-div").classList.add("hidden");
document.getElementById("tab-results").classList.remove("selected");

});
document.getElementById("tab-results").addEventListener("click", (e) => {
document.getElementById("right-div").classList.remove("hidden");
document.getElementById("tab-results").classList.add("selected");
document.getElementById("left-div").classList.add("hidden");
document.getElementById("tab-score").classList.remove("selected");

});

//window resize and unhide divs
const desktopQuery = window.matchMedia("(min-width: 700px)");

function handleBreakpoint(e) {
  if (e.matches) {
    // desktop: show both
    document.getElementById("right-div").classList.remove("hidden");
    document.getElementById("left-div").classList.remove("hidden");
  } else {
    // mobile: hide right, show left (default to scores tab)
    document.getElementById("right-div").classList.add("hidden");
    document.getElementById("left-div").classList.remove("hidden");
  }
}

// Run on load
handleBreakpoint(desktopQuery);

// Run whenever window crosses the 700px breakpoint
desktopQuery.addEventListener("change", handleBreakpoint);


//Male Button
document.getElementById("male").addEventListener("click", (e) => {
  userProfile.gender = e.target.value;
    document.getElementById("female").classList.remove("active");
    e.target.classList.add("active");
    getScores();setScores();
  console.log("Profile gender updated:", userProfile.gender);
});
//Female Button
document.getElementById("female").addEventListener("click", (e) => {
  userProfile.gender = e.target.value;
    document.getElementById("male").classList.remove("active");
    e.target.classList.add("active");
    getScores();setScores();
  console.log("Profile gender updated:", userProfile.gender);
});

// AGE GROUP BUTTONS
// under25
document.getElementById("under25").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age25to29
document.getElementById("age25to29").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age30to34
document.getElementById("age30to34").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age35to39
document.getElementById("age35to39").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age40to44
document.getElementById("age40to44").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age45to49
document.getElementById("age45to49").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age50to54
document.getElementById("age50to54").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// age55to59
document.getElementById("age55to59").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
// over60
document.getElementById("over60").addEventListener("click", (e) => {
userProfile.ageGroup = e.target.value;
document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
e.target.classList.add("active");
getScores();setScores();
  console.log("Profile age updated:", userProfile.ageGroup);
});
///////////////////

// EXEMPT BUTTONS
// cardio section
document.getElementById("exempt-cardio").addEventListener("change", (e) => {
  document.querySelector("#cardio-div .exempt-overlay").classList.toggle("hidden", !e.target.checked);
  e.target.closest(".comp-header").classList.toggle("is-exempt", e.target.checked);
  
});
// strength section
document.getElementById("exempt-strength").addEventListener("change", (e) => {
  document.querySelector("#strength-div .exempt-overlay").classList.toggle("hidden", !e.target.checked);
  e.target.closest(".comp-header").classList.toggle("is-exempt", e.target.checked);
});
// core section
document.getElementById("exempt-core").addEventListener("change", (e) => {
  document.querySelector("#core-div .exempt-overlay").classList.toggle("hidden", !e.target.checked);
  e.target.closest(".comp-header").classList.toggle("is-exempt", e.target.checked);
});
// Body Comp 
document.getElementById("exempt-body-comp").addEventListener("change", (e) => {
  document.querySelector("#body-comp-grid .exempt-overlay").classList.toggle("hidden", !e.target.checked);
  e.target.closest(".comp-header").classList.toggle("is-exempt", e.target.checked);
});
///////////////////

// EXERCISE BUTTONS
//2 mile button//
document.getElementById("two-mile").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.getElementById("hamr").classList.remove("active");
  userProfile.cardioExercise = "twoMile";
  cardioInput.setAttribute("placeholder", "min:sec");
  cardioLabel.innerHTML = "Run time";
  getScores();setScores();
  console.log("Profile cardio updated:", userProfile.cardioExercise);
});

//hamr button//
document.getElementById("hamr").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.getElementById("two-mile").classList.remove("active");
  userProfile.cardioExercise = "hamr";
  cardioInput.setAttribute("placeholder", "reps");
  cardioLabel.innerHTML = "HAMR shuttles";
  getScores();setScores();
  console.log("Profile cardio ex updated:", userProfile.cardioExercise);
});

//pushups button
document.getElementById("push-ups").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.getElementById("hand-release").classList.remove("active");
  userProfile.strengthExercise = "pushUps";
  strengthLabel.innerHTML = "Reps in 1 min";
  getScores();setScores();
  console.log("Profile strength ex updated:", userProfile.strengthExercise);
});

//hand release button
document.getElementById("hand-release").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.getElementById("push-ups").classList.remove("active");
  userProfile.strengthExercise = "handRelease";
  strengthLabel.innerHTML = "Reps in 2 min";
  getScores();setScores();
  console.log("Profile strength ex updated:", userProfile.strengthExercise);
});

//situps button
document.getElementById("sit-ups").addEventListener("click", (e) => {
  document.querySelectorAll("#core-btns-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  userProfile.coreExercise = "sitUps";
  coreInput.setAttribute("placeholder", "reps");
  coreLabel.innerHTML = "Reps in 1 min";
  getScores();setScores();
  console.log("Profile core ex updated:", userProfile.coreExercise);
});

//cross-leg button
document.getElementById("cross-leg").addEventListener("click", (e) => {
  document.querySelectorAll("#core-btns-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  userProfile.coreExercise = "crossLegReverseCrunch";
  coreInput.setAttribute("placeholder", "reps");
  coreLabel.innerHTML = "Reps in 2 min";
  getScores();setScores();
  console.log("Profile core ex updated:", userProfile.coreExercise);
});

//plank button
document.getElementById("plank").addEventListener("click", (e) => {
  document.querySelectorAll("#core-btns-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  userProfile.coreExercise = "plank";
  coreInput.setAttribute("placeholder", "min:sec");
  coreLabel.innerHTML = "Plank Time (mm:ss)";
  getScores();setScores();
  console.log("Profile core ex updated:", userProfile.coreExercise);
});

//event listeners for inputs
cardioInput.addEventListener("change", (e) => {
getScores(); setScores();
});
strengthInput.addEventListener("change", (e) => {
getScores(); setScores();
});
coreInput.addEventListener("change", (e) => {
getScores(); setScores();
});
waistInput.addEventListener("change", (e) => {
getScores(); setScores();
});
heightInput.addEventListener("change", (e) => {
getScores(); setScores();
});

//convert function
convertTime = (x) => {
  let min = Math.floor(x / 100);
  let sec = x % 100;
  return min * 60 + sec;
};

//function to get scores
getScores = () => {
  //Variables//
  let gender = userProfile.gender;
  let age = userProfile.ageGroup;
  let strengthEx = userProfile.strengthExercise;
  let cardioEx = userProfile.cardioExercise;
  let coreEx = userProfile.coreExercise;
  //Cardio
  let cardioRaw = Number(document.getElementById("cardio-input").value);
  let cardioScore = cardioEx === "twoMile" ? convertTime(cardioRaw) : cardioRaw;
  userProfile.cardioScore = cardioScore;
  let matchCardio = scoreTable[gender][age][cardioEx].find(
    cardioEx === "twoMile"
      ? (t) => cardioScore <= t.threshold
      : (t) => cardioScore >= t.threshold,
  ); 
  let cardioPoints = matchCardio ? matchCardio.points : 0;
  userProfile.cardioPoints = cardioPoints;
  //Strength
  let strengthScore = Number(document.getElementById("strength-input").value);
  userProfile.strengthScore = strengthScore;
  let matchStrength = scoreTable[gender][age][strengthEx].find(
    (t) => strengthScore >= t.threshold,
  );
  let strengthPoints = matchStrength ? matchStrength.points : 0;
  userProfile.strengthPoints = strengthPoints;
   //Core
  let coreRaw = Number(document.getElementById("core-input").value);
  let coreScore = coreEx === "plank" ? convertTime(coreRaw) : coreRaw;
  userProfile.coreScore = coreScore;
  let matchCore = scoreTable[gender][age][coreEx].find(
    (t) => coreScore >= t.threshold,
  );
  let corePoints = matchCore ? matchCore.points : 0;
  userProfile.corePoints = corePoints;
  //WHtR
  let WHtRHeight = Number(document.getElementById("height").value);
  let WHtRWaist = Number(document.getElementById("waist").value);
  userProfile.WHtRScore = (WHtRWaist / WHtRHeight).toFixed(2);
  let matchWHtR = WHtRTable.find((t) => userProfile.WHtRScore <= t.threshold);
  let WHtRPoints = matchWHtR ? matchWHtR.points : 0;
  userProfile.WHtRPoints = WHtRPoints;
  //Total
  userProfile.totalPoints =
    cardioPoints + strengthPoints + corePoints + WHtRPoints;
};

//function to place score in inner HTML
setScores = () => {
  //output core
  document.getElementById("cardio").innerHTML = userProfile.cardioPoints;
  document.getElementById("strength").innerHTML = userProfile.strengthPoints;
  document.getElementById("endurance").innerHTML = userProfile.corePoints;
  document.getElementById("whtr").innerHTML = userProfile.WHtRPoints;
  document.getElementById("score-points").innerHTML = userProfile.totalPoints;
  document.getElementById("total-possible").innerHTML = `/ ${maxPoints}`;
};

/*function animateScoreRing(score) {
  const circumference = 264;
  const ring = document.getElementById('score-ring');

  // calculate how much of the ring to fill
  const fillAmount = (totalPoints / maxPoints) * circumference;
  const offset = circumference - fillAmount;

  // set the offset — CSS transition handles the animation
  ring.style.strokeDashoffset = offset;

  // change color based on score rating
  if (totalPoints >= 90) {
    ring.style.stroke = '#639922';      // green — excellent
  } else if (totalPoints >= 75) {
    ring.style.stroke = '#639922';      // green — satisfactory
  }  else {
    ring.style.stroke = '#e24b4a';      // red — unsatisfactory
  }

  // animate the number counting up
  animateNumber('score-num', score);
}

function animateNumber(id, target) {
  const el = document.getElementById(id);
  const duration = 1000; // ms
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out — slows down as it reaches target
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * eased;
    el.textContent = current.toFixed(1);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
} */
