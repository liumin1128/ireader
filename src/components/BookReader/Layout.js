import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Sunny from 'material-ui/svg-icons/image/wb-sunny';
import FontSizeIcon from 'material-ui/svg-icons/editor/format-size';
import { Tabs, Tab } from 'material-ui/Tabs';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Loading from './Loading';
import styles from './Layout.less';
import { themes } from '../../utils/constant.js';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showChapterList: false,
      showSettings: false,
      brightness: 1,
      theme: 1,
    };
  }
  setTheme = (theme) => {
    this.props.dispatch({
      type: 'bookReader/setTheme',
      payload: { ...theme },
    });
  }
  setFontSize = (type) => {
    let fontSize = this.props.theme.fontSize || 16;
    if (type === 'reduce') {
      fontSize += 2;
    }
    if (type === 'increase') {
      fontSize -= 2;
    }
    this.setTheme({ fontSize });
  }
  showOrCloseHandler = (obj) => {
    this.setState({
      show: this.state[obj],
      [obj]: !this.state[obj],
    });
  }
  changeChapterhandler = (obj) => {
    this.props.dispatch({
      type: 'bookReader/changeChapter',
      payload: { type: 'goto', obj },
    });
    this.showOrCloseHandler('showChapterList');
  }
  back = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/',
    }));
  }
  render() {
    const { children, chapterList, book, status } = this.props;
    const { show, showChapterList, showSettings, brightness, theme } = this.state;
    return (
      <div>
        <div className={`${styles.header} ${show ? styles.headerhide : ''}`}>
          <AppBar
            title={book.title + status}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={this.back}
          />
        </div>
        <div className={styles.body}>
          {status === 'loading' && <Loading theme={this.props.theme} />}
          {status === 'error' && <h1>error</h1>}
          {status === 'success' && children}
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
              onClick={this.showOrCloseHandler.bind(this, 'showChapterList')}
            />
            <Tab
              icon={<MapsPersonPin />}
              label="存缓"
            />
            <Tab
              icon={<MapsPersonPin />}
              label="设置"
              onClick={this.showOrCloseHandler.bind(this, 'showSettings')}
            />
          </Tabs>
        </div>
        <Dialog
          modal={false}
          open={showChapterList}
          onRequestClose={this.showOrCloseHandler.bind(this, 'showChapterList')}
          autoScrollBodyContent
        >
          {
            chapterList.chapters && chapterList.chapters.map((i, index) =>
              <p
                key={i.link}
                onClick={this.changeChapterhandler.bind(this, index)}
                style={book.current === index ? { color: 'red' } : {}}
              >
                {i.title}
              </p>,
            )
          }
        </Dialog>
        <Dialog
          contentStyle={{
            width: '100%',
            bottom: 0,
          }}
          modal={false}
          open={showSettings}
          onRequestClose={this.showOrCloseHandler.bind(this, 'showSettings')}
          autoScrollBodyContent
        >
          <div className={styles.brightness}>
            <Sunny color="#848484" style={{ width: 15 }} />
            <Slider sliderStyle={{ margin: 0 }} style={{ width: '100%', margin: '0 10px' }} value={brightness} defaultValue={1} onChange={(e, i) => this.setState({ brightness: i })} />
            <Sunny color="#848484" />
          </div>
          <div className={styles.fontSize}>
            <IconButton onClick={this.setFontSize.bind(this, 'increase')} iconStyle={{ width: 18 }}>
              <FontSizeIcon color="#848484" />
            </IconButton>
            <IconButton onClick={this.setFontSize.bind(this, 'reduce')}>
              <FontSizeIcon color="#848484" />
            </IconButton>
            {/* <IconButton onClick={this.setLineHeight.bind(this, 'increase')} iconStyle={{ width: 18 }}>
              <LineSpacing color="#848484" />
            </IconButton>
            <IconButton onClick={this.setLineHeight.bind(this, 'reduce')}>
              <LineSpacing color="#848484" />
            </IconButton>*/}
          </div>
          <div className={styles.themeSelect}>
            {themes.map((i, index) => <span onClick={this.setTheme.bind(this, i)} className={theme === index && styles.active} key={i.background} style={{ ...i }} />)}
          </div>
        </Dialog>
        <div className={styles.mask} style={{ opacity: (1 - brightness) }} onClick={this.showOrCloseHandler.bind(this, 'show')} />
      </div>
    );
  }
}

export default Layout;
