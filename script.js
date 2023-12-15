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
  const welcomeDiv = document.getElementById('welcome');
  const welcomeMessage = 'Welcome to the terminal website. Type "help" to see a list of avaliable commands.'

  const copyrightDiv = document.getElementById('copyright');
  const copyrightMessage = '(c) Ethan Greatorex. Version 0.1';
  
  copyrightDiv.textContent = copyrightMessage;
  await sleep(70);
  welcomeDiv.textContent = welcomeMessage;
}

outputBanner();

// Terminal functionality
const inputElement = document.getElementById("user-input");
const outputContainer = document.getElementById("output-container");

inputElement.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    await handleCommand(inputElement.value);
    inputElement.value = "";
  }
});

async function handleCommand(command) {
  let output = document.createElement("div");
  output.textContent = `\n ${await processCommand(command)}`;
  outputContainer.appendChild(output);
}

async function processCommand(command) {
  switch (command.toLowerCase()) {
    case "help":
      return `This is a help message.`;
    case "clear":

      for (let i = outputContainer.children.length - 1; i >= 0; i--) {
        const childElement = outputContainer.children[i];
        outputContainer.removeChild(childElement);
        await sleep(70);
      }
      return "";
    // Add more commands as needed
    default:
      return 'Command not found. Type "help" for assistance.';
  }
}
