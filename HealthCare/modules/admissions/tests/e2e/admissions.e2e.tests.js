'use strict';

describe('Admissions E2E Tests:', function () {
  describe('Test Admissions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/admissions');
      expect(element.all(by.repeater('admission in admissions')).count()).toEqual(0);
    });
  });
});
