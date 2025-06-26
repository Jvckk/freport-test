import styled from "styled-components";

const NoticeSection = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #444;
`;

const NoticeItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: background-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #333;
  }
`;

const NoticeTitle = styled.div`
  flex: 1;
  color: #fff;
`;

const NoticeBadge = styled.div`
  background-color: #0ab68b;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const NoticeViews = styled.div`
  color: #888;
  font-size: 12px;
`;

export default function Notice() {
  return (
    <NoticeSection>
      <NoticeItem>
        <NoticeBadge>공지</NoticeBadge>
        <NoticeTitle>6월 27일 프푸리포트 서비스 점검 안내</NoticeTitle>

        <NoticeViews>조회수 109</NoticeViews>
      </NoticeItem>
      <NoticeItem>
        <NoticeBadge style={{ backgroundColor: "#ff6b6b" }}>필독</NoticeBadge>
        <NoticeTitle>그린마트 오픈 예정 안내</NoticeTitle>

        <NoticeViews>조회수 183</NoticeViews>
      </NoticeItem>
    </NoticeSection>
  );
}
