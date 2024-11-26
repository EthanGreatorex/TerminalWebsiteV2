//--------------------------------------------------------------------------------------
// CONST DECLARATIONS
const banner = `--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------

  _____ _   _                 
  | ____| |_| |__   __ _ _ __  
  |  _| | __|  _ \ / _  | '_ \ 
  | |___| |_| | | | (_| | | | |
  |_____|\__|_| |_|\__,_|_| |_|

--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
                                           `;

const helpMessge = ` |Command|                                   |Description|
-------------------------------------------------------------------------------

 projects                                links to other projects

 themes                                  view list of themes

 theme set <theme>                       set a theme

 clear                                   clear the terminal

 banner                                  output the banner

 music                                   listen to some nice music

 search <query>                          search the web
 `;

 const linksMessage = `
 https://github.com/EthanGreatorex/EasyArticleFlaskAPP                                 
 https://github.com/EthanGreatorex/KeyLogger                                   
 https://github.com/EthanGreatorex/QuizAPIWebsite                      
      `;

const themesMessage = ` |Theme|                                   |Rating / 10|
-------------------------------------------------------------------------------

 nature                                          6

 midnight                                        4

 christmas                                       7

 neon                                            1 

 monochrome                                      8

 aurora                                          10

 firefly                                         5

 copper                                          1

 dragon                                          10

 mossy (default)                                 10
      `;


// Terminal divs
const inputElement = document.getElementById("user-input");
const outputContainer = document.getElementById("output-container");
const welcomeDiv = document.getElementById("welcome");
const copyrightDiv = document.getElementById("copyright");
const bannerElement = document.querySelector(".banner");
let current_previous_index = 0
let previousCommand = [];

//--------------------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function outputBanner() {
  const bannerElement = document.querySelector(".banner");
  const bannerLines = banner.split("\n");

  for (const line of bannerLines) {
    bannerElement.textContent += line + "\n";
    scrollToBottom();
    await sleep(40);
  }
  await sleep(40);
  showWelcomeMessage();
}

async function showWelcomeMessage() {
  const welcomeMessage =
    'Welcome to my terminal style website! Type "help" to see a list of avaliable commands.\nI highly recommend using this website on a pc, not a phone :)';

  const copyrightMessage = "Ethan Greatorex. Version 2.5";

  copyrightDiv.textContent = copyrightMessage;
  await sleep(40);
  welcomeDiv.textContent = welcomeMessage;
}

// Code to run at the start. Apply the default mossy theme
applyThemeStyles("#89c559", "#436029", "#0c100e");
      saveTheme("mossy");

// Show the banner
outputBanner();


// add an event listner to look for an up arrow or enter key
inputElement.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    previousCommand.push(inputElement.value);
    await handleCommand(inputElement.value);
    inputElement.value = "";
  } else if (event.key === "ArrowUp"){
    previousCommand.push(inputElement.value);
    if(previousCommand !== ""){
      inputElement.value = previousCommand[current_previous_index];
      current_previous_index += 1
    }
  } else if (event.key === "ArrowDown"){
    previousCommand.push(inputElement.value);
    if(previousCommand !== ""){
      current_previous_index -= 1
      inputElement.value = previousCommand[current_previous_index];
    }

  }
});

async function handleCommand(command) {
  // create a div element to display the command the user entered after the enter key is pressed
  let outputCommand = document.createElement("div");
  // create a div element to store our output from running the user command
  let output = document.createElement("div");
  outputCommand.textContent = `--${command}`;
  outputContainer.appendChild(outputCommand);

  // Check if the command is "help"
  if (command.toLowerCase() === "help") {
    // Split the help message into lines
    const helpMessageLines = helpMessge.split("\n");

    // Iterate through each line and create a new div for each
    for (const line of helpMessageLines) {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = line;
      outputContainer.appendChild(lineDiv);
      scrollToBottom();
      await sleep(40); // Adjust the delay as needed
    }
  } else {
    // Process the command and display its output
    // store the return value from processCommand inside the output div
    output.textContent = `${await processCommand(command)}`;
    // only show an output to the user if the return value is not null
    if (output.textContent !== "") {
      outputContainer.appendChild(output);
      scrollToBottom();
    }
  }
  scrollToBottom();
}

function scrollToBottom() {
  window.scrollTo(0,document.body.scrollHeight);
}
// Check for a stored theme on page load
document.addEventListener("DOMContentLoaded", function () {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    applyStoredTheme(storedTheme);
  }
});


async function processCommand(command) {

  switch (true) {
    case command.toLowerCase() === "clear":
      // start at the most recent line and delet each line progessing upwards
      for (let i = outputContainer.children.length - 1; i >= 0; i--) {
        const childElement = outputContainer.children[i];
        outputContainer.removeChild(childElement);
        await sleep(40);
      }
      bannerElement.innerHTML = "";
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      return "";
    case command.toLowerCase() === "banner":
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      outputBanner();
      return "";

    case command.toLowerCase() === "projects":
      const linksMessageLines = linksMessage.split("\n");
      const storedTheme = localStorage.getItem("theme");

      for (const line of linksMessageLines) {
        const linkDiv = document.createElement("div");
        const link = document.createElement("a")
        link.href = line
        link.textContent = line
        link.target = "blank"
        link.classList.add("projectLinks")
        link.classList.add("glowText")
        linkDiv.appendChild(link)
        applyStoredTheme(storedTheme)
        outputContainer.appendChild(linkDiv);
        scrollToBottom();
        await sleep(40);
      }
      const projectInfo = document.createElement("div")
      projectInfo.textContent = "You can view a lot more of my projects on github :)"
      outputContainer.appendChild(projectInfo)


      return "";

    case command.toLowerCase() === "music":
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      return "Opening suggested music";
      
    case command.toLowerCase().startsWith("search"):
      const query = command.slice("search ".length).trim();
      if (query) {
        openSearch(query);
        return `Searching for ${query}...`;
      } else {
        return "Please provide a search query";
      }

    case command.toLowerCase() === "themes":
      themeMessageLines = themesMessage.split("\n");
      for (const line of themeMessageLines) {
        const themeMessageDiv = document.createElement("div");
        themeMessageDiv.textContent = line;
        outputContainer.appendChild(themeMessageDiv);
        scrollToBottom();
        await sleep(40);
      }

      return "";

    case command.toLowerCase() === "theme set midnight":
      applyThemeStyles("blue", "#1f3682", "#040621");
      saveTheme("midnight");
      return "Theme set to midnight";

    case command.toLowerCase() === "theme set nature":
      applyThemeStyles("rgb(76, 121, 76)", "rgb(76, 121, 76)", "#1c2d27");
      saveTheme("nature");
      return "Theme set to nature";

    case command.toLowerCase() === "theme set christmas":
      applyThemeStyles("red", "#23b10a", "#6d231d");
      saveTheme("christmas");
      return "Theme set to Christmas";

    case command.toLowerCase() === "theme set neon":
      applyThemeStyles("cyan", "#8c00ff", "#4c00c0");
      saveTheme("neon");
      return "Theme set to neon";

    case command.toLowerCase() === "theme set monochrome":
      applyThemeStyles("white", "#000000", "#191d1e");
      saveTheme("monochrome");
      return "Theme set to monochrome";

    case command.toLowerCase() === "theme set aurora":
      applyThemeStyles("#29ff9f", "#1c4853", "#01141e");
      saveTheme("aurora");
      return "Theme set to aurora";

    case command.toLowerCase() === "theme set firefly":
      applyThemeStyles("#ffb354", "#ffa03b", "#011627");
      saveTheme("firefly");
      return "Theme set to firefly";

    case command.toLowerCase() === "theme set copper":
      applyThemeStyles("#7db9b4", "#442f29", "#442f29");
      saveTheme("copper");
      return "Theme set to copper";

    case command.toLowerCase() === "theme set dragon":
      applyThemeStyles("#e2a528", "#c62d28", "#1a0b0c");
      saveTheme("dragon");
      return "Theme set to dragon";

    case command.toLowerCase() === "theme set mossy":
      applyThemeStyles("#89c559", "#436029", "#0c100e");
      saveTheme("mossy");
      return "Theme set to mossy";

    default:
      return 'Command not found. Type "help" for assistance.';

  }
}


function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}


function applyStoredTheme(theme) {
  const bodyElement = document.body;

  switch (theme) {
    case "midnight":
      applyThemeStyles("blue", "#1f3682", "#040621");
      break;

    case "nature":
      applyThemeStyles("rgb(76, 121, 76)", "rgb(76, 121, 76)", "#1c2d27");
      break;

    case "christmas":
      applyThemeStyles("red", "#23b10a", "#6d231d");
      break;

    case "neon":
      applyThemeStyles("cyan", "#8c00ff", "#4c00c0");
      break;

    case "monochrome":
      applyThemeStyles("white", "#000000", "#191d1e");
      break;

    case "aurora":
      applyThemeStyles("#29ff9f", "#1c4853", "#01141e");
      break;

    case "firefly":
      applyThemeStyles("#ffb354", "#ffa03b", "#011627");
      break;

    case "copper":
      applyThemeStyles("#7db9b4", "#442f29", "#442f29");
      break;
    
    case "dragon":
      applyThemeStyles("#e2a528", "#c62d28", "#1a0b0c");
      break;

    case "mossy":
      applyThemeStyles("#89c559", "#436029", "#0c100e");
      break;

    default:
      break;
  }
}




function applyThemeStyles(textColor, shadowColor, bgColour) {
  // Add  theme styles
  bannerStyle = document.querySelector(".banner");
  bannerStyle.style.color = textColor;

  informationStyle = document.querySelector(".infoLink");
  informationStyle.style.color = textColor;

  inputStyle = document.getElementById("user-input");
  inputStyle.style.color = textColor;
  spanStyle = document.querySelector(".inputSpan");
  spanStyle.style.color = textColor;

  const bodyElement = document.body;

  bodyElement.style.backgroundColor = bgColour;

  glowElements = document.getElementsByClassName("glowText");
  for (var i = 0; i < glowElements.length; i++) {
    glowElements[i].style.color = textColor;
    glowElements[
      i
    ].style.textShadow = `0 0 10px ${shadowColor}, 0 0 20px ${shadowColor}, 0 0 30px ${shadowColor}`;
  }
}


function openSearch(query){
  const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  window.open(searchURL, "_blank");
}


function copyTextToClipboard(text) {
  // Create a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = text;

  // Append the input element to the document
  document.body.appendChild(tempInput);

  // Select the text inside the input element
  tempInput.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the temporary input element from the document
  document.body.removeChild(tempInput);
}

// Copy email
 async function copyText() {
  const email = "EggGreatorex@gmail.com";
  copyTextToClipboard(email);
  emailButtonText = document.querySelector(".emailButton");
  emailButtonText.textContent = 'Copied!';
  await sleep(1000);
  emailButtonText.textContent = '@Email';
}