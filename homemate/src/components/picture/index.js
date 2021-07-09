import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import img from '../../img/no_image.jpg';

function Picture({ listPost }) {
  const post1 = listPost[0].id === 1 ? listPost[0].post : img;
  const post2 = listPost[1].id === 2 ? listPost[1].post : img;
  const post3 = listPost[2] ? listPost[2].post : img;
  const post4 = listPost[3] ? listPost[3].post : img;
  const post5 = listPost[4] ? listPost[4].post : img;

  const legend1 = listPost[0].id === 1 ? listPost[0].legend : ' ';
  const legend2 = listPost[1].id === 2 ? listPost[1].legend : ' ';

  return (
    <Carousel autoplay>
      <div>
        <img alt="" src={post1} />
        <p className="legend">{legend1}</p>
      </div>
      <div>
        <img alt="" src={post2} />
        <p className="legend">{legend2}</p>
      </div>
      <div>
        <img alt="" src={post3} />
        <p className="legend">legend3</p>
      </div>
      <div>
        <img alt="" src={post4} />
        <p className="legend">legend4</p>
      </div>
      <div>
        <img alt="" src={post5} />
        <p className="legend">legend5</p>
      </div>
    </Carousel>
  );
}

export default Picture;
