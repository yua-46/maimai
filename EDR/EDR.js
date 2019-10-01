$(function () {

 
  
  // ◇ボタンをクリックしたら、スクロールして上に戻る
  $('.edr').click(function(){
    $('body,html').animate({
    scrollTop: 0},500);
    return false;
  
  });
  
  
  });