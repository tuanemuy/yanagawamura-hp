import styled from "styled-components";
import { colors, sizes, screens } from "variables";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import { useEffect, useState } from "react";
import { MainVisual } from "../";

type Props = {
  mainVisuals: MainVisual[];
};

export const Slider = ({ mainVisuals }: Props) => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <Component className="inview inview__scale0910">
      {width && mainVisuals.length > 0 && (
        <Swiper
          spaceBetween={30}
          slidesPerView={"auto"}
          centeredSlides
          navigation
          pagination
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {width > screens.s &&
            mainVisuals.map((mv: MainVisual, index: number) => {
              return (
                <SwiperSlide key={mv.id}>
                  <Slide href={mv.url}>
                    <img
                      src={mv.image.url}
                      alt={mv.image.name}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slide>
                </SwiperSlide>
              );
            })}

          {width <= screens.s &&
            mainVisuals.map((mv: MainVisual, index: number) => {
              return (
                <SwiperSlide key={mv.id}>
                  <Slide href={mv.url}>
                    <img
                      src={mv.mobileImage.url}
                      alt={mv.mobileImage.name}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slide>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </Component>
  );
};

const Component = styled.div`
  position: relative;
  width: 100%;

  .swiper-slide {
    width: 1240px;
    overflow: hidden;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: ${colors.theme};
  }

  .swiper-pagination-bullet-active {
    background-color: ${colors.theme};
  }

  @media only screen and (max-width: ${screens.l}px) {
    .swiper-slide {
      width: 1030px;
    }
  }

  @media only screen and (max-width: ${screens.m}px) {
    .swiper-slide {
      width: 760px;
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    .swiper-slide {
      width: 470px;
    }
  }

  @media only screen and (max-width: ${screens.xs}px) {
    .swiper-slide {
      width: 94%;
    }
  }
`;

const Slide = styled.a`
  position: relative;
  display: block;
  border-radius: ${sizes.rounded};
  overflow: hidden;

  &::before {
    content: "";
    position: relative;
    display: block;
    padding-top: 56.25%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition-duration: 0.3s;
  }

  &:hover {
    img {
      transform: scale(1.03);
    }
  }

  @media only screen and (max-width: ${screens.s}px) {
    &::before {
      padding-top: 100%;
    }
  }
`;
