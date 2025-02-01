#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A Javascript Millionaire?\n",
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("Killed")}
    So get all the questions right...`);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

await askName();

async function question() {
  const answers = await inquirer.prompt({
    name: "question",
    type: "list",
    message: "Javascript was created in 10 days then relased on\n",
    choices: [
      "May 23rd, 1995",
      "Nov 24rd, 1995",
      "Dec 4th 1995",
      "Dec 17, 1996",
    ],
  });
  return handleAnswer(answers.question === "Dec 4th 1995");
}

await question();

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Cheking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Nice Work ${playerName}.That's a legit answer` });
    winner();
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question();
