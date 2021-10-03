import media from "lib/styles/media";
import React from "react";
import styled, { css } from "styled-components";

interface ImageProps {
  text?: string;
  img?: string;
  size: "big" | "small";
}

const Image = ({ text, img, size }: ImageProps) => {
  return (
    <ImageBlock size={size}>
      <div className="Image-img">
        <img src={img} alt={text} />
      </div>
      <div className="txt">{text}</div>
    </ImageBlock>
  );
};

const ImageBlock = styled.div<{ size: "big" | "small" }>`
  .Image-img {
    margin: 0 auto;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .txt {
    text-align: center;
    color: rgb(114, 130, 138);
    font-weight: 700;
  }
  ${({ size }) =>
    size === "big"
      ? css`
          .Image-img {
            width: 400px;
            ${media.xlarge} {
              width: 300px;
            }
            ${media.xsmall} {
              width: 200px;
            }
          }
          .txt {
            font-size: 30px;
            ${media.xlarge} {
              font-size: 25px;
            }
            ${media.xsmall} {
              font-size: 18px;
            }
          }
        `
      : css`
          .Image-img {
            width: 250px;
          }
          .txt {
            font-size: 20px;
          }
        `}
`;

export default Image;
