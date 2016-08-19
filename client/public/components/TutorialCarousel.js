const React = require('react');
const Slider = require('react-slick');

const TutorialCarousel = React.createClass({
  render: function () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      focusOnSelect: true
    };
    return (
      <Slider {...settings}>
        <div><a href="../media/tutorial/Tutorial1.png"><img className="tutorialImgs" src='../media/tutorial/Tutorial1.png'></img></a></div>
        <div><a href="../media/tutorial/Tutorial2.png"><img className="tutorialImgs" src='../media/tutorial/Tutorial2.png'></img></a></div>
        <div><a href="../media/tutorial/Tutorial3.png"><img className="tutorialImgs" src='../media/tutorial/Tutorial3.png'></img></a></div>
        <div><a href="../media/tutorial/Tutorial4.png"><img className="tutorialImgs" src='../media/tutorial/Tutorial4.png'></img></a></div>
        <div><a href="../media/tutorial/Tutorial5.png"><img className="tutorialImgs" src='../media/tutorial/Tutorial5.png'></img></a></div>
      </Slider>
    );
  }
});

export default TutorialCarousel;