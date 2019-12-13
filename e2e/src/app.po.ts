import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getSearchPlaceholder() {
    return element(by.css('app-root .content app-instances input')).getAttribute('placeholder') as Promise<string>;
  }

  getSearchText() {
    return element(by.css('app-root .content app-instances input')).getText() as Promise<string>;
  }
}
