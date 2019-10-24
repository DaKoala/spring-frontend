module.exports = {
  preset: 'jest-puppeteer',
  verbose: true,
  bail: 1,
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
