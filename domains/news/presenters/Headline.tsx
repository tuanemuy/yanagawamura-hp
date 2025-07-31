import { format } from "date-fns";
import styled from "styled-components";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { colors, screens, sizes } from "variables";

import type { News } from "../";

type Props = {
  news: News[];
};

export const Headline = ({ news }: Props) => {
  return (
    <Component className="inview inview__rl inview__delay2">
      {news.length > 0 && (
        <Swiper
          spaceBetween={16 * 4}
          slidesPerView={"auto"}
          centeredSlides
          loop
          freeMode
          speed={20000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, FreeMode]}
        >
          {news.map((n: News) => {
            return (
              <SwiperSlide key={n.id}>
                <a href={`/news/${n.id}`}>
                  <div className="category">
                    <p>{n.category.name}</p>
                  </div>
                  <div className="title">
                    <p>{format(n.createdAt, "yyyy.MM.dd")}</p>
                    <p>{n.title}</p>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Component>
  );
};

const Component = styled.div`
  width: 100%;
  padding: ${sizes.gapM} 0;

  a {
    display: flex;
    align-items: center;
    gap: ${sizes.gapM};
    text-decoration: none;
    color: ${colors.black};
    font-size: 1rem;
  }

  .category {
    flex-shrink: 0;
    padding: 0 ${sizes.gapS};
    line-height: 1.75;
    color: ${colors.white};
    background-color: ${colors.darkGray};
    border-radius: 3px;
  }

  .title {
    display: flex;
    align-items: center;
    gap: ${sizes.gapS};
    flex-shrink: 0;
    border-bottom: 1px solid ${colors.black};
    line-height: 0.9;
  }

  .swiper-free-mode > .swiper-wrapper {
    transition-timing-function: linear;
  }

  .swiper-slide {
    width: auto;
  }

  @media only screen and (max-width: ${screens.xs}px) {
    padding: 1.75rem 0;
  }
`;
