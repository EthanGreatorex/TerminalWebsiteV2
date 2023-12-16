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

 banner                                output the banner`





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



async function showWelcomeMessage(){

  const welcomeMessage = 'Welcome to the terminal website. Type "help" to see a list of avaliable commands.'

  const copyrightMessage = '(c) Ethan Greatorex. Version 0.1';
  
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

async function handleCommand(command){
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
    output.textContent = `\n ${await processCommand(command)}`;
    outputContainer.appendChild(output);
  }
}



async function processCommand(command) {
  switch (command.toLowerCase()) {
    case "clear":
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
    case "banner":
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      outputBanner();
      return "";

    case "projects":
      const linksMessage = `
        <a href="https://github.com/EggGreatorex/passwordLock" target="_blank" class="glowText">password lock                                  https://github.com/EggGreatorex/passwordLock</a>
        <a href="https://github.com/EggGreatorex/MessageEncypter" target="_blank" class="glowText">message encrypter                          https://github.com/EggGreatorex/MessageEncypter</a>
        <a href="https://github.com/EggGreatorex/Notes" target="_blank" class="glowText">notes #work in progress                 https://github.com/EggGreatorex/Notes</a>
      `;

      const linksContainer = document.createElement("div");
      const linksMessageLines = linksMessage.split("\n");

      for (const line of linksMessageLines) {
        const linkDiv = document.createElement("div");
        linkDiv.innerHTML = line;
        linksContainer.appendChild(linkDiv);
      }

      // Append the links container to the output container
      outputContainer.appendChild(linksContainer);

      return "";

    case "themes":
      const themesMessage = `
      midnight

      christmas

      neon

      monochrome
      `;

      themeMessageLines = themesMessage.split("\n");
      for (const line of themeMessageLines) {
        outputContainer.textContent += line + "\n";
        await sleep(70);
      }

      return "";

    case "theme set midnight":
      bannerStyle = document.querySelector(".banner");
      bannerStyle.style.color = "blue";

      inputStyle = document.getElementById("user-input");
      inputStyle.style.color = "blue";
      spanStyle = document.querySelector(".inputSpan");
      spanStyle.style.color = "blue";

      glowElements = document.getElementsByClassName("glowText");
      for (var i = 0; i < glowElements.length; i++) {
        glowElements[i].style.color = "blue";
        glowElements[i].style.textShadow =
          "0 0 10px #1f3682, 0 0 20px #1f3682, 0 0 30px #1f3682";
      }
      return "Theme set to midnight";

    case "theme set christmas":
      bannerStyle = document.querySelector(".banner");
      bannerStyle.style.color = "red";

      inputStyle = document.getElementById("user-input");
      inputStyle.style.color = "green";
      spanStyle = document.querySelector(".inputSpan");
      spanStyle.style.color = "red";

      glowElements = document.getElementsByClassName("glowText");
      for (var i = 0; i < glowElements.length; i++) {
        glowElements[i].style.color = "red";
        glowElements[i].style.textShadow =
          "0 0 10px #23b10a, 0 0 20px #23b10a, 0 0 30px #23b10a";
      }
      return "Theme set to Christmas";

    case "theme set neon":
      // Add Neon theme styles
      bannerStyle = document.querySelector(".banner");
      bannerStyle.style.color = "cyan";

      inputStyle = document.getElementById("user-input");
      inputStyle.style.color = "purple";
      spanStyle = document.querySelector(".inputSpan");
      spanStyle.style.color = "cyan";

      glowElements = document.getElementsByClassName("glowText");
      for (var i = 0; i < glowElements.length; i++) {
        glowElements[i].style.color = "cyan";
        glowElements[i].style.textShadow =
          "0 0 10px #8c00ff, 0 0 20px #8c00ff, 0 0 30px #8c00ff";
      }
      return "Theme set to neon";

    case "theme set monochrome":
      // Add Monochrome theme styles

      // Add Neon theme styles
      bannerStyle = document.querySelector(".banner");
      bannerStyle.style.color = "white";

      inputStyle = document.getElementById("user-input");
      inputStyle.style.color = "white";
      spanStyle = document.querySelector(".inputSpan");
      spanStyle.style.color = "white";

      glowElements = document.getElementsByClassName("glowText");
      for (var i = 0; i < glowElements.length; i++) {
        glowElements[i].style.color = "white";
        glowElements[i].style.textShadow =
          "0 0 10px #000000, 0 0 20px #000000, 0 0 30px #000000";
      }
      return "Theme set to monochrome";

    default:
      return 'Command not found. Type "help" for assistance.';
  }
}
