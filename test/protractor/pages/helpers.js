/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
var protractor = global.protractor;
var EC = protractor.ExpectedConditions;

var api = {};
module.exports = api;

api.testField = function(modelName, testString, expectedErrorId) {
  var testElement = element(by.brModel(modelName));
  var altElement = $('br-demo-warning');
  testElement
    .clear()
    .sendKeys(testString);
    // NOTE: Safari does not work with TAB, clicking on another element is the
    // general solution for bluring an input
  altElement.click();
  element(by.brModel(modelName)).getAttribute('name')
    .then(function(elementName) {
      var validationError = element(by.attribute('br-model', modelName))
        .element(by.attribute(
          'ng-show',
          ['$ctrl.regForm', elementName, '$error', expectedErrorId].join('.')));
      browser.wait(EC.visibilityOf(validationError), 3000);
      validationError.isDisplayed().should.eventually.be.true;
    });
};

api.testFieldsMatch =
  function(modelNameA, modelNameB, testStringA, testStringB, expectedErrorId) {
    var altElement = $('br-demo-warning');
    element(by.brModel(modelNameA)).sendKeys(testStringA);
    var testElementB = element(by.brModel(modelNameB));
    testElementB.sendKeys(testStringB);
    altElement.click();
    element(by.brModel(modelNameB)).getAttribute('name')
      .then(function(elementName) {
        element(by.attribute('br-model', modelNameB))
          .element(by.attribute(
            'ng-show',
            ['$ctrl.regForm', elementName, '$error', expectedErrorId]
              .join('.')))
          .isDisplayed().should.eventually.be.true;
      });
  };

// set fields to matching values, then change modelNameA
api.testFieldsMatch2 =
  function(modelNameA, modelNameB, testStringA, testStringB, expectedErrorId) {
    var altElement = $('br-demo-warning');
    var testElementA = element(by.brModel(modelNameA));
    testElementA
      .clear()
      .sendKeys(testStringA);
    var testElementB = element(by.brModel(modelNameB));
    testElementB
      .clear()
      .sendKeys(testStringA);
    altElement.click();
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
    testElementB.getAttribute('name')
      .then(function(elementName) {
        element(by.attribute('br-model', modelNameB))
          .element(by.attribute(
            'ng-show',
            ['$ctrl.regForm', elementName, '$error', expectedErrorId]
              .join('.')))
          .isDisplayed().should.eventually.be.true;
      });
  };
