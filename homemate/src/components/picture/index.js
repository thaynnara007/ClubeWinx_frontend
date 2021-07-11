import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Picture({ listPost }) {

  return (
    <Carousel showArrows infiniteLoop showStatus={false} showIndicators={false} showThumbs={false}>
      {listPost &&
            listPost.length > 0 &&
            listPost.map((post) => (
              <div>
                <img alt="" src={post.post} />
                <p className="legend">{post.legend}</p>
              </div>
            ))}
    </Carousel>
  );
}

export default Picture;
