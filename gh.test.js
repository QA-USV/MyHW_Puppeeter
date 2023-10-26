/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe('Github page tests, set 1', () => {
  beforeEach(async () => {
    await page.goto('https://github.com/team');
  });
  test('The h1 header content', async () => {
    const firstLink = await page.$('header div div a');
    await firstLink.click();
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 60000);

  test('The first link attribute', async () => {
    const actual = await page.$eval('a', link => link.getAttribute('href'));
    expect(actual).toEqual('#start-of-content');
  }, 60000);

  test('The page contains Get started with Team', async () => {
    const btnSelector = '.btn-large-mktg.btn-mktg';
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain('Get started with Team');
  }, 60000);
});

// Tests start from main webpage github.com

describe('Github page tests, set 2', () => {
  beforeEach(async () => {
    await page.goto('https://github.com');
  });
  test('The h1 header on https://github.com/services contents "Expert Services"', async () => {
    const buttonToExpertPage = 'div:nth-child(4) > ul > li:nth-child(3) > a';
    await page.waitForSelector(buttonToExpertPage);
    await page.click(buttonToExpertPage);
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', link => link.textContent);
    expect(title).toEqual('The GitHub Expert Services Team');
  }, 60000);

  test('The h1 header on https://partner.github.com/ contents "Partner with GitHub"', async () => {
    const buttonToPartnerPage = 'div:nth-child(3) > ul > li:nth-child(2) > a';
    await page.waitForSelector(buttonToPartnerPage);
    await page.click(buttonToPartnerPage);
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', link => link.textContent);
    expect(title).toEqual('Partner with GitHub');
  }, 60000);

  test('The h1 header for Free Enterprise Trial Page contents "Pick your trial plan"', async () => {
    const linkButton = 'div.d-flex.flex-column.flex-md-row > a';
    await page.waitForSelector(linkButton);
    await page.click(linkButton);
    await page.waitForTimeout(3000);
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', link => link.textContent);
    expect(title).toContain('Pick your trial plan');
  }, 60000);
});

// An exact webpage on github.com for each test:

describe('Github Services page test', () => {
  beforeEach(async () => {
    await page.goto('https://github.com/services');
  });
  test('The h1 header contents "Expert Services"', async () => {
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', link => link.textContent);
    expect(title).toEqual('The GitHub Expert Services Team');
  });
}, 60000);

describe('Github Partners page test', () => {
  beforeEach(async () => {
    await page.goto('https://partner.github.com/');
  });
  test('The h1 header contents "Partner with GitHub"', async () => {
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', link => link.textContent);
    expect(title).toEqual('Partner with GitHub');
  });
}, 60000);

describe('Github Enterprise Trial Page test', () => {
  beforeEach(async () => {
    await page.goto('https://github.com/');
  });
  test('The h1 header contents "Pick your trial plan"', async () => {
    const linkButton = 'div.d-flex.flex-column.flex-md-row > a';
    await page.waitForSelector(linkButton);
    await page.click(linkButton);
    await page.waitForTimeout(3000);
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', link => link.textContent);
    expect(title).toContain('Pick your trial plan');
  });
}, 60000);
