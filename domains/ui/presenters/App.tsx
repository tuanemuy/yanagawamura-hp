import styled from "styled-components";
import { rgba } from "polished";
import { colors } from "variables";
import { ReactNode, useContext } from "react";
import { StoreContext } from "providers";

type Props = {
  children: ReactNode;
};

export const App = ({ children }: Props) => {
  const { popup } = useContext(StoreContext);

  return (
    <>
      {popup.content && <Popup>{popup.content}</Popup>}
      {children}
    </>
  );
};

const Popup = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.75);
  background-color: ${rgba(colors.lightGray, .8)};
`;
