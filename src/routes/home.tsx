import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import NoticeSection from "../components/notice";
const Wrapper = styled.div`
  display: grid;
  // gap: 50px;
  gap: 10px;
  overflow-y: scroll;
  // grid-template-rows: 1fr 5fr;
  max-width: 950px;
  width: 100%;
  margin-top: 30px;
`;

export default function Home() {
  return (
    <Wrapper>
      {/* <PostTweetForm /> */}
      <Timeline />
    </Wrapper>
  );
}
