import { NgrxMarbleTestsPage } from './app.po';

describe('ngrx-marble-tests App', () => {
  let page: NgrxMarbleTestsPage;

  beforeEach(() => {
    page = new NgrxMarbleTestsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
