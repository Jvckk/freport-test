import { styled } from "styled-components";
import type { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  return (
    <Wrapper>
      <Column>
        <Payload>{tweet}</Payload>
        {/* {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null} */}
        <Username>{username}</Username>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
