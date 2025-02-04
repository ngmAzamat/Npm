#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
let playerName;
let counter = 0;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A Millionaire?\n",
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("Killed")}
    So get all the questions right...`);
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

async function question() {
  const answers = await inquirer.prompt({
    name: "questions",
    type: "list",
    message: "кто такой Король-Эллесар\n",
    choices: ["Арагорн", "Фарамир", "Теоден", "Денетор\n"],
  });
  const answer = answers.questions === "Арагорн";
  handleAnswer(answer);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Cheking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: "Да!" });
    counter++;
    console.log("\n\n");
    winner();
  } else {
    spinner.error({ text: "Нет!" });
    process.exit(1);
  }
}

async function winner() {
  const a = `${playerName} Выйграл!\n`;
  const msg = "$" + 100000 * counter;
  figlet(msg, (err, data) => {
    console.log(a);
    console.log(gradient.pastel.multiline(data));
  });
  await question();
}

await welcome();
await question();
