import { styled } from "styled-components";
import type { ITweet } from "./timeline";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
`;

const Title = styled.div`
  font-size: 18px;
  color: #fff;
  margin: 10px 0px;
`;

export default function Tweet({ username, photo, id, title }: ITweet) {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate(`/${id}`)}>
      <Column>
        <Title>{title}</Title>
        <Username>{username}</Username>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
