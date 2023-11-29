import chalk from "chalk";

export const logger = {
  info(...args: unknown[]) {
    console.log(chalk.blue(...args));
  },
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
};
