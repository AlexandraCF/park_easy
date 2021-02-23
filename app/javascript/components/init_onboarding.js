import Slick from 'slick-carousel';

const initOnboardingCaroussel = () => {
  $('.onboarding-caroussel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });
};

export { initOnboardingCaroussel };
