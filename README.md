# com-context-menu 使用文档
---
### tnpm 安装

```
tnpm i @ali/com-context-menu
```
---
### 用法

```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ContentMenu from "../src/index"; //引入自定义菜单组件

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.colums = [    //自定义右键菜单的内容
      {
        name: "复制",
        key: "copy",
        underLine: true, //是否有分割线
        onClick: () => {
          const { dom } = this.state;
          console.log(dom,'在这里可以自定义点击事件，信息都在dom里面');
        }
      },
      {
        name: "粘贴",
        key: "past",
        onClick: () => {
          console.log("粘贴");
        }
      }
    ];
  }

  getDictId = dom => {  //这个就是通过getTargetInfor获取的目标节点的信息,自己把Dom存下来就行了,函数名字随便
    console.log(dom, "这个就是通过getTargetInfor获取的目标节点的信息");
    this.setState({
      dom: dom
    });
  };

  render() {
    return (
      <div>
        <ContentMenu
          actionScopeClassName="app" // 右键时出现自定义菜单的区域的类名 class
          columns={this.colums} // 右键菜单的内容
          getTargetDom={this.getTargetDom} // 通过getTargetDom获取右键目标节点的全部信息
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

```
---
### API

| Option | Type | Description |
| --- | --- | --- |
| actionScopeClassName | string | 右键时出现自定义菜单的区域 class |
| columns | Object | 自定义右键菜单的内容 |
| getTargetDom | function | 通过getTargetInfor获取右键目标节点的全部信息 |

---
### columns

| Option | Type | Description |
| --- | --- | --- |
| name | string | 名称 |
| key | string | 唯一key |
| underLine | boolean | 分割线，可不写 |
| onClick | function | 点击事件 |