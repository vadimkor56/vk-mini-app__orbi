import React, { useState } from "react";
import PropTypes from "prop-types";
import { Panel, Button, Div, PanelHeader } from "@vkontakte/vkui";
import "./Home.css";
// import { InfoBlockAboutInsult } from "../../components/InfoBlockAboutInsult";
// import connect from "@vkontakte/vk-connect";
import { TripleDotsIcon } from "../../icons/TripleDotsIcon";
import { ArrowIcon } from "../../icons/ArrowIcon";

export const Home = ({ id, go, fetchedUser }) => {
  const [state, setState] = useState({
    mainText: "Мы благотворительный фонд по борьбе с инсультом.",
    page: 1,
    buttonTitle: "Дальше",
    dataTo: undefined,
    onClick: () => {
      setState({
        mainText: "Ответьте, пожалуйста, на несколько вопросов, чтобы...",
        page: 2,
        buttonTitle: "Начать",
        onClick: go
      });
    }
  });
  return (
    <Panel id={id} className="home">
      <PanelHeader className="home__header">SLK</PanelHeader>
      <Div className="home">
        <Div className="home__header">
          <h1>{`Привет, ${fetchedUser ? fetchedUser.first_name : "друг"}!`}</h1>
          <h1>Рады видеть Вас в ОРБИ</h1>
        </Div>

        <Div className="home__main">
          <div>{state.mainText}</div>
          <div>
            <TripleDotsIcon page={state.page} />
          </div>
        </Div>

        <Div className="home__control">
          <Button
            size="xl"
            level="2"
            onClick={state.onClick}
            data-to="questionnaire"
            className="home__control-button"
          >
            <div style={{ marginBottom: "10px" }}>{state.buttonTitle}</div>
            <ArrowIcon />
          </Button>
        </Div>
      </Div>

      {/*<Group title="ОБЩАЯ ИНФОРМАЦИЯ">*/}
      {/*  <Div>*/}
      {/*    <InfoBlockAboutInsult />*/}
      {/*    <Div>*/}
      {/*      <Button size="xl" level="2" onClick={go} data-to="info">*/}
      {/*        Узнать больше*/}
      {/*      </Button>*/}
      {/*    </Div>*/}
      {/*    <Div>*/}
      {/*      <Button size="xl" level="2" onClick={go} data-to="questionnaire">*/}
      {/*        Начать*/}
      {/*      </Button>*/}
      {/*    </Div>*/}
      {/*    <Div>*/}
      {/*      <Button*/}
      {/*        size="xl"*/}
      {/*        level="2"*/}
      {/*        onClick={() =>*/}
      {/*          connect.send("VKWebAppShare", {*/}
      {/*            link: "https://vk.com/app7144030"*/}
      {/*          })*/}
      {/*        }*/}
      {/*        data-to="questionnaire"*/}
      {/*      >*/}
      {/*        Поделиться*/}
      {/*      </Button>*/}
      {/*    </Div>*/}
      {/*  </Div>*/}
      {/*</Group>*/}
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string
    })
  })
};
