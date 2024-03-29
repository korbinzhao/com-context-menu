"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./context-menu.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = function (_React$Component) {
  _inherits(ContextMenu, _React$Component);

  function ContextMenu(props) {
    _classCallCheck(this, ContextMenu);

    var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

    _this.handleContextMenu = function (event) {
      var actionScopeClassName = _this.props.actionScopeClassName;


      _this.hasRendered = false;

      // 遍历当前元素及所有父类元素是否含有 actionScopeClassName 的类名，如果有，出现右侧菜单
      event && event.path && event.path.forEach(function (item) {
        if (item.classList && _this.containsInScopeClassNames(item.classList, actionScopeClassName)) {
          event.preventDefault();

          if (!_this.hasRendered) {
            _this.hasRendered = true; // 一次右键操作是否已经渲染出右键菜单
            _this.renderContextMenu(event, item);
          }
        }
      });
    };

    _this.handleClick = function (event) {
      var visible = _this.state.visible;

      var wasOutside = !(event.target.contains === _this.root);

      if (wasOutside && visible) {
        setTimeout(function () {
          _this.setState({ visible: false });
        }, 0);
      }
    };

    _this.handleScroll = function () {
      var visible = _this.state.visible;


      if (visible) _this.setState({ visible: false });
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(ContextMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // contextmenu 属性规定了元素的上下文菜单。当用户右击元素时将显示上下文菜单
      document.addEventListener("contextmenu", this.handleContextMenu);
      document.addEventListener("click", this.handleClick);
      document.addEventListener("scroll", this.handleScroll);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("contextmenu", this.handleContextMenu);
      document.removeEventListener("click", this.handleClick);
      document.removeEventListener("scroll", this.handleScroll);
    }

    // dom 是否在目标className中

  }, {
    key: "containsInScopeClassNames",
    value: function containsInScopeClassNames(classList, actionScopeClassName) {
      var classArr = actionScopeClassName.split(",");

      var result = void 0;
      classArr.forEach(function (item) {
        if (classList.contains(item)) {
          result = true;
        }
      });

      return result;
    }
  }, {
    key: "renderContextMenu",
    value: function renderContextMenu(event, dom) {
      var onTargetRightClick = this.props.onTargetRightClick;


      onTargetRightClick(dom);

      this.setState({ visible: true });
      var clickX = event.clientX;
      var clickY = event.clientY;
      var screenW = window.innerWidth;
      var screenH = window.innerHeight;
      var rootW = this.root.offsetWidth;
      var rootH = this.root.offsetHeight;
      var right = screenW - clickX > rootW;
      var left = !right;
      var top = screenH - clickY > rootH;
      var bottom = !top;

      if (right) {
        this.root.style.left = clickX + 5 + "px";
      }

      if (left) {
        this.root.style.left = clickX - rootW - 5 + "px";
      }

      if (top) {
        this.root.style.top = clickY + 5 + "px";
      }

      if (bottom) {
        this.root.style.top = clickY - rootH - 5 + "px";
      }
    }

    // 点击事件后，右侧菜单消失


    // 滚动页面时，右侧菜单消失

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var visible = this.state.visible;
      var columns = this.props.columns;


      return (visible || null) && _react2.default.createElement(
        "div",
        {
          ref: function ref(_ref) {
            _this2.root = _ref;
          },
          className: "com-context-menu-container"
        },
        columns ? _react2.default.createElement(
          "div",
          { className: "context-menu" },
          columns.map(function (item) {
            return [_react2.default.createElement(
              "div",
              {
                className: "context-menu-option",
                key: item.key,
                onClick: item.onClick
              },
              item.name
            ), _react2.default.createElement(
              "div",
              { key: item.key + "1" },
              item.underLine ? _react2.default.createElement("div", { className: "context-menu-separator", key: item }) : null
            )];
          })
        ) : null
      );
    }
  }]);

  return ContextMenu;
}(_react2.default.Component);

ContextMenu.propTypes = {
  onTargetRightClick: _propTypes2.default.func
};
ContextMenu.defaultProps = {
  onTargetRightClick: function onTargetRightClick() {}
};
exports.default = ContextMenu;