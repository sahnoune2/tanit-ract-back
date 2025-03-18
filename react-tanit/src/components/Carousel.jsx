import React from "react";
import { Carousel } from "react-responsive-carousel";

export const Carousele = () => {
  return (
    <div>
      <Carousel autoPlay interval={1000} showThumbs={false}>
        <div>
          <img src="https://i.rtings.com/assets/pages/IxCXzynA/best-apple-laptops-20241009-medium.jpg?format=auto" />
          <p className="legend"> Laptops</p>
        </div>
        <div>
          <img src="https://cdn.thewirecutter.com/wp-content/media/2025/02/BEST-ANDROID-PHONES-2048px-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp" />
          <p className="legend">Phones</p>
        </div>
        <div>
          <img src="https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_3000,f_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/b41a7fde-dcc1-11ec-9f1b-2e0c91dc8f24.jpg" />
          <p className="legend">Tv</p>
        </div>
      </Carousel>
    </div>
  );
};
