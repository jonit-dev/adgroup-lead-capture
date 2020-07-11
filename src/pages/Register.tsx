import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { APIHelper } from '../helpers/APIHelper';
import { GenericHelper } from '../helpers/GenericHelper';
import { ValidationHelper } from '../helpers/ValidationHelper';
import { IUserInfo } from '../types/user.types';

export const Register: React.FC = (props) => {
  const promoterId = GenericHelper.getUrlQueryParamByName("promoterId");
  const payerId = GenericHelper.getUrlQueryParamByName("payerId"); // AdGroup

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: "",
    email: "",
  });

  const [leadCaptured, setLeadCaptured] = useState(false);

  const onHandleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(userInfo);

    // validate information
    const invalidFields = ValidationHelper.validateKeyValue(userInfo, {
      optionalFields: [],
      fieldLabels: {
        name: "Nome",
        email: "Email",
      },
    });

    if (invalidFields) {
      window.alert(`Por favor, corrija os seguintes campos: ${invalidFields}`);

      return;
    }

    const lead: IUserInfo = {
      name: userInfo.name,
      email: userInfo.email,
    };

    const payload = {
      promoterId,
      payerId: Number(payerId),
      lead,
    };

    console.log(payload);

    // send to api
    const response = await APIHelper.request("POST", "/credit", payload);

    console.log(response.data);

    // trigger lead captured and invite user to whatsapp group

    setLeadCaptured(true);
  };

  const onRedirectWhatsAppGroup = () => {
    const whatsappGroups = [
      "https://chat.whatsapp.com/CazUdtBgw09BAvA8bISqPL",
      "https://chat.whatsapp.com/D9JjLqXmxb54Oc1Q0P9FjE",
      "https://chat.whatsapp.com/Jk8g22tmH0w9U8lg18gNeQ",
    ];

    const randomGroup = _.sample(whatsappGroups);

    GenericHelper.crossBrowserUrlRedirect(randomGroup);
  };

  const onRenderLeadCaptureForm = () => {
    if (!leadCaptured) {
      return (
        <Form onSubmit={onSubmit}>
          <InputText
            name="name"
            value={userInfo.name}
            onChange={onHandleInputChange}
            placeholder="Nome"
          />
          <InputText
            name="email"
            value={userInfo.email}
            onChange={onHandleInputChange}
            placeholder="E-mail"
            type="email"
          />
          <Button className="jello-horizontal" color="red">
            Participar
          </Button>
        </Form>
      );
    } else {
      return (
        <WhatsAppContainer>
          <VideoResponsive>
            <iframe
              title="aulao"
              src="https://www.youtube.com/embed/OqaCaLY5HKA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </VideoResponsive>
          <p>
            Participe também de nosso grupo no WhatsApp e receba o aviso do
            Aulão! CLIQUE ABAIXO!
          </p>
          <Button
            className="jello-horizontal"
            color="#24CD63"
            onClick={onRedirectWhatsAppGroup}
          >
            Receber Aviso do Aulão
          </Button>
        </WhatsAppContainer>
      );
    }
  };

  return (
    <BackgroundImage>
      <Container>
        <Logo src="images/adgroup.png" />
        <Headline>
          <PreTitle>Mega Aulão</PreTitle>
          <Title>DESENHO MECÂNICO</Title>

          <Date>15 DE JULHO ÀS 19:30</Date>
        </Headline>
        <Body>{onRenderLeadCaptureForm()}</Body>
      </Container>
    </BackgroundImage>
  );
};

const Logo = styled.img`
  max-width: 140px;
  padding-top: 1rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 600px;
  margin: 0 auto;
`;

const WhatsAppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 86%;

  p {
    text-align: center;
    font-size: 1rem;
    color: white;
  }
`;

const Headline = styled.div`
  text-align: center;
  flex: 100%;
  max-width: 100%;
`;

const Body = styled.div`
  flex: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Form = styled.form`
  flex: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const InputText = styled.input`
  background-color: white;
  border: none;
  background-color: white;
  width: 100%;
  height: 50px;
  border-radius: 2px;
  font-size: 1.5rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
  flex: 100%;
`;

const Button = styled.button`
  background-color: ${({ color }) => color};
  border-radius: 2px;
  color: white;
  text-align: center;
  -webkit-flex: 100%;
  -ms-flex: 100%;
  flex: 100%;
  height: 52px;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  padding-left: 1rem;
  padding-right: 1rem;
  -webkit-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

const Date = styled.div`
  padding-top: 1rem;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  font-size: 1.8rem;
  line-height: 4rem;
  color: #ffcd37;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 1.5;
  margin-bottom: 1.3rem;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background: url("/register-bkg.jpg") repeat center;
  background-blend-mode: color-dodge;
  background-color: #0f110e;
  background-size: cover;
  padding-bottom: 5rem;
`;

const PreTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 2.5rem;
  color: #ffcd37;
  margin: 0;
`;

const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  color: #ffffff;
  margin-top: 5px;
  background-color: #0000007a;
`;

const VideoResponsive = styled.div`
  width: 100%;

  iframe {
    width: 100%;
    height: 160px;
  }
`;
