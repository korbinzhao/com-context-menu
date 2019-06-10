import React from "react";
import PropTypes from "prop-types";
import "./context-menu.less";

class ContextMenu extends React.Component {
  static propTypes = {
    getTargetDom: PropTypes.func
  };

  static defaultProps = {
    getTargetDom: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    // contextmenu 属性规定了元素的上下文菜单。当用户右击元素时将显示上下文菜单
    document.addEventListener("contextmenu", this.handleContextMenu);
    document.addEventListener("click", this.handleClick);
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("contextmenu", this.handleContextMenu);
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("scroll", this.handleScroll);
  }

  // dom 是否在目标className中
  containsInScopeClassNames(classList, actionScopeClassName) {
    const classArr = actionScopeClassName.split(",");

    let result;
    classArr.forEach(item => {
      if (classList.contains(item)) {
        result = true;
      }
    });

    return result;
  }

  handleContextMenu = event => {
    const { getTargetDom, actionScopeClassName } = this.props;

    // 遍历当前元素及所有父类元素是否含有 actionScopeClassName 的类名，如果有，出现右侧菜单
    event &&
      event.path &&
      event.path.forEach(item => {
        if (item.classList && this.containsInScopeClassNames(item.classList, actionScopeClassName)) {
          getTargetDom(item);
          event.preventDefault();
          this.setState({ visible: true });
          const clickX = event.clientX;
          const clickY = event.clientY;
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;
          const rootW = this.root.offsetWidth;
          const rootH = this.root.offsetHeight;
          const right = screenW - clickX > rootW;
          const left = !right;
          const top = screenH - clickY > rootH;
          const bottom = !top;

          if (right) {
            this.root.style.left = `${clickX + 5}px`;
          }

          if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
          }

          if (top) {
            this.root.style.top = `${clickY + 5}px`;
          }

          if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
          }
        }
      });
  };

  // 点击事件后，右侧菜单消失
  handleClick = event => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.root);

    if (wasOutside && visible) {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 0);
    }
  };

  // 滚动页面时，右侧菜单消失
  handleScroll = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { columns } = this.props;

    return (
      (visible || null) && (
        <div
          ref={ref => {
            this.root = ref;
          }}
          className="com-context-menu-container"
        >
          {columns ? (
            <div className="context-menu">
              {columns.map(item => [
                <div
                  className="context-menu-option"
                  key={item.key}
                  onClick={item.onClick}
                >
                  {item.name}
                </div>,
                <div key={`${item.key}1`}>
                  {item.underLine ? (
                    <div className="context-menu-separator" key={item} />
                  ) : null}
                </div>
              ])}
            </div>
          ) : null}
        </div>
      )
    );
  }
}

export default ContextMenu;
