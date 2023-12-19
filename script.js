//--------------------------------------------------------------------------------------
// CONST DECLARATIONS
const banner = `--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------

 |__   __|                (_)           | |
    | | ___ _ __ _ __ ___  _ _ __   __ _| |
    | |/ _ \ '__| '_   _ \| | '_ \ / _  | |
    | |  __/ |  | | | | | | | | | | (_| | |
    |_|\___|_|  |_| |_| |_|_|_| |_|\__,_|_|

--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
                                           `;

const helpMessge = ` projects                              links to other projects

 themes                               view list of themes

 theme set <theme>          set a theme

 clear                                    clear the terminal

 banner                                output the banner

 music                                  listen to some nice music

 search <query>                 search the web
 `;

 const linksMessage = `
      password lock                                        https://github.com/EggGreatorex/passwordLock
      message encrypter                                https://github.com/EggGreatorex/MessageEncypter
      notes  #work in progress                      https://github.com/EggGreatorex/Notes
      `;

const themesMessage = `

      nature (default)

      midnight

      christmas

      neon

      monochrome

      aurora

      firefly
      `;


//--------------------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function outputBanner() {
  const bannerElement = document.querySelector(".banner");
  const bannerLines = banner.split("\n");

  for (const line of bannerLines) {
    bannerElement.textContent += line + "\n";
    await sleep(70);
  }
  await sleep(70);
  showWelcomeMessage();
}

async function showWelcomeMessage() {
  const welcomeMessage =
    'Welcome to the terminal website. Type "help" to see a list of avaliable commands.';

  const copyrightMessage = "(c) Ethan Greatorex. Version 0.1";

  copyrightDiv.textContent = copyrightMessage;
  await sleep(70);
  welcomeDiv.textContent = welcomeMessage;
}

outputBanner();

// Terminal divs
const inputElement = document.getElementById("user-input");
const outputContainer = document.getElementById("output-container");
const welcomeDiv = document.getElementById("welcome");
const copyrightDiv = document.getElementById("copyright");
const bannerElement = document.querySelector(".banner");

inputElement.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    await handleCommand(inputElement.value);
    inputElement.value = "";
  }
});

async function handleCommand(command) {
  let outputCommand = document.createElement("div");
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
      await sleep(70); // Adjust the delay as needed
    }
  } else {
    // Process the command and display its output
    output.textContent = `${await processCommand(command)}`;
    if (output.textContent !== "") {
      outputContainer.appendChild(output);
    }
  }
}


// Check for a stored theme on page load
document.addEventListener("DOMContentLoaded", function () {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    applyStoredTheme(storedTheme);
  }
});


async function processCommand(command) {
  console.log("Processing command:", command);
  const bodyElement = document.body;
  switch (true) {
    case command.toLowerCase() === "clear":
      console.log("Clearing terminal...");
      for (let i = outputContainer.children.length - 1; i >= 0; i--) {
        const childElement = outputContainer.children[i];
        outputContainer.removeChild(childElement);
        await sleep(70);
      }
      bannerElement.innerHTML = "";
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      return "";
    case command.toLowerCase() === "banner":
      console.log("Displaying banner...");
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      outputBanner();
      return "";

    case command.toLowerCase() === "projects":
      const linksMessageLines = linksMessage.split("\n");

      for (const line of linksMessageLines) {
        const linkDiv = document.createElement("div");
        linkDiv.textContent = line;
        outputContainer.appendChild(linkDiv);
        await sleep(70);
      }

      return "";

    case command.toLowerCase() === "music":
      window.open("https://www.youtube.com/watch?v=gFnunMAQ6NE", "_blank");
      return "Opening suggested music";

    case command.toLowerCase().startsWith("search "):
      const query = command.slice("search ".length).trim();
      console.log("Parsed query:", query);
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
        await sleep(70);
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

    default:
      break;
  }
}




function applyThemeStyles(textColor, shadowColor, bgColour) {
  // Add Neon theme styles
  bannerStyle = document.querySelector(".banner");
  bannerStyle.style.color = textColor;

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
