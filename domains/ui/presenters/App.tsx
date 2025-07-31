import { rgba } from "polished";
import { StoreContext } from "providers";
import { type ReactNode, useContext } from "react";
import styled from "styled-components";
import { colors } from "variables";

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
  background-color: ${rgba(colors.lightGray, 0.8)};
`;
