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
    case "help":
      return helpMessge;
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
