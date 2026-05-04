//* TO DO //
//// fix bug: below min scores breaking and not populating
//// Need to accumulate scores for total
//// add in WHtR calculator
//// implement exempt statuses
//// maxPoints will need to be subtracted
//// input validation w/regex
//// add in options buttons on UI
//* get UI animation on scores to work
//// add in min and max calculations
//* add in shuttle levels
//* create excellent, satisfactory & unsatisfactory labels
//// WHtR ratio UI
//// redesign - MOBILE FIRST/RESPONSIVE

// DOM refs — inputs
const cardioInput   = document.getElementById("cardio-input");
const cardioLabel   = document.getElementById("cardio-label");
const strengthInput = document.getElementById("strength-input");
const strengthLabel = document.getElementById("strength-label");
const coreInput     = document.getElementById("core-input");
const coreLabel     = document.getElementById("core-label");
const heightInput   = document.getElementById("height");
const waistInput    = document.getElementById("waist");

// DOM refs — exempt checkboxes
const exemptCardio   = document.getElementById("exempt-cardio");
const exemptStrength = document.getElementById("exempt-strength");
const exemptCore     = document.getElementById("exempt-core");
const exemptBodyComp = document.getElementById("exempt-body-comp");

// User profile
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

// Mobile tab buttons
document.getElementById("tab-score").addEventListener("click", () => {
  document.getElementById("left-div").classList.remove("hidden");
  document.getElementById("tab-score").classList.add("selected");
  document.getElementById("right-div").classList.add("hidden");
  document.getElementById("tab-results").classList.remove("selected");
});
document.getElementById("tab-results").addEventListener("click", () => {
  document.getElementById("right-div").classList.remove("hidden");
  document.getElementById("tab-results").classList.add("selected");
  document.getElementById("left-div").classList.add("hidden");
  document.getElementById("tab-score").classList.remove("selected");
});

// Window resize
const desktopQuery = window.matchMedia("(min-width: 700px)");

function handleBreakpoint(e) {
  if (e.matches) {
    document.getElementById("right-div").classList.remove("hidden");
    document.getElementById("left-div").classList.remove("hidden");
  } else {
    document.getElementById("right-div").classList.add("hidden");
    document.getElementById("left-div").classList.remove("hidden");
  }
}

handleBreakpoint(desktopQuery);
desktopQuery.addEventListener("change", handleBreakpoint);

// Gender buttons 
document.getElementById("gender-div").addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  userProfile.gender = e.target.value;
  document.querySelectorAll("#gender-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  getScores(); setScores();
});

// Age group buttons 
document.getElementById("age-div").addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  userProfile.ageGroup = e.target.value;
  document.querySelectorAll("#age-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  getScores(); setScores();
});

// Exempt checkboxes
function setupExempt(checkbox, overlaySelector) {
  checkbox.addEventListener("change", (e) => {
    document.querySelector(overlaySelector).classList.toggle("hidden", !e.target.checked);
    e.target.closest(".comp-header").classList.toggle("is-exempt", e.target.checked);
    getScores(); setScores();
  });
}

setupExempt(exemptCardio,   "#cardio-div .exempt-overlay");
setupExempt(exemptStrength, "#strength-div .exempt-overlay");
setupExempt(exemptCore,     "#core-div .exempt-overlay");
setupExempt(exemptBodyComp, "#body-comp-grid .exempt-overlay");

// Exercise button configs
const cardioConfig = {
  "two-mile": { exercise: "twoMile", placeholder: "min:sec", label: "Run time" },
  "hamr":     { exercise: "hamr",    placeholder: "reps",    label: "HAMR shuttles" },
};
const strengthConfig = {
  "push-ups":     { exercise: "pushUps",     label: "Reps in 1 min" },
  "hand-release": { exercise: "handRelease", label: "Reps in 2 min" },
};
const coreConfig = {
  "sit-ups":   { exercise: "sitUps",                placeholder: "reps",    label: "Reps in 1 min" },
  "cross-leg": { exercise: "crossLegReverseCrunch", placeholder: "reps",    label: "Reps in 2 min" },
  "plank":     { exercise: "plank",                 placeholder: "min:sec", label: "Plank Time" },
};

document.getElementById("cardio-btns-div").addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const cfg = cardioConfig[e.target.id];
  if (!cfg) return;
  document.querySelectorAll("#cardio-btns-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  userProfile.cardioExercise = cfg.exercise;
  cardioInput.placeholder = cfg.placeholder;
  cardioLabel.textContent = cfg.label;
  cardioInput.value = "";
  clearInputError(cardioInput);
  getScores(); setScores();
});

document.getElementById("strength-btns-div").addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const cfg = strengthConfig[e.target.id];
  if (!cfg) return;
  document.querySelectorAll("#strength-btns-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  userProfile.strengthExercise = cfg.exercise;
  strengthLabel.textContent = cfg.label;
  strengthInput.value = "";
  clearInputError(strengthInput);
  getScores(); setScores();
});

document.getElementById("core-btns-div").addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  const cfg = coreConfig[e.target.id];
  if (!cfg) return;
  document.querySelectorAll("#core-btns-div button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  userProfile.coreExercise = cfg.exercise;
  coreInput.placeholder = cfg.placeholder;
  coreLabel.textContent = cfg.label;
  coreInput.value = "";
  clearInputError(coreInput);
  getScores(); setScores();
});

// Input change listeners
[cardioInput, strengthInput, coreInput, waistInput, heightInput].forEach(input => {
  input.addEventListener("change", () => { validateAndShow(input); getScores(); setScores(); });
  input.addEventListener("input",  () => { if (input.value.trim()) clearInputError(input); });
});

// Validation rules per exercise key
const validationRules = {
  twoMile:               { pattern: /^\d{4}$/,             extraCheck: v => Number(v) >= 1000, msg: "Enter 4 digits (e.g. 1430 = 14:30)" },
  hamr:                  { pattern: /^\d{1,3}$/,            msg: "Enter 1–3 digits (e.g. 67)" },
  pushUps:               { pattern: /^\d{1,2}$/,            msg: "Enter 1–2 digits (e.g. 42)" },
  handRelease:           { pattern: /^\d{1,2}$/,            msg: "Enter 1–2 digits (e.g. 42)" },
  sitUps:                { pattern: /^\d{1,2}$/,            msg: "Enter 1–2 digits (e.g. 42)" },
  crossLegReverseCrunch: { pattern: /^\d{1,2}$/,            msg: "Enter 1–2 digits (e.g. 42)" },
  plank:                 { pattern: /^\d{2,3}$/,            msg: "Enter 2–3 digits (e.g. 130 = 1:30)" },
  bodyComp:              { pattern: /^\d{2}$/,              msg: "Enter inches (e.g. 65)" },
};

function getExerciseKey(inputEl) {
  if (inputEl === cardioInput)   return userProfile.cardioExercise;
  if (inputEl === strengthInput) return userProfile.strengthExercise;
  if (inputEl === coreInput)     return userProfile.coreExercise;
  return "bodyComp";
}

function isValidInput(inputEl) {
  const val = inputEl.value.trim();
  if (!val) return null; // null = empty, not an error
  const rule = validationRules[getExerciseKey(inputEl)];
  return rule.pattern.test(val) && (!rule.extraCheck || rule.extraCheck(val));
}

function showInputError(inputEl, msg) {
  const errorEl = document.getElementById(inputEl.id + "-error");
  inputEl.classList.add("input-error");
  if (errorEl) { errorEl.textContent = msg; errorEl.classList.remove("hidden"); }
}

function clearInputError(inputEl) {
  const errorEl = document.getElementById(inputEl.id + "-error");
  inputEl.classList.remove("input-error");
  if (errorEl) { errorEl.textContent = ""; errorEl.classList.add("hidden"); }
}

function validateAndShow(inputEl) {
  const val = inputEl.value.trim();
  if (!val) { clearInputError(inputEl); return; }
  const key = getExerciseKey(inputEl);
  const rule = validationRules[key];
  const valid = rule.pattern.test(val) && (!rule.extraCheck || rule.extraCheck(val));
  valid ? clearInputError(inputEl) : showInputError(inputEl, rule.msg);
}

// Utility functions
function convertTime(x) {
  const min = Math.floor(x / 100);
  const sec = x % 100;
  return min * 60 + sec;
}

function formatTime(totalSeconds) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function getMaxPoints() {
  return 100
    - (exemptCardio.checked   ? 50 : 0)
    - (exemptStrength.checked ? 15 : 0)
    - (exemptCore.checked     ? 15 : 0)
    - (exemptBodyComp.checked ? 20 : 0);
}

function lookupPoints(entries, score, lowerIsBetter = false) {
  const match = entries.find(lowerIsBetter
    ? t => score <= t.threshold
    : t => score >= t.threshold
  );
  return match?.points ?? 0;
}

function getScores() {
  const { gender, ageGroup: age, cardioExercise: cardioEx, strengthExercise: strengthEx, coreExercise: coreEx } = userProfile;
  const table = scoreTable[gender][age];

  // Cardio
  if (exemptCardio.checked) {
    userProfile.cardioScore = 0;
    userProfile.cardioPoints = 0;
  } else if (isValidInput(cardioInput)) {
    const cardioRaw = Number(cardioInput.value.trim());
    const cardioScore = cardioEx === "twoMile" ? convertTime(cardioRaw) : cardioRaw;
    userProfile.cardioScore = cardioScore;
    userProfile.cardioPoints = lookupPoints(table[cardioEx], cardioScore, cardioEx === "twoMile");
  } else {
    userProfile.cardioScore = 0;
    userProfile.cardioPoints = 0;
  }

  // Strength
  if (exemptStrength.checked) {
    userProfile.strengthScore = 0;
    userProfile.strengthPoints = 0;
  } else if (isValidInput(strengthInput)) {
    const strengthScore = Number(strengthInput.value.trim());
    userProfile.strengthScore = strengthScore;
    userProfile.strengthPoints = lookupPoints(table[strengthEx], strengthScore);
  } else {
    userProfile.strengthScore = 0;
    userProfile.strengthPoints = 0;
  }

  // Core
  if (exemptCore.checked) {
    userProfile.coreScore = 0;
    userProfile.corePoints = 0;
  } else if (isValidInput(coreInput)) {
    const coreRaw = Number(coreInput.value.trim());
    const coreScore = coreEx === "plank" ? convertTime(coreRaw) : coreRaw;
    userProfile.coreScore = coreScore;
    userProfile.corePoints = lookupPoints(table[coreEx], coreScore);
  } else {
    userProfile.coreScore = 0;
    userProfile.corePoints = 0;
  }

  // WHtR
  if (exemptBodyComp.checked) {
    userProfile.WHtRScore = 0;
    userProfile.WHtRPoints = 0;
  } else if (isValidInput(heightInput) && isValidInput(waistInput)) {
    const ratio = (Number(waistInput.value.trim()) / Number(heightInput.value.trim())).toFixed(2);
    userProfile.WHtRScore = ratio;
    userProfile.WHtRPoints = lookupPoints(WHtRTable, ratio, true);
  } else {
    userProfile.WHtRScore = 0;
    userProfile.WHtRPoints = 0;
  }

  // Total
  const { cardioPoints, strengthPoints, corePoints, WHtRPoints } = userProfile;
  userProfile.totalPoints = Math.floor(((cardioPoints + strengthPoints + corePoints + WHtRPoints) / getMaxPoints()) * 100);
}

function setMinMax() {
  const { gender, ageGroup: age, cardioExercise: cardioEx, strengthExercise: strengthEx, coreExercise: coreEx } = userProfile;
  const table = scoreTable[gender][age];

  function updateBar(entries, minSpanId, maxSpanId, fillId, userScore, lowerIsBetter, isTime) {
    const best = entries[0].threshold;
    const worst = entries[entries.length - 1].threshold;
    document.getElementById(minSpanId).textContent = `Min: ${isTime ? formatTime(worst) : worst}`;
    document.getElementById(maxSpanId).textContent = `Max: ${isTime ? formatTime(best)  : best}`;
    let percent = 0;
    if (userScore > 0) {
      percent = lowerIsBetter
        ? (worst - userScore) / (worst - best) * 100
        : (userScore - worst) / (best - worst) * 100;
      percent = Math.max(0, Math.min(100, percent));
    }
    document.getElementById(fillId).style.width = percent + '%';
  }

  updateBar(table[cardioEx],   'cardio-min',   'cardio-max',   'cardio-fill',   userProfile.cardioScore,   cardioEx === 'twoMile', cardioEx === 'twoMile');
  updateBar(table[strengthEx], 'strength-min', 'strength-max', 'strength-fill', userProfile.strengthScore, false,                  false);
  updateBar(table[coreEx],     'core-min',     'core-max',     'core-fill',     userProfile.coreScore,     false,                  coreEx === 'plank');
  updateBar(WHtRTable, 'body-comp-min', 'body-comp-max', 'body-comp-fill', userProfile.WHtRScore, false,                  false);
}

function setScores() {
  const whtrEntered = heightInput.value.trim() && waistInput.value.trim();

  document.getElementById("cardio").textContent    = exemptCardio.checked   ? "Exempt" : (cardioInput.value.trim()   ? userProfile.cardioPoints   : "-");
  document.getElementById("strength").textContent  = exemptStrength.checked ? "Exempt" : (strengthInput.value.trim() ? userProfile.strengthPoints : "-");
  document.getElementById("endurance").textContent = exemptCore.checked     ? "Exempt" : (coreInput.value.trim()     ? userProfile.corePoints     : "-");
  document.getElementById("whtr").textContent      = exemptBodyComp.checked ? "Exempt" : (whtrEntered                ? userProfile.WHtRPoints     : "-");

  const anyInputEntered = exemptCardio.checked || exemptStrength.checked || exemptCore.checked || exemptBodyComp.checked
    || cardioInput.value.trim() || strengthInput.value.trim() || coreInput.value.trim() || whtrEntered;
  document.getElementById("score-points").textContent = anyInputEntered ? userProfile.totalPoints : "-";

  setMinMax();
}

// Populate min/max on page load with default profile (male, under25)
setMinMax();

function animateScoreRing(score) {
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
  animateNumber('composite-score', score);
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
} 
