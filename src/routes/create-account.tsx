import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px;
`;
export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //create account
      // set the name of the user
      // redirect to the home page
    } catch (error) {
      console.log(error);
      //set error
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Create Account</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          type="text"
          placeholder="username"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          type="email"
          placeholder="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          type="password"
          placeholder="password"
          required
          autoComplete="new-password"
        />
        <Input
          name="CreateAccount"
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
    </Wrapper>
  );
}
