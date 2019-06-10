import React, { Component } from "react";
import ContentMenu from "../src/index"; // 自定义菜单组件

import "./index.css";

const columns1 = [
  // 自定义右键菜单的内容
  {
    name: "复制1",
    key: "copy",
    underLine: true, // 是否有分割线
    onClick: (e) => {
      console.log(e, "在这里可以自定义点击事件，信息都在dom里面");
    }
  },
  {
    name: "粘贴1",
    key: "past",
    onClick: () => {
      console.log("粘贴");
    }
  }
];

const columns2 = [
  // 自定义右键菜单的内容
  {
    name: "复制2",
    key: "copy",
    underLine: true, // 是否有分割线
    onClick: (e) => {
      console.log(e, "在这里可以自定义点击事件，信息都在dom里面");
    }
  },
  {
    name: "粘贴2",
    key: "past",
    onClick: () => {
      console.log("粘贴");
    }
  }
];

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: columns1
    };
  }

  componentWillMount() {}

  onTargetRightClick = dom => {
    // 这个就是通过getTargetDom获取的目标节点的信息,自己把Dom存下来就行了,函数名字随便
    console.log(dom, "这个就是通过getTargetDom获取的目标节点的信息");
    this.setState({
      dom
    });

    let columns;

    switch (dom.className) {
      case "container1":
        columns = columns1;
        break;
      case "container2":
        columns = columns2;
        break;
      default:
        break;
    }

    this.setState({
      columns
    });
  };

  render() {
    return (
      <div>
        <div className="container1" />
        <div className="container2" />
        <ContentMenu
          actionScopeClassName="container1,container2" // 右键时出现自定义菜单的区域的类名 class
          columns={this.state.columns} // 右键菜单的内容
          onTargetRightClick={this.onTargetRightClick} // 通过getTargetDom获取右键目标节点的全部信息
        />
      </div>
    );
  }
}
