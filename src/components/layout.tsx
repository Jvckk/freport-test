import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* 부모 색상 상속 */

  &:hover {
    text-decoration: none; /* hover시에도 밑줄 없음 */
  }
`;
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  // gap: 20px;
  grid-template-rows: 1fr 14fr;
  height: 100%;
  width: 100%;
`;

const UpperBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0ab68b;
  width: 100%;
  padding: 10px 0px;
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 960px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
  }
`;

const PostButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0ab68b;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
`;

const HomeButton = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.01);
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <UpperBar>
        <Menu>
          <StyledLink to="/">
            <HomeButton>프푸리포트</HomeButton>
          </StyledLink>
          <StyledLink to="/post">
            <PostButton>게시하기</PostButton>
          </StyledLink>
          <StyledLink to="/profile">
            <MenuItem>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
            </MenuItem>
          </StyledLink>
          <StyledLink to="/profile">
            <MenuItem onClick={onLogOut} className="log-out">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                ></path>
              </svg>
            </MenuItem>
          </StyledLink>
        </Menu>
      </UpperBar>
      <Outlet />
    </Wrapper>
  );
}
