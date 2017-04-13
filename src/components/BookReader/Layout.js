import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Tabs, Tab } from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import styles from './Layout.less';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showChapterList: false,
    };
  }
  showMenuHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  }
  showChapterList = () => {
    this.setState({
      showChapterList: !this.state.showChapterList,
    });
  }
  changeChapterhandler = (obj) => {
    this.props.dispatch({
      type: 'bookReader/changeChapter',
      payload: {
        type: 'goto',
        obj,
      },
    });
    this.showChapterList();
    this.showMenuHandler();
  }
  back = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/',
    }));
  }
  render() {
    const { children, chapterList, current } = this.props;
    const { show, showChapterList } = this.state;
    return (
      <div>
        <div className={`${styles.header} ${show ? styles.headerhide : ''}`}>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={this.back}
          />
        </div>
        <div className={styles.body} onClick={this.showMenuHandler}>
          {children}
        </div>
        <div className={`${styles.foot} ${show ? styles.foothide : ''}`}>
          <Tabs>
            <Tab
              icon={<MapsPersonPin />}
              label="夜间"
            />
            <Tab
              icon={<MapsPersonPin />}
              label="反馈"
            />
            <Tab
              icon={<MapsPersonPin />}
              label="目录"
              onClick={this.showChapterList}
            />
            <Tab
              icon={<MapsPersonPin />}
              label="存缓"
            />
            <Tab
              icon={<MapsPersonPin />}
              label="设置"
            />
          </Tabs>
        </div>
        <Dialog
          modal={false}
          open={showChapterList}
          onRequestClose={this.showChapterList}
          autoScrollBodyContent
        >
          {
            chapterList.chapters && chapterList.chapters.map((i, index) =>
              <p
                key={i.link}
                onClick={this.changeChapterhandler.bind(this, index)}
                style={current === index ? { color: 'red' } : {}}
              >
                {i.title}
              </p>,
            )
          }
        </Dialog>
      </div>
    );
  }
}

export default Layout;
