import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import styled from "styled-components";
import { ref, deleteObject } from "firebase/storage";
import { auth } from "../firebase";

const Wrapper = styled.div`
  width: 600px;
  margin: 40px 0px;
  background: #232526;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  padding: 32px 24px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Photo = styled.img`
  max-width: 100%;
  border-radius: 12px;
  margin-bottom: 24px;
`;
const Username = styled.div`
  font-size: 16px;
  color: #0ab68b;
  font-weight: bold;
  margin-bottom: 8px;
`;
const DateText = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-bottom: 16px;
`;
const Content = styled.div`
  font-size: 20px;
  margin-bottom: 24px;
  word-break: break-all;
`;
const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  font-weight: bold;
  border: 0;
  padding: 10px 24px;
  border-radius: 8px;
  margin-top: 16px;
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 16px;
  word-break: break-all;
`;

export default function DetailedTweet() {
  const { did } = useParams();
  const [tweet, setTweet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTweet = async () => {
      if (!did) return;
      const refDoc = doc(db, "forum1", did);
      const snap = await getDoc(refDoc);
      if (snap.exists()) {
        setTweet({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchTweet();
  }, [did]);

  const onDelete = async () => {
    if (!tweet) return;
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok) return;
    if (!user || user.uid !== tweet.userId) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    try {
      await deleteDoc(doc(db, "forum1", tweet.id));
      if (tweet.photo) {
        const photoRef = ref(storage, `forum1/${user.uid}/${tweet.id}`);
        await deleteObject(photoRef);
      }
      navigate("/");
    } catch (e) {
      alert("삭제 중 오류가 발생했습니다.");
      console.log(e);
    }
  };

  if (loading) return <Wrapper>로딩중...</Wrapper>;
  if (!tweet) return <Wrapper>존재하지 않는 게시글입니다.</Wrapper>;

  return (
    <Wrapper>
      <Title>{tweet.title}</Title>
      {tweet.photo && <Photo src={tweet.photo} alt="tweet" />}
      <Username>{tweet.username ?? "익명"}</Username>
      <DateText>
        {tweet.createdAt ? new Date(tweet.createdAt).toLocaleString() : ""}
      </DateText>
      <Content>{tweet.tweet}</Content>
      {user && user.uid === tweet.userId && (
        <Button onClick={onDelete}>게시글 삭제</Button>
      )}
    </Wrapper>
  );
}
