import React from "react";
import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  Slider,
  FormLayout,
  Select
} from "@vkontakte/vkui";
import "./Questionnaire.css";
import { BackButton } from "../../components/BackButton";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import * as connect from "@vkontakte/vk-connect";

export class Questionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riskValue: 20,
      smoking: undefined,
      drinking: undefined
    };
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  getProperRiskValue = valueToSet => {
    if (valueToSet > 100) {
      return 100;
    } else if (valueToSet < 0) {
      return 0;
    } else {
      return valueToSet;
    }
  };

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<BackButton onClick={this.props.go} to="home" />}>
          Старт
        </PanelHeader>
        <FormLayout>
          <Slider
            min={0}
            max={100}
            value={this.state.riskValue}
            top={
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white"
                }}
              >
                Риск инсульта
              </h3>
            }
            bottom={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 10px"
                }}
              >
                <span>0</span>
                <span>Очень приблизительные данные</span>
                <span>100</span>
              </div>
            }
            alignment="center"
          />

          <hr />

          <Select
            name="smoking"
            placeholder="Выберите"
            top="Вы курите?"
            onChange={event => {
              const currentRiskValue = this.state.riskValue;
              const lastValue = this.state.smoking;
              const currentValue = event.target.value;

              const getRiskValue = value => {
                switch (value) {
                  case "yes":
                    return 10;
                  case "no":
                    return -5;
                  case "sometimes":
                    return 5;
                  default:
                    return 0;
                }
              };

              const newRiskValue = this.getProperRiskValue(
                currentRiskValue -
                  getRiskValue(lastValue) +
                  getRiskValue(currentValue)
              );

              this.setState({
                riskValue: newRiskValue
              });

              this.handleChange(event);
            }}
            value={this.state.smoking}
          >
            <option value="yes">Да</option>
            <option value="no">Нет</option>
            <option value="sometimes">Иногда</option>
          </Select>

          <Select
            name="drinking"
            placeholder="Выберите"
            top="Вы пьете?"
            onChange={event => {
              const currentRiskValue = this.state.riskValue;
              const lastValue = this.state.drinking;
              const currentValue = event.target.value;

              const getRiskValue = value => {
                switch (value) {
                  case "yes":
                    return 10;
                  case "no":
                    return -5;
                  case "sometimes":
                    return 5;
                  default:
                    return 0;
                }
              };
              const newRiskValue = this.getProperRiskValue(
                currentRiskValue -
                  getRiskValue(lastValue) +
                  getRiskValue(currentValue)
              );

              this.setState({
                riskValue: newRiskValue
              });

              this.handleChange(event);
            }}
            value={this.state.drinking}
          >
            <option value="yes">Да</option>
            <option value="no">Нет</option>
            <option value="sometimes">Иногда</option>
          </Select>
        </FormLayout>
        <Div>
          <Button
            size="xl"
            level="2"
            onClick={() =>
              connect.send("VKWebAppShare", {
                link: "https://vk.com/app7144030"
              })
            }
            data-to="questionnaire"
          >
            Поделиться приложением
          </Button>
        </Div>
      </Panel>
    );
  }
}

Questionnaire.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};
