#! /usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx generate-node-boilerplate my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/SanjayBoricha/node-boilerplate.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    fs.rmSync(path.join(projectPath, "package.json"))
    fs.renameSync(path.join(projectPath, "package-app.json"), path.join(projectPath, "package.json"))
    execSync("npm install");
    fs.cpSync(path.join(projectPath, ".env.example"), path.join(projectPath, ".env"))

    console.log("Removing useless files");
    execSync("npx rimraf ./.git");
    fs.rmSync(path.join(projectPath, ".github"), { recursive: true });
    fs.rmSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("The installation is done, this is ready to use !");
  } catch (error) {
    console.log(error);
  }
}
main();
