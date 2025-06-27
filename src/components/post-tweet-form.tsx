import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 30px 0px;
  width: 100%;
  max-width: 900px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: #303031;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #028174;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: white;

  text-align: center;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #028174;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const TitleInput = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 18px;
  color: white;
  background-color: #303031;
  width: 100%;
  margin-bottom: 8px;
  &::placeholder {
    color: #bbb;
    font-size: 18px;
  }
  &:focus {
    outline: none;
    border-color: #028174;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (
      !user ||
      isLoading ||
      tweet === "" ||
      title === "" ||
      tweet.length > 180
    )
      return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "forum1"), {
        tweet,
        title,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `forum1/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setTitle("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <TitleInput
          required
          maxLength={40}
          value={title}
          onChange={onTitleChange}
          placeholder="제목을 입력하세요"
        />
        <TextArea
          required
          rows={5}
          maxLength={180}
          onChange={onChange}
          value={tweet}
          placeholder="나만의 일상을 공유해보세요!"
        />
        <AttachFileButton htmlFor="file">
          {file ? "사진 추가 완료" : "사진 추가하기"}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        <SubmitBtn type="submit" value={isLoading ? "게시중..." : "게시하기"} />
      </Form>
    </Wrapper>
  );
}
