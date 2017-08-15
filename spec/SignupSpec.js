var ReactTestUtils = require('react-dom/test-utils');
var assert = require('assert');

describe('Signup', function() {
    // const node = this.name.username;
    // node.value = 'giraffe';
    // ReactTestUtils.Simulate.change(node);
    // ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = React.addons.TestUtils;

  var app;

  beforeEach(function() {
    app = renderIntoDocument(
      <Signup />
    );
  });

  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });
});