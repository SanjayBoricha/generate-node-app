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
    execSync(`git clone --branch code --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Removing useless files");
    execSync("npx rimraf ./.git");

    fs.cpSync(path.join(projectPath, ".env.example"), path.join(projectPath, ".env"))
    console.log("The installation is complete, and this is now ready for use.");
  } catch (error) {
    console.log(error);
  }
}
main();
