$(function() {
   $('.toTop').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

    $('.social-icon').hover(
      function(){
      $(this).animate({
        'font-size': '22px'
      },300);
    },
      function(){
      $(this).animate({
        'font-size': '17px'
      },300);
    });


    $('.slider').slick({
      infinite: true,
      dots:true,
      slidesToShow: 1,
      centerMode: true, //要素を中央寄せ
      centerPadding:'100px', //両サイドの見えている部分のサイズ
      autoplay:true, //自動再生
      responsive: [{
           breakpoint: 480,
                settings: {
                     centerMode: false,
           }
      }]
 });
});

