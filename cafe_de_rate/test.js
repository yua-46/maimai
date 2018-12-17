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


    $('.header_btn a').hover(
      function(){
      $(this).animate({
        'color': 'red'
      },300);
    },
      function(){
      $(this).animate({
        'color': 'black'
      },300);
    });

    
    $('.header_btn2 a').hover(
      function(){
      $(this).animate({
        'color': 'red'
      },300);
    },
      function(){
      $(this).animate({
        'color': 'white'
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

$(function () {

  // falg変数のデフォルト値として「up」を指定    
  var flag = "up";

  // scrollイベントを取得した際の処理を定義
  $(window).on("scroll", function () {
    // scrollTop()が「0」より大きい場合
    if ($(this).scrollTop() > 200) {
　　　　// flag変数が「up」だった場合の処理
      if (flag === "up") {
        // ヘッダーバーに対して、stop()メソッドを実行してから、
        // animate()メソッドを実行
        $(".cb-header").stop().animate({
          // topの位置を「-56px」から「0」になるまでアニメーション
          top: 0
        // アニメーション時間を「500ms」に設定
        }, 500)
        // flag変数の値を「down」に変更
        flag = "down";
      }
    // scrollTop()が「0」の場合
    } else {
      // flag変数が「down」だった場合の処理
      if (flag === "down") {
        // ヘッダーバーに対して、stop()メソッドを実行してから、
        // animate()メソッドを実行
        $(".cb-header").stop().animate({
          // topの位置を「0」から「-56px」になるまでアニメーション
          top: "-200px"
        // アニメーション時間を「500ms」に設定
        }, 500);
        // flag変数の値を「up」に変更
        flag = "up";
      }

    }

  });

});