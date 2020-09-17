'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getRandomDate,
} = require(`../../utils`);

const {
  ExitCode
} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const MAX_COUNT_ANNOUNCE = 5;

const FILE_SENTENCES_PATH = `../../data/sentences.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;

const generateArticles = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, MAX_COUNT_ANNOUNCE).join(` `),
    fullText: shuffle(sentences).slice(1, MAX_COUNT_ANNOUNCE).join(` `),
    createdDate: getRandomDate(),
    category: [categories[getRandomInt(0, categories.length - 1)]],
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.info(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateArticles(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
