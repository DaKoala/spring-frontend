beforeAll(async () => {
  await page.goto('http://localhost:3000');
});

/**
 * Currently we only have test cases for landing page and home page
 * to test basic functionality of the application.
 * We manually test other pages.
 */
describe('Home page', () => {
  it('page should be titled spring', async () => {
    const title = await page.title();
    expect(title).toBe('spring');
  });

  it('page should have a logo', async () => {
    const logo = await page.$eval('h1', (e) => e.innerHTML);
    expect(logo).toBe('Spring');
  });
});

describe('Login Form', () => {
  it('form should be rendered', async () => {
    const formTitle = await page.$eval('.login__title', (e) => e.innerHTML);
    expect(formTitle).toBe('Log in');
  });

  it('login button should be active', async () => {
    await page.focus('#EMAIL');
    await page.type('#EMAIL', 'seimc1228');
    await page.focus('#PASSWORD');
    await page.type('#PASSWORD', 'seimc1228_password');
    const buttonClass = await page.$eval('.login button', (e) => e.className);
    expect(buttonClass.indexOf('btn__disabled')).toBe(-1);
  });

  it('can log in', async () => {
    await page.click('.login button');
    await page.waitForNavigation();
    const url = page.url();
    expect(url.indexOf('/user') > 0).toBe(true);
  });
});

describe('Dashboard', () => {
  it('sidebar should be rendered', async () => {
    const sidebarLogo = await page.$eval('.menu__brand', (e) => e.textContent);
    expect(sidebarLogo).toBe('Spring');
  });

  it('greeting should be rendered', async () => {
    const greeting = await page.$eval('.hospital__greeting', (e) => e.textContent);
    expect(greeting).toBe('Hello, Shanghai East International Medical Center.');
  });

  it('department table head should be rendered', async () => {
    const tableHead = await page.$eval('.table__head', (e) => e.textContent);
    expect(tableHead).toBe('NAME');
  });

  it('department list should be retrieved', async () => {
    await page.waitForSelector('tbody');
    const departmentLength = await page.$$eval('tbody', (list) => list.length);
    expect(departmentLength).toBe(11);
  });
});
