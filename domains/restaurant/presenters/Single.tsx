import styled from "styled-components";
import { colors, sizes, screens } from "variables";
import { Columns, Stacked, Block } from "unflexible-ui-core";
import { PlainText } from "components/container";
import { MiniButton } from "components/button";
import { ListItem as MediaItem } from "domains/media";
import { ListItem as MenuItem } from "domains/menu";
import { ListItem as StaffItem } from "domains/staff";

import { useRouter } from "next/router";
import { nl2br } from "lib/util";
import { extractFile } from "lib/cms";
import { Restaurant, Tag } from "../";
import { Menu } from "domains/menu";
import { Staff } from "domains/staff";
import { Media } from "domains/media";

type Props = {
  restaurant: Restaurant;
};

export const Single = ({ restaurant }: Props) => {
  const router = useRouter();

  return (
    <Component>
      <Stacked paddingPos="none">
        <div className="title">
          <h1>{restaurant.title}</h1>

          <div className="meta">
            <p>
              <a href={`/restaurant/category/${restaurant.category.id}`}>
                {restaurant.category.name}
              </a>
            </p>
            <ul>
              {restaurant.tags.map((tag: Tag) => {
                return (
                  <li key={tag.id}>
                    <a href={`/restaurant/tag/${tag.id}`}>{tag.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Stacked>

      <Stacked paddingPos="top" paddingSize="thin">
        <div className="header">
          <div className="thumbnail">
            <picture>
              <source
                type="image/webp"
                src={
                  extractFile(restaurant.keyVisual, "1200-webp")?.url ||
                  restaurant.keyVisual.url
                }
                srcSet={`${
                  extractFile(restaurant.keyVisual, "2000-webp")?.url ||
                  restaurant.keyVisual.url
                } 2000w, ${
                  extractFile(restaurant.keyVisual, "1600-webp")?.url ||
                  restaurant.keyVisual.url
                } 1600w, ${
                  extractFile(restaurant.keyVisual, "1200-webp")?.url ||
                  restaurant.keyVisual.url
                } 1200w, ${
                  extractFile(restaurant.keyVisual, "800-webp")?.url ||
                  restaurant.keyVisual.url
                } 800w`}
                sizes={`50vw, (max-width: ${screens.m}px) 100vw`}
              />
              <source
                src={
                  extractFile(restaurant.keyVisual, "1200")?.url ||
                  restaurant.keyVisual.url
                }
                srcSet={`${
                  extractFile(restaurant.keyVisual, "2000")?.url ||
                  restaurant.keyVisual.url
                } 2000w, ${
                  extractFile(restaurant.keyVisual, "1600")?.url ||
                  restaurant.keyVisual.url
                } 1600w, ${
                  extractFile(restaurant.keyVisual, "1200")?.url ||
                  restaurant.keyVisual.url
                } 1200w, ${
                  extractFile(restaurant.keyVisual, "800")?.url ||
                  restaurant.keyVisual.url
                } 800w`}
                sizes={`50vw, (max-width: ${screens.m}px) 100vw`}
              />
              <img
                src={
                  extractFile(restaurant.keyVisual, "1200")?.url ||
                  restaurant.keyVisual.url
                }
                srcSet={`${
                  extractFile(restaurant.keyVisual, "2000")?.url ||
                  restaurant.keyVisual.url
                } 2000w, ${
                  extractFile(restaurant.keyVisual, "1600")?.url ||
                  restaurant.keyVisual.url
                } 1600w, ${
                  extractFile(restaurant.keyVisual, "1200")?.url ||
                  restaurant.keyVisual.url
                } 1200w, ${
                  extractFile(restaurant.keyVisual, "800")?.url ||
                  restaurant.keyVisual.url
                } 800w`}
                sizes={`50vw, (max-width: ${screens.m}px) 100vw`}
                alt={restaurant.title}
                loading="lazy"
              />
            </picture>
          </div>

          <div className="info">
            <p className="overview">{restaurant.overview}</p>

            <dl>
              <div>
                <dt>住所</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: nl2br(restaurant.address),
                  }}
                />
              </div>
              <div>
                <dt>営業時間</dt>
                <dd
                  dangerouslySetInnerHTML={{ __html: nl2br(restaurant.hours) }}
                />
              </div>
              <div>
                <dt>定休日</dt>
                <dd dangerouslySetInnerHTML={{ __html: restaurant.holidays }} />
              </div>
              <div>
                <dt>公式サイト</dt>
                <dd>
                  {restaurant.website ? (
                    <a href={restaurant.website} target="_blank">
                      {restaurant.website}
                    </a>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Stacked>

      <Stacked paddingPos="top" paddingSize="narrow">
        <PlainText text={restaurant.details} />
      </Stacked>

      {restaurant.menu.length > 0 && (
        <Stacked paddingPos="top" paddingSize="narrow">
          <div className="menu">
            <Stacked paddingPos="none">
              <h2>イチオシメニュー</h2>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns repeatXL={3} repeatS={1} gap="normal">
                {restaurant.menu.map((m: Menu) => (
                  <Block>
                    <MenuItem menu={m} />
                  </Block>
                ))}
              </Columns>
            </Stacked>
          </div>
        </Stacked>
      )}

      {restaurant.staff.length > 0 && (
        <Stacked paddingPos="top" paddingSize="narrow">
          <div className="staff">
            <Stacked paddingPos="none">
              <h2>スタッフ</h2>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns repeatXL={1} gap="normal">
                {restaurant.staff.map((s: Staff) => (
                  <Block>
                    <StaffItem staff={s} />
                  </Block>
                ))}
              </Columns>
            </Stacked>
          </div>
        </Stacked>
      )}

      {restaurant.googleMap && (
        <Stacked paddingPos="top" paddingSize="narrow">
          <div className="map">
            <h2>マップ</h2>
            <div dangerouslySetInnerHTML={{ __html: restaurant.googleMap }} />
          </div>
        </Stacked>
      )}

      {restaurant.gallery.length > 0 && (
        <Stacked paddingPos="top" paddingSize="narrow">
          <div className="gallery">
            <Stacked paddingPos="none">
              <h2>ギャラリー</h2>
            </Stacked>

            <Stacked paddingPos="top" paddingSize="thin">
              <Columns repeatXL={3} repeatS={2} gap="narrow">
                {restaurant.gallery.map((m: Media) => (
                  <Block>
                    <MediaItem media={m} />
                  </Block>
                ))}
              </Columns>
            </Stacked>
          </div>
        </Stacked>
      )}

      <Stacked paddingPos="top" paddingSize="thin">
        <Columns justify="center">
          <MiniButton
            type="button"
            name="一覧に戻る"
            onClick={() => router.back()}
            color={colors.theme}
          />
        </Columns>
      </Stacked>
    </Component>
  );
};

const Component = styled.article`
  position: relative;

  .title {
    h1 {
      font-size: 2.5rem;
      line-height: 1.5;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .title {
      h1 {
        font-size: 2rem;
      }
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .title {
      h1 {
        font-size: 1.75rem;
      }
    }
  }

  .header {
    display: flex;
    align-items: flex-start;
  }

  @media only screen and (max-width: ${screens.m}px) {
    .header {
      display: block;
    }
  }

  .thumbnail {
    position: relative;
    flex-shrink: 0;
    flex-grow: 0;
    width: 50%;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .thumbnail {
      width: 100%;
    }
  }

  .info {
    margin-left: ${sizes.gapL};

    .overview {
      line-height: 1.75;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .info {
      margin-top: ${sizes.gapM};
      margin-left: 0;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    margin-top: ${sizes.gapS};

    p {
      flex-shrink: 0;

      a {
        display: block;
        color: ${colors.white};
        padding: ${sizes.gapXS} ${sizes.gapS};
        background-color: ${colors.theme};
        line-height: 1.5;
        border-radius: 3px;
        text-decoration: none;
      }
    }

    ul {
      margin-left: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
    }

    li {
      flex-shrink: 0;
      line-height: 1.5;

      a {
        display: block;
        color: ${colors.black};

        &::before {
          content: "#";
        }
      }
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .meta {
      flex-direction: column;
      align-items: flex-start;

      ul {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }

  dl {
    margin-top: ${sizes.gapM};

    > div {
      display: flex;

      &:not(:first-child) {
        margin-top: ${sizes.gapM};
      }
    }

    dt {
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 8rem;
      padding: ${sizes.gapXS};
      background-color: ${colors.gray};
      border-radius: 3px;
      text-align: center;
    }

    dd {
      margin-left: ${sizes.gapS};
      padding: ${sizes.gapXS};
      line-height: 1.5;
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    dl {
      > div {
        display: block;
      }

      dt {
        width: 100%;
      }

      dd {
        margin-left: 0;
        margin-top: ${sizes.gapS};
      }
    }
  }

  .menu,
  .staff,
  .map,
  .gallery {
    h2 {
      padding: ${sizes.gapS} 0;
      font-size: 1.25rem;
      text-align: center;
      border-top: 5px solid ${colors.gray};
      border-bottom: 5px solid ${colors.gray};
    }
  }

  .map {
    > div {
      position: relative;
      width: 100%;
      margin-top: ${sizes.gapL};

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      &::before {
        position: relative;
        z-index: 1;
        content: "";
        display: block;
        padding-top: 50%;
      }
    }
  }
`;
