import styled from "styled-components";
import { colors, sizes, screens } from "variables";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import { useEffect, useState } from "react";
import { extractFile } from "lib/cms";
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
                    <picture>
                      <source
                        type="image/webp"
                        src={
                          extractFile(mv.image, "1600-webp")?.url ||
                          mv.image.url
                        }
                        srcSet={`${
                          extractFile(mv.image, "2000-webp")?.url ||
                          mv.image.url
                        } 2000w, ${
                          extractFile(mv.image, "1600-webp")?.url ||
                          mv.image.url
                        } 1600w, ${
                          extractFile(mv.image, "1200-webp")?.url ||
                          mv.image.url
                        } 1200w, ${
                          extractFile(mv.image, "800-webp")?.url || mv.image.url
                        } 800w`}
                      />
                      <source
                        src={extractFile(mv.image, "1600")?.url || mv.image.url}
                        srcSet={`${
                          extractFile(mv.image, "2000")?.url || mv.image.url
                        } 2000w, ${
                          extractFile(mv.image, "1600")?.url || mv.image.url
                        } 1600w, ${
                          extractFile(mv.image, "1200")?.url || mv.image.url
                        } 1200w, ${
                          extractFile(mv.image, "800")?.url || mv.image.url
                        } 800w`}
                      />
                      <img
                        src={extractFile(mv.image, "1600")?.url || mv.image.url}
                        srcSet={`${
                          extractFile(mv.image, "2000")?.url || mv.image.url
                        } 2000w, ${
                          extractFile(mv.image, "1600")?.url || mv.image.url
                        } 1600w, ${
                          extractFile(mv.image, "1200")?.url || mv.image.url
                        } 1200w, ${
                          extractFile(mv.image, "800")?.url || mv.image.url
                        } 800w`}
                        alt={mv.image.name}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </picture>
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
                      src={
                        extractFile(mv.mobileImage, "1200")?.url ||
                        mv.mobileImage.url
                      }
                      srcSet={`${
                        extractFile(mv.mobileImage, "2000")?.url ||
                        mv.mobileImage.url
                      } 2000w, ${
                        extractFile(mv.mobileImage, "1600")?.url ||
                        mv.mobileImage.url
                      } 1600w, ${
                        extractFile(mv.mobileImage, "1200")?.url ||
                        mv.mobileImage.url
                      } 1200w, ${
                        extractFile(mv.mobileImage, "800")?.url ||
                        mv.mobileImage.url
                      } 800w`}
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
    width: 1180px;
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
    border-radius: ${sizes.rounded};
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
