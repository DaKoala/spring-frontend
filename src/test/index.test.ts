beforeAll(async () => {
  await page.goto('http://localhost:3000');
});

describe('Home page', () => {
  it('page should be titled spring', async () => {
    const title = await page.title();
    expect(title).toBe('Spring');
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
    await page.$eval('.login button', (e: HTMLButtonElement) => e.click());
    await page.waitForNavigation();
    const url = page.url();
    expect(url.indexOf('/user') > 0).toBe(true);
  });
});