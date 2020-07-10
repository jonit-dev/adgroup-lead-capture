import React, { useState } from 'react';
import styled from 'styled-components';

import { APIHelper } from '../helpers/APIHelper';
import { GenericHelper } from '../helpers/GenericHelper';
import { ValidationHelper } from '../helpers/ValidationHelper';
import { IUserInfo } from '../types/user.types';

interface IProps {}

export const Register: React.FC<IProps> = (props) => {
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
          <Button>Participar</Button>
        </Form>
      );
    } else {
      return <p>Show whatsapp group invite</p>;
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
  max-width: 200px;
  padding-top: 1rem;
`;

const Container = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 600px;
  margin: 0 auto;
`;

const Headline = styled.div`
  text-align: center;
  flex: 100%;
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
  background-color: red;
  border-radius: 2px;
  color: white;
  text-align: center;
  -webkit-flex: 100%;
  -ms-flex: 100%;
  flex: 100%;
  height: 52px;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
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
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background: url("/register-bkg.jpg") no-repeat center;
  background-blend-mode: color-dodge;
  background-color: #0f110e;
  background-size: cover;
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
  font-size: 3.5rem;
  color: #ffffff;
  margin-top: 5px;
  background-color: #0000007a;
`;
