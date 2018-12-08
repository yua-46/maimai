var $section = $('.js-section'); // 各スライド
var $pager = $('#js-pager'); // ページャー枠

// scrollifyのオプション設定
var option = {
  section : '.js-section',
  easing: "swing",
  scrollSpeed: 600,
  scrollbars: true,
  before:function(index) {
    pagerCurrent(index); // ページャーに対応する順番にクラス名を付与
  },
  afterRender:function() {
    createPager(); // ページャーの作成
  }
};