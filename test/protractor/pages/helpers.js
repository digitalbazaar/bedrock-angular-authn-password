/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const protractor = global.protractor;
const EC = protractor.ExpectedConditions;

const api = {};
module.exports = api;

api.testField = function(modelName, testString, expectedErrorId, altElement) {
  const testElement = element(by.brModel(modelName));
  testElement
    .clear()
    .sendKeys(testString);
  altElement.click();
    // .sendKeys(protractor.Key.TAB);
  // NOTE: Safari does not work with TAB, clicking on another element is the
  // general solution for bluring an input
  // NOTE: `testElement` is the `input` (with no children) not the `br-input`
  const validationError =
    $(`[br-model="${modelName}"] [ng-message="${expectedErrorId}"]`);
  browser.wait(EC.visibilityOf(validationError), 3000);
  validationError.isDisplayed().should.eventually.be.true;
};

api.testFieldsMatch =
  function(modelNameA, modelNameB, testStringA, testStringB, expectedErrorId,
    altElement) {
    // const altElement = $('br-demo-warning');
    element(by.brModel(modelNameA)).sendKeys(testStringA);
    const testElementB = element(by.brModel(modelNameB));
    testElementB
      .sendKeys(testStringB);
    altElement.click();
    const validationError =
      $(`[br-model="${modelNameB}"] [ng-message="${expectedErrorId}"]`);
    browser.wait(EC.visibilityOf(validationError), 3000);
    validationError.isDisplayed().should.eventually.be.true;
  };

// set fields to matching values, then change modelNameA
api.testFieldsMatch2 =
  function(modelNameA, modelNameB, testStringA, testStringB, expectedErrorId) {
    // const altElement = $('br-demo-warning');
    const testElementA = element(by.brModel(modelNameA));
    testElementA
      .clear()
      .sendKeys(testStringA);
    const testElementB = element(by.brModel(modelNameB));
    testElementB
      .clear()
      .sendKeys(testStringA)
      .sendKeys(protractor.Key.TAB);
    // altElement.click();
    testElementB.getAttribute('name')
      .then(function(elementName) {
        element(by.attribute('br-model', modelNameB))
          .element(by.attribute(
            'ng-show',
            ['$ctrl.regForm', elementName, '$error', expectedErrorId]
              .join('.')))
          .isPresent().should.eventually.be.false;
      });
    testElementA
      .clear()
      .sendKeys(testStringB);
    const validationError =
      $(`[br-model="${modelNameB}"] [ng-message="${expectedErrorId}"]`);
    browser.wait(EC.visibilityOf(validationError), 3000);
    validationError.isDisplayed().should.eventually.be.true;
  };
