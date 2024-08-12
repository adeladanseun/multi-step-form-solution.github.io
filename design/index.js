const rings = document.querySelector(".mainWrapper .steps.sidebar");
const pageone = document.getElementById("itemOne");
const pagetwo = document.getElementById("itemTwo");
const pagethree = document.getElementById("itemThree");
const pagefour = document.getElementById("itemFour");
const pagefive = document.getElementById("itemFive");
const nextbutton = document.getElementById("forward");
const backbutton = document.getElementById("backward");

const nameInput = document.querySelector(
  ".mainone .form .formItem:nth-child(1) input"
);
const emailInput = document.querySelector(
  ".mainone .form .formItem:nth-child(2) input"
);
const phoneInput = document.querySelector(
  ".mainone .form .formItem:nth-child(3) input"
);
  

const planWrapper = document.querySelector(".maintwo .plan");
const plans = [...planWrapper.children];
const planDuration = document.querySelector(".planduration");
const planDurationSwitch = document.querySelector(".planduration .flip");

const optionsWrapper = document.querySelector(".mainthree .options");
const options = [...optionsWrapper.children];

const detailsWrapper = document.querySelector(".mainfour .details");
const change = document.querySelector(".mainfour .details .totwo");

let currentPageIndex = 0;
const pageMoveFuncArray = [
  renderOne,
  renderTwo,
  renderThree,
  renderFour,
  renderFive,
];
const data = {
  pageone: {
    name: "",
    email: "",
    phone: "",
  },
  pagetwo: {
    plan: "arcade",
    planduration: "monthly",
  },
  pagethree: {
    onlineservice: true,
    largerstorage: true,
    customprofile: false,
  },
};
const dataPrice = {
  arcademonthly: 9,
  arcadeyearly: 90,
  advancedmonthly: 12,
  advancedyearly: 120,
  promonthly: 15,
  proyearly: 150,
  onlineservicemonthly: 1,
  onlineserviceyearly: 10,
  largerstoragemonthly: 2,
  largerstorageyearly: 20,
  customprofilemonthly: 2,
  customprofileyearly: 20,
};
function buttonVisibility(show = "both") {
  ringHighlight();
  if (show === "back") {
    backbutton.classList.add("show");
    nextbutton.classList.remove("show");
  } else if (show === "next") {
    backbutton.classList.remove("show");
    nextbutton.classList.add("show");
  } else if (show === "none") {
    backbutton.classList.remove("show");
    nextbutton.classList.remove("show");
  } else {
    backbutton.classList.add("show");
    nextbutton.classList.add("show");
  }
}
function ringHighlight(number = currentPageIndex) {
  [...rings.children].forEach((child) => {
    child.children[0].classList.remove("selected");
  });
  try {
    rings.children[number].children[0].classList.add("selected");
  } catch {
    //do nothing
  }
}
function spanGen(className, text) {
  const span = document.createElement("span");
  span.classList.add(className);
  span.innerText = text;
  return span;
}
function extraGen(name, amount) {
  const extra = document.createElement("div");
  extra.classList.add("extra");
  const extraName = document.createElement("div");
  extraName.classList.add("extraName");
  extraName.innerText = name;
  const extraPrice = document.createElement("div");
  extraPrice.classList.add("extraPrice");
  extraPrice.appendChild(spanGen("", "+$"));
  extraPrice.appendChild(spanGen("", amount));
  extraPrice.appendChild(spanGen("month", "/mo"));
  extraPrice.appendChild(spanGen("year", "/yr"));
  extra.appendChild(extraName);
  extra.appendChild(extraPrice);
  return extra;
}
function removeAllSelection() {
  plans.forEach((plan) => {
    plan.classList.remove("selected");
  });
}
function verifyCorrectness() {
  if (
    !data["pageone"]["name"] ||
    !data["pageone"]["email"] ||
    !data["pageone"]["phone"]
  ) {
    currentPageIndex = 0;
    pageone.scrollIntoView();
    if (!data["pageone"]["name"]) {
      nameInput.classList.add("red");
    } else {
      nameInput.classList.remove("red");
    }
    if (!data["pageone"]["email"]) {
      emailInput.classList.add("red");
    } else {
      emailInput.classList.remove("red");
    }
    if (!data["pageone"]["phone"]) {
      phoneInput.classList.add("red");
    } else {
      phoneInput.classList.remove("red");
    }
    return false;
  }
  else {
    return true
  }
}
function renderOne() {
  currentPageIndex = 0;
  nextbutton.innerText = "Next Step";
  pageone.scrollIntoView();
  buttonVisibility("next");
}
function renderTwo() {
  data['pageone']['name'] = nameInput.value
  data['pageone']['email'] = emailInput.value
  data['pageone']['phone'] = phoneInput.value
  if (!verifyCorrectness()) return
  console.log('passing two')
  nameInput.classList.remove('red')
  emailInput.classList.remove('red')
  phoneInput.classList.remove('red')
  currentPageIndex = 1;
  nextbutton.innerText = "Next Step";
  removeAllSelection();
  document.getElementById(data["pagetwo"]["plan"]).classList.add("selected");

  pagetwo.scrollIntoView();
  buttonVisibility();
}
function renderThree() {
  if(!verifyCorrectness()) return
  currentPageIndex = 2;
  nextbutton.innerText = "Next Step";
  pagethree.scrollIntoView();
  buttonVisibility();
  optionsWrapper.dataset["duration"] = data["pagetwo"]["planduration"];
  options.forEach((option) => {
    if (data["pagethree"][option.id]) {
      option.classList.add("selected");
      option.children[0].checked = true;
    } else {
      option.classList.remove("selected");
      option.children[0].checked = false;
    }
  });
}
function renderFour() {
  if(!verifyCorrectness()) return
  currentPageIndex = 3;
  document.querySelector("#itemFour .details").dataset["duration"] =
    data["pagetwo"]["planduration"];
  document.getElementById("packageName").innerText = document.getElementById(
    data["pagetwo"]["plan"]
  ).children[0].children[0].innerText;
  document.getElementById(
    "packageDuration"
  ).innerText = `(${data["pagetwo"]["planduration"]})`;
  document.getElementById("subprice").innerText =
    dataPrice[`${data["pagetwo"]["plan"]}${data["pagetwo"]["planduration"]}`];
  const pricelist = [];
  pricelist.push(
    dataPrice[`${data["pagetwo"]["plan"]}${data["pagetwo"]["planduration"]}`]
  );
  const extras = document.querySelector("#itemFour .extras");
  extras.innerHTML = "";
  for (let item in data["pagethree"]) {
    if (data["pagethree"][item]) {
      pricelist.push(dataPrice[`${item}${data["pagetwo"]["planduration"]}`]);
      const extra = document.createElement("div");
      extra.classList.add("extra");
      const name = document.createElement("div");
      name.classList.add("extraName");
      name.innerText = document.querySelector(
        `#${item} .optionTitle`
      ).innerText;
      const price = document.createElement("div");
      price.classList.add("extraPrice");
      price.innerHTML =
        '<span>+$</span><span></span><span class="month">/mo</span><span class="year">/yr</span>';
      price.children[1].innerText =
        dataPrice[`${item}${data["pagetwo"]["planduration"]}`];
      //price.innerText = dataPrice[`${item}${data['pagetwo']['planduration']}`]

      extra.appendChild(name);
      extra.appendChild(price);

      extras.appendChild(extra);
    }
  }
  console.log(pricelist);
  const total = document.querySelector("#totalprice");
  total.innerHTML =
    '<span>+$</span><span></span><span class="month">/mo</span><span class="year">/yr</span>';
  total.children[1].innerText = pricelist.reduce((a, x) => (a += x), 0);
  //calculatetotal
  nextbutton.innerText = "Confirm";

  pagefour.scrollIntoView();
  buttonVisibility();
}
function renderFive() {
  currentPageIndex = 4;
  pagefive.scrollIntoView();
  buttonVisibility("none");
}

nextbutton.addEventListener("click", () => {
  pageMoveFuncArray[++currentPageIndex]();
});
backbutton.addEventListener("click", () => {
  pageMoveFuncArray[--currentPageIndex]();
});
planDurationSwitch.addEventListener("click", () => {
  planDuration.dataset["duration"] =
    planDuration.dataset["duration"] === "monthly" ? "yearly" : "monthly";
  planWrapper.dataset["duration"] =
    planWrapper.dataset["duration"] === "monthly" ? "yearly" : "monthly";
  data["pagetwo"]["planduration"] =
    data["pagetwo"]["planduration"] === "monthly" ? "yearly" : "monthly";
});
change.addEventListener("click", () => {
  renderTwo();
});
plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    data["pagetwo"]["plan"] = plan.id;
    renderTwo();
  });
});
options.forEach((option) => {
  option.addEventListener("click", () => {
    data["pagethree"][option.id] =
      data["pagethree"][option.id] === true ? false : true;
    renderThree();
  });
});
renderOne()