import styled from "styled-components";
import { colors, sizes, screens } from "variables";
import { SideIconLink, LargeSideIconLink } from "components/button";

import { useState } from "react";
import { useRouter } from "next/router";
import { url } from "lib/util";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <Component>
      <div className="inner">
        <Sitelogo href="/">
          <div className="icon">
            <img src={url("images/icon_yanagawa_icon.png")} alt="アイコン" width="70" />
          </div>

          <div className="text">
            <img
              src={url("images/icon_yanagawa_text_cloud.png")}
              alt="ヤナガワ村役場"
              width="300"
            />
            <h1>{title}</h1>
          </div>
        </Sitelogo>

        <Menu>
          <li>
            <SideIconLink
              iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z"/></svg>'
              name="ヤナガワ村とは"
              to={url("about")}
              active={router.pathname.includes("about")}
            />
          </li>

          <li>
            <SideIconLink
              iconTag='<svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18.496 24h-.001c-.715 0-1.5-.569-1.5-1.5v-8.5s-1.172-.003-2.467 0c.802-6.996 3.103-14 4.66-14 .447 0 .804.357.807.851.01 1.395.003 16.612.001 21.649 0 .828-.672 1.5-1.5 1.5zm-11.505-12.449c0-.691-.433-.917-1.377-1.673-.697-.56-1.177-1.433-1.088-2.322.252-2.537.862-7.575.862-7.575h.6v6h1.003l.223-6h.607l.173 6h1.003l.242-6h.562l.199 6h1.003v-6h.549s.674 5.005.951 7.55c.098.902-.409 1.792-1.122 2.356-.949.751-1.381.967-1.381 1.669v10.925c0 .828-.673 1.5-1.505 1.5-.831 0-1.504-.672-1.504-1.5v-10.93z"/></svg>'
              name="飲食"
              to={url("restaurant")}
              active={router.pathname.includes("restaurant")}
            />
          </li>

          <li>
            <SideIconLink
              iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M11.476 8.853c-.469-.288-.616-.903-.328-1.372l3.004-5.004c.191-.312.517-.477.849-.477.776 0 1.259.855.851 1.519l-3.005 5.005c-.294.479-.91.611-1.371.329zm8.786 2.147l-.016.041-3.598 8.959h-9.296l-3.598-8.961-.015-.039h4.266c.92 1.247 2.372 2 3.994 2 1.596 0 3.06-.741 3.998-2h4.265zm3.738-2h-9.098l-.351.569c-.548.896-1.503 1.431-2.553 1.431-1.202 0-2.359-.72-2.812-2h-9.186v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.234-.481.722-.786 1.256-.786h.642v-2zm-14 9c0 .552-.447 1-1 1s-1-.448-1-1v-3c0-.552.447-1 1-1s1 .448 1 1v3zm6 0c0 .552-.447 1-1 1s-1-.448-1-1v-3c0-.552.447-1 1-1s1 .448 1 1v3zm-3 0c0 .552-.447 1-1 1s-1-.448-1-1v-3c0-.552.447-1 1-1s1 .448 1 1v3z"/></svg>'
              name="物販・サービス"
              to={url("shop")}
              active={router.pathname.includes("shop")}
            />
          </li>

          <li>
            <SideIconLink
              iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 2v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm6.687 13.482c0-.802-.418-1.429-1.109-1.695.528-.264.836-.807.836-1.503 0-1.346-1.312-2.149-2.581-2.149-1.477 0-2.591.925-2.659 2.763h1.645c-.014-.761.271-1.315 1.025-1.315.449 0 .933.272.933.869 0 .754-.816.862-1.567.797v1.28c1.067 0 1.704.067 1.704.985 0 .724-.548 1.048-1.091 1.048-.822 0-1.159-.614-1.188-1.452h-1.634c-.032 1.892 1.114 2.89 2.842 2.89 1.543 0 2.844-.943 2.844-2.518zm4.313 2.518v-7.718h-1.392c-.173 1.154-.995 1.491-2.171 1.459v1.346h1.852v4.913h1.711z"/></svg>'
              name="イベント"
              to={url("event")}
              active={router.pathname.includes("event")}
            />
          </li>

          <li>
            <SideIconLink
              iconTag='<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2 4v16.002c0 .385.22.735.567.902.346.166.758.119 1.058-.121l4.725-3.781h12.65c.552 0 1-.448 1-1v-12.002c0-.552-.448-1-1-1h-18c-.552 0-1 .448-1 1zm9.998 5.002c.414 0 .75.336.75.75v3.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75zm.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill-rule="nonzero"/></svg>'
              name="お知らせ"
              to={url("news")}
              active={router.pathname.includes("news")}
            />
          </li>

          {/*<li>
            <SideIconLink
              iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M11.333 8.701l-7.837 4.262s-1.339 5.254-3.497 8.604l2.419 2.433c3.314-2.133 8.604-3.511 8.604-3.511l4.263-7.837-3.952-3.951zm-1.664 10.091c-1.241.365-3.64 1.131-5.915 2.207l1.806-1.806c.348-.349.8-.569 1.288-.63.647-.081 1.113-.63 1.113-1.263 0-.703-.569-1.275-1.275-1.275-.637 0-1.183.471-1.263 1.113-.06.487-.281.94-.629 1.288l-1.779 1.779c1.072-2.274 1.825-4.652 2.184-5.891l5.778-3.143 1.838 1.837-3.146 5.784zm2.345-12.252s2.148-3.969 3.475-6.54l8.511 8.511c-2.582 1.321-6.556 3.459-6.556 3.459l-5.43-5.43z"/></svg>'
              name="ブログ"
              to={url("blog")}
              active={router.pathname.includes("blog")}
            />
          </li>*/}
        </Menu>
      </div>

      <Hamburger expanded={expanded}>
        <button type="button" onClick={() => setExpanded((v) => !v)}>
          <div className="icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className="menu">
          <ul>
            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z"/></svg>'
                name="ヤナガワ村とは"
                to={url("about")}
                active={router.pathname.includes("about")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18.496 24h-.001c-.715 0-1.5-.569-1.5-1.5v-8.5s-1.172-.003-2.467 0c.802-6.996 3.103-14 4.66-14 .447 0 .804.357.807.851.01 1.395.003 16.612.001 21.649 0 .828-.672 1.5-1.5 1.5zm-11.505-12.449c0-.691-.433-.917-1.377-1.673-.697-.56-1.177-1.433-1.088-2.322.252-2.537.862-7.575.862-7.575h.6v6h1.003l.223-6h.607l.173 6h1.003l.242-6h.562l.199 6h1.003v-6h.549s.674 5.005.951 7.55c.098.902-.409 1.792-1.122 2.356-.949.751-1.381.967-1.381 1.669v10.925c0 .828-.673 1.5-1.505 1.5-.831 0-1.504-.672-1.504-1.5v-10.93z"/></svg>'
                name="飲食"
                to={url("restaurant")}
                active={router.pathname.includes("restaurant")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M11.476 8.853c-.469-.288-.616-.903-.328-1.372l3.004-5.004c.191-.312.517-.477.849-.477.776 0 1.259.855.851 1.519l-3.005 5.005c-.294.479-.91.611-1.371.329zm8.786 2.147l-.016.041-3.598 8.959h-9.296l-3.598-8.961-.015-.039h4.266c.92 1.247 2.372 2 3.994 2 1.596 0 3.06-.741 3.998-2h4.265zm3.738-2h-9.098l-.351.569c-.548.896-1.503 1.431-2.553 1.431-1.202 0-2.359-.72-2.812-2h-9.186v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.234-.481.722-.786 1.256-.786h.642v-2zm-14 9c0 .552-.447 1-1 1s-1-.448-1-1v-3c0-.552.447-1 1-1s1 .448 1 1v3zm6 0c0 .552-.447 1-1 1s-1-.448-1-1v-3c0-.552.447-1 1-1s1 .448 1 1v3zm-3 0c0 .552-.447 1-1 1s-1-.448-1-1v-3c0-.552.447-1 1-1s1 .448 1 1v3z"/></svg>'
                name="物販・サービス"
                to={url("shop")}
                active={router.pathname.includes("shop")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 2v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm6.687 13.482c0-.802-.418-1.429-1.109-1.695.528-.264.836-.807.836-1.503 0-1.346-1.312-2.149-2.581-2.149-1.477 0-2.591.925-2.659 2.763h1.645c-.014-.761.271-1.315 1.025-1.315.449 0 .933.272.933.869 0 .754-.816.862-1.567.797v1.28c1.067 0 1.704.067 1.704.985 0 .724-.548 1.048-1.091 1.048-.822 0-1.159-.614-1.188-1.452h-1.634c-.032 1.892 1.114 2.89 2.842 2.89 1.543 0 2.844-.943 2.844-2.518zm4.313 2.518v-7.718h-1.392c-.173 1.154-.995 1.491-2.171 1.459v1.346h1.852v4.913h1.711z"/></svg>'
                name="イベント"
                to={url("event")}
                active={router.pathname.includes("event")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2 4v16.002c0 .385.22.735.567.902.346.166.758.119 1.058-.121l4.725-3.781h12.65c.552 0 1-.448 1-1v-12.002c0-.552-.448-1-1-1h-18c-.552 0-1 .448-1 1zm9.998 5.002c.414 0 .75.336.75.75v3.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75zm.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill-rule="nonzero"/></svg>'
                name="お知らせ"
                to={url("news")}
                active={router.pathname.includes("news")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z"/></svg>'
                name="ヤナガワ村民について"
                to={url("villager")}
                active={router.pathname.includes("villager")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>'
                name="協力してくれる方募集"
                to={url("wanted")}
                active={router.pathname.includes("wanted")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>'
                name="お問い合わせ"
                to={url("contact")}
                active={router.pathname.includes("contact")}
              />
            </li>

            <li>
              <LargeSideIconLink
                iconTag='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M6 8v-2c0-3.313 2.686-6 6-6 3.312 0 6 2.687 6 6v2h-2v-2c0-2.206-1.795-4-4-4s-4 1.794-4 4v2h-2zm15 2v14h-18v-14h18zm-2 2h-14v10h14v-10z"/></svg>'
                name="個人情報保護方針"
                to={url("privacy-policy")}
                active={router.pathname.includes("privacy-policy")}
              />
            </li>
          </ul>
        </div>
      </Hamburger>
    </Component>
  );
};

const Component = styled.div`
  position: relative;
  width: 100%;
  background-color: ${colors.white};

  .inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: ${sizes.gapM} ${sizes.gapXL};
  }

  @media only screen and (max-width: ${screens.m}px) {
    .inner {
      padding: ${sizes.gapM} ${sizes.gapL};
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .inner {
      padding: ${sizes.gapM} ${sizes.gapM};
    }
  }
`;

const Sitelogo = styled.a`
  display: flex;
  align-items: center;
  color: ${colors.black};
  text-decoration: none;

  .icon {
    img {
      width: auto;
      height: 72px;
      vertical-align: middle;
    }
  }

  .text {
    margin-left: ${sizes.gapM};

    img {
      width: auto;
      height: 32px;
    }

    h1 {
      max-width: 300px;
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1.5;
    }
  }

  @media only screen and (max-width: ${screens.l}px) {
    .icon {
      img {
        height: 64px;
      }
    }

    .text {
      img {
        height: 27px;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .icon {
      img {
        height: 47px;
      }
    }

    .text {
      img {
        height: 22px;
      }
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: ${sizes.gapS};
  list-style: none;

  @media only screen and (max-width: 1192px) {
    display: none;
  }
`;

type HamburgerProps = {
  expanded: boolean;
};

const Hamburger = styled.div<HamburgerProps>`
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100vw;
  pointer-events: none;

  button {
    position: absolute;
    z-index: 2;
    bottom: ${sizes.gapM};
    right: ${sizes.gapXL};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    background-color: ${colors.theme};
    border-radius: 5px;
    pointer-events: auto;
  }

  @media only screen and (max-width: ${screens.m}px) {
    button {
      right: ${sizes.gapL};
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    button {
      right: ${sizes.gapM};
    }
  }

  button > .icon {
    position: relative;
    display: inline-block;
    width: 38px;
    height: 32px;
    transition-duration: 0.5s;

    span {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 4px;
      background-color: ${colors.white};
      border-radius: 4px;
      transition-duration: 0.5s;

      &:nth-of-type(1) {
        top: 0px;
      }

      &:nth-of-type(2) {
        top: 14px;
      }

      &:nth-of-type(3) {
        bottom: 0px;
      }
    }

    ${(p) =>
      p.expanded &&
      `
      transform: rotate(-360deg);

      span {
        &:nth-of-type(1) {
          transform: translateY(14px) rotate(-45deg);
        }

        &:nth-of-type(2) {
          transform: translateY(0) rotate(45deg);
        }

        &:nth-of-type(3) {
          opacity: 0;
        }
      }
    `}
  }

  .menu {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: ${sizes.gapL};
    background-color: rgba(255, 255, 255, 0.9);
    background-color: ${colors.white};
    transform: translateX(0);
    transition-duration: 0.3s;
    pointer-events: auto;

    ${(p) =>
      p.expanded &&
      `
      transform: translateX(-100vw);
    `}

    ul {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      list-style: none;
    }

    li {
      display: flex;
      padding: ${sizes.gapL} ${sizes.gapM};
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .menu {
      justify-content: flex-start;
      align-items: flex-start;
      overflow-y: scroll;

      ul {
        flex-direction: column;
        flex-wrap: nowrap;
      }

      li {
        padding: ${sizes.gapS} 0;
      }
    }
  }
`;
