import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import { Menu, Icon } from 'antd';
import File from './components/File';
import { FILE_TYPE } from './constants/const';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {
  state = {
    current: 'index',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  mapFileToIcons() {
    return this.props.drive.tree.map((item, idx) => {
      return <File 
      handleClick = {item.fileType === FILE_TYPE.NORMAL_FOLDER ? this.props.folderIn.bind(this, this.props.drive, item.child) : () => {console.log("do nothing")}}
      key={idx} 
      {...item} 
      />
    })
  }
  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="index">
            <Icon type="hdd" />New Drive
          </Menu.Item>
        </Menu>
        <div className="main-body">
          {
            this.mapFileToIcons()
          }
        </div>
      </div>
    );
  }
}

export default App;
