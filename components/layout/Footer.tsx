import styled from "styled-components";
import { colors, sizes, screens } from "variables";
import { Stacked, Columns, PlainText } from "unflexible-ui-core";
import { SideIconLink, Social } from "components/button";

import { useRouter } from "next/router";
import { url } from "lib/util";

type Props = {};

export const Footer = ({}: Props) => {
  const router = useRouter();

  return (
    <Component>
      <Stacked paddingPos="top" paddingSize="narrow" wrap>
        <Stacked paddingPos="none">
          <div className="inner">
            <div className="info">
              <Sitelogo href="/">
                <div className="icon">
                  <img
                    src={url("images/icon_yanagawa_icon.png")}
                    alt="アイコン"
                    width="70"
                  />
                </div>

                <div className="text">
                  <img
                    src={url("images/icon_yanagawa_text_cloud.png")}
                    alt="ヤナガワ村役場"
                    width="300"
                  />
                  <p>YANAGAWA VILLAGE OFFICE</p>
                </div>
              </Sitelogo>
            </div>

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
                  name="ニュース"
                  to={url("news")}
                  active={router.pathname.includes("news")}
                />
              </li>
            </Menu>
          </div>
        </Stacked>

        <Stacked paddingPos="none">
          <Columns justify="flex-start" align="center" gap="normal">
            <Social
              name="LINE"
              to="https://line.me/R/ti/p/@140ixtev"
              icon={url("images/line.png")}
              scale={0.5}
            />

            <Social
              name="Facebook"
              to="https://www.facebook.com/shin.yanagawamura.yakuba"
              icon={url("images/facebook.png")}
              scale={0.5}
            />

            <Social
              name="Instagram"
              to="https://www.instagram.com/shin.yanagawa.yakuba/"
              icon={url("images/instagram.png")}
              scale={0.5}
            />
          </Columns>
        </Stacked>
      </Stacked>

      <Stacked paddingSize="narrow" wrap>
        <Sitemap>
          <ul>
            <li>
              <a href={url("")}>ホーム</a>
            </li>
            <li>
              <a href={url("about")}>ヤナガワ村とは</a>
            </li>
            <li>
              <a href={url("restaurant")}>飲食</a>
            </li>
            <li>
              <a href={url("shop")}>物販・サービス</a>
            </li>
            <li>
              <a href={url("event")}>イベント</a>
            </li>
            <li>
              <a href={url("news")}>ニュース</a>
            </li>
            <li>
              <a href={url("villager")}>ヤナガワ村民について</a>
            </li>
            <li>
              <a href={url("wanted")}>協力してくれる方募集</a>
            </li>
            <li>
              <a href={url("contact")}>お問い合わせ</a>
            </li>
            <li>
              <a href={url("privacy-policy")}>個人情報保護方針</a>
            </li>
            <li>
              <a href={url("sponsor")}>スポンサー紹介</a>
            </li>
          </ul>
        </Sitemap>
      </Stacked>

      <Stacked paddingPos="none">
        <PlainText baseAlign="center" baseLineHeight="2">
          <p>Copyright ©ヤナガワ村役場 all rights reserved.</p>
        </PlainText>
      </Stacked>
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
    padding: ${sizes.gapM} 0;
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

    p {
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1;
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

const Sitemap = styled.div`
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    gap: ${sizes.gapL};

    a {
      text-decoration: none;
      color: ${colors.black};
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
