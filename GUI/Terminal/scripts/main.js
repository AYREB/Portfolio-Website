const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));
let shouldFocusInput = false; // Flag to determine whether the input should be focused

app.addEventListener("keypress", async function(event) {
  if (event.key === "Enter") {
    await delay(150);
    getInputValue();

    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event) {
  const input = document.querySelector("input");
  input.focus();
});

async function open_terminal() {
  createText("Welcome");
  createText("Available Commands:");

  createCode("help", "see all commands");
  createCode("clear", "clears the terminal");
  createCode("about", "about me");
  createCode("projects", "list all my projects");
  createCode("socials", "list all my socials");

  new_line();
  await delay(500);
}

function new_line() {
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path");
  p.textContent = "# user";
  span1.textContent = " in";
  span2.textContent = " ~/bruno-ayre";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);

  if (shouldFocusInput) {
    input.focus();
    shouldFocusInput = false; // Reset the flag
  }
}

function removeInput() {
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue() {
  const value = document.querySelector("input").value;
  if (value === "help") {
    trueValue(value);

    createCode("help", "see all commands");
    createCode("clear", "clears the terminal");
    createCode("about", "about me");
    createCode("projects", "list all my projects");
    createCode("socials", "list all my socials");
  } else if (value === "projects") {
    trueValue(value);
    createText("<a href='https://github.com/AYREB' target='_blank'><i class='fab fa-github white'></i> github.com/heberleonard2</a>");
  } else if (value === "about") {
    trueValue(value);
    createText("Hi there, my name is Bruno!");
    createText("I am a programmer and software engineer who loves embarking on many different and exciting projects in the field of computer science such as <span class='blue'>AI, VR, Hardware, Simulations </span>and lots more!");
  } else if (value === "socials") {
    trueValue(value);
    createText("<a href='https://github.com/AYREB' target='_blank'><i class='fab fa-github white'></i> github.com/AYREB</a>");
    createText("<a href='https://www.linkedin.com/in/brunoayre/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/brunoayre/</a>");
    createText("<a href='https://www.instagram.com/bruno_ayre/' target='_blank'><i class='fab fa-instagram white'></i> instagram.com/bruno_ayre/</a>");
  } else if (value === "clear") {
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  } else {
    falseValue(value);
    createText(`command not found: ${value}`);
    createText(`enter 'help' to see all available commands`);
  }
  
  // Set flag to focus input after command response
  shouldFocusInput = true;
}

function trueValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error");
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error");
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname) {
  const p = document.createElement("p");

  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

open_terminal();
