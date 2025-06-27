import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  // gap: 50px; // 홈에 요소 추가하면 줄 추가
  gap: 10px;
  overflow-y: scroll;
  // grid-template-rows: 1fr 5fr; 홈에 요소 추가하면 줄 추가
  max-width: 950px;
  width: 100%;
`;

export default function Home() {
  return (
    <Wrapper>
      {/* <PostTweetForm /> */}
      <Timeline />
    </Wrapper>
  );
}
