module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};