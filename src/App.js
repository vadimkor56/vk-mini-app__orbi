import React from "react";
import connect from "@vkontakte/vk-connect";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { Home } from "./panels/Home/Home";
import { Questionnaire } from "./panels/Questionnaire";
import { Info } from "./panels/Info";
import "./styles.css";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanel: "home",
      fetchedUser: null,
      history: ["home"]
    };
  }

  componentDidMount() {
    connect.subscribe(e => {
      switch (e.detail.type) {
        case "VKWebAppGetUserInfoResult":
          this.setState({ fetchedUser: e.detail.data });
          break;
        default:
          console.log(e.detail.type);
      }
    });
    connect.send("VKWebAppGetUserInfo", {});
  }

  go = e => {
    this.setState({ activePanel: e.currentTarget.dataset.to });
  };

  goBack = () => {
    const history = [...this.state.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === "main") {
      connect.send("VKWebAppDisableSwipeBack", {});
    }
    this.setState({ history, activePanel });
  };

  goForward = activePanel => {
    const history = [...this.state.history];
    history.push(activePanel);
    if (this.state.activePanel === "main") {
      connect.send("VKWebAppEnableSwipeBack", {});
    }
    this.setState({ history, activePanel });
  };

  render() {
    return (
      <View
        onSwipeBack={this.goBack}
        history={this.state.history}
        activePanel={this.state.activePanel}
      >
        <Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
        <Questionnaire id="questionnaire" go={this.go} />
        <Info id="info" go={this.go} />
      </View>
    );
  }
}
