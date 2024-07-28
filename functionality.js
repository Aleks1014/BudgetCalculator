function minusForInput(event) {
  if (event.key === '-' || event.key==='.') {
    event.preventDefault();
  }
}


function checkInput() {
  const inputFields = document.querySelectorAll('input[type="number"]');
  console.log(inputFields);

  inputFields.forEach(function (input) {
    input.addEventListener('keypress', minusForInput);
  });
};



function calculateCategoryExpenses(category) {
  const categoryExpenses = document.getElementsByClassName(category);
  let total = 0;
  for (let i = 0; i < categoryExpenses.length; i++) {
    total += parseInt(categoryExpenses[i].value || 0);
  }
  return total;
}

function createProgressContainer(percentage) {
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.textContent = percentage;
  progressBar.style.width = percentage;
  progressContainer.appendChild(progressBar);
  return progressContainer;
}

function createSummaryText(label, amount) {
  const summaryText = document.createElement("p");
  summaryText.textContent = `${label}: £${amount}`;
  return summaryText;
}

function createSummary(
  homeExpenses,
  familyExpenses,
  lifestyleExpenses,
  otherExpenses,
  percentages
) {
  const categoriesSummary = document.getElementById("categories-summary");
  const homeSummary = createSummaryText("Home", homeExpenses);
  categoriesSummary.appendChild(homeSummary);
  const homeProgress = createProgressContainer(percentages["home"]);
  categoriesSummary.appendChild(homeProgress);
  const familySummary = createSummaryText("Family", familyExpenses);
  categoriesSummary.appendChild(familySummary);
  const familyProgress = createProgressContainer(percentages["family"]);
  categoriesSummary.appendChild(familyProgress);
  const lifestyleSummary = createSummaryText("Lifestyle", lifestyleExpenses);
  categoriesSummary.appendChild(lifestyleSummary);
  const lifestyleProgress = createProgressContainer(percentages["lifestyle"]);
  categoriesSummary.appendChild(lifestyleProgress);
  const otherSummary = createSummaryText("Other", otherExpenses);
  categoriesSummary.appendChild(otherSummary);
  const otherProgress = createProgressContainer(percentages["other"]);
  categoriesSummary.appendChild(otherProgress);
}

function calculatePercentages(total, home, family, lifestyle, other) {
  const percentages = {};
  const homePercentage = ((home / total) * 100 || 0).toFixed(2) + "%";
  percentages["home"] = homePercentage;
  const familyPercentage = ((family / total) * 100 || 0).toFixed(2) + "%";
  percentages["family"] = familyPercentage;
  const lifestylePercentage = ((lifestyle / total) * 100 || 0).toFixed(2) + "%";
  percentages["lifestyle"] = lifestylePercentage;
  const otherPercentage = ((other / total) * 100 || 0).toFixed(2) + "%";
  percentages["other"] = otherPercentage;
  return percentages;
}

function addSummary(income, expenses, balance) {
  const summary = document.getElementById("summary");
  const summaryIncome = document.createElement("p");
  summaryIncome.textContent = `Income: £ ${income}.00`;
  summary.appendChild(summaryIncome);
  const totalExpenses = document.createElement("p");
  totalExpenses.textContent = `Expenses: £ ${expenses}.00`;
  summary.appendChild(totalExpenses);
  const balanceSummary = document.createElement("p");
  balanceSummary.textContent = `Balance: £ ${balance}.00`;
  summary.appendChild(balanceSummary);
  if (balance < 0) {
    balanceSummary.style.color = "red";
  } else if (balance <= 200) {
    balanceSummary.style.color = "orange";
  } else {
    balanceSummary.style.color = "green";
  }
}

function showResult() {
  const totalIncome = calculateCategoryExpenses("income-amount");
  const homeExpenses = calculateCategoryExpenses("home-amount");
  const familyExpenses = calculateCategoryExpenses("family-amount");
  const lifestyleExpenses = calculateCategoryExpenses("lifestyle-amount");
  const otherExpenses = calculateCategoryExpenses("other-amount");
  const totalExpenses =
    homeExpenses + familyExpenses + lifestyleExpenses + otherExpenses;
  const percentages = calculatePercentages(
    totalExpenses,
    homeExpenses,
    familyExpenses,
    lifestyleExpenses,
    otherExpenses
  );
  const balance = totalIncome - totalExpenses;
  addSummary(totalIncome, totalExpenses, balance);
  document.getElementById("see-details").disabled = true;
  createSummary(
    homeExpenses,
    familyExpenses,
    lifestyleExpenses,
    otherExpenses,
    percentages
  );
  document.getElementById("summary").removeAttribute("hidden");
  document.getElementById("categories-summary").removeAttribute("hidden");
  const startAgainButton = document.getElementById("start-again");
  startAgainButton.removeAttribute("hidden");
  startAgainButton.style.display = "block";
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}


function clearSummaryElements(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

function startAgainFunction() {
  const startAgain = document.getElementById("start-again");
  startAgain.addEventListener("click", function () {
    const summary = document.getElementById("summary");
    clearSummaryElements(summary);
    const categoriesSummary = document.getElementById("categories-summary");
    clearSummaryElements(categoriesSummary)
    summary.setAttribute("hidden", "hidden");
    categoriesSummary.setAttribute("hidden", "hidden");
    document.getElementById("see-details").disabled = false;
    startAgain.setAttribute("hidden", "hidden");
    startAgain.style.display = "none";
    const numberInputs = document.querySelectorAll('input');
    numberInputs.forEach(input => {
      input.value='';
    })
  })
};


document.addEventListener('DOMContentLoaded', function () {
  checkInput();
  startAgainFunction();
});