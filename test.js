$(function() {
  // スライドインする時間差
  var delayBetweenSlideIn = 1500; // milliseconds
  // アニメーションの時間
  var durationOfAnimation =  800; // milliseconds
  // スライドインする画像のオブジェクト全て(左から)
  var allImgs = [ $('#img1'), $('#img2'), $('#img3') ];
  // 画像のもとのサイズ(幅、高さ、縦横比)全て(左から)
  var allImgSizes = [];
  // 画像にのせるテキストのdivコンテナ全て(左から)
  var allTexts = [ $('#text1'), $('#text2'), $('#text3') ];
  // 画像にのせるテキストのサイズ(幅、高さ)全て(左から)
  var allTextSizes = [];
  // 画像のもとの高さの最大値
  var maxHeightOfImg = 0;
  // 画像を隠すカーテンのオブジェクト全て(左から)
  var allCurtains = [ $('#curtain1'), $('#curtain2'), $('#curtain3') ];
  // ブラウザの画面幅がこの値より狭くなると2段モード
  var discontinuousWidth = 1000; // px
  // 2段にするか否か
  var modeIn2Rows;
  // 画像の実際の幅
  var widthOfImg;
  // 大きい方の画像の実際の幅
  var widthOfLargerImg;
  // 大きい方の画像の実際の高さ
  var heightOfLargerImg;
  // アニメーションが開始されたか否か
  var startedAnimation = false;
  // 画像とメニューの隙間
  var gapBetweenImgAndMenu = 10; // px
  // 1メニュー項目の幅
  var widthOfMenuItem;
  // メニューのボーダー
  var borderOfMenu = 1; // px


  // Safariの場合、ここでは早すぎて、画像のサイズを取得できない
  initializeAndStartAnimation();

  // 画像の読み込みが完了後に動作。
  $(window).on('load', function() {
      // IEの場合、ここでは、アニメーションが正しく動作しない
      initializeAndStartAnimation();
  });


  function placeObjects(posX, posXOfLargerImg, withCurtains) {
      var maxHeightOfImg = 0;

      for (var index = 0; index < allImgs.length; index++) {
          if (! modeIn2Rows || index !== 0) {
              // 1段モード または 2段モード2番目以降の画像(下段)
              // 1段モードのとき、縦位置は 0 に戻す
              var posY = (modeIn2Rows ? heightOfLargerImg : 0);
              var heightOfImg = allImgSizes[index].ratio * widthOfImg;

              maxHeightOfImg = Math.max(maxHeightOfImg, heightOfImg);

              moveTo(allImgs[index].parent(), posX, posY);

              resizeTo(allImgs[index], widthOfImg, heightOfImg);

              // コンテナからの相対座標
              moveTo(allTexts[index],
                      (widthOfImg  - allTextSizes[index].width)  / 2,
                      (heightOfImg - allTextSizes[index].height) / 2);

              posX += widthOfImg;

              if (withCurtains) {
                  moveTo(allCurtains[index], posX, posY);
                  resizeTo(allCurtains[index], widthOfImg, maxHeightOfImg);
              }
          }
          else {
              // 2段モード かつ 最初の画像(上段)
              moveTo(allImgs[index].parent(), posXOfLargerImg);

              // 幅を画面いっぱいにする(縦横比はそのまま)
              resizeTo(allImgs[index], widthOfLargerImg, heightOfLargerImg);

              // コンテナからの相対座標
              moveTo(allTexts[index],
                      (widthOfLargerImg  - allTextSizes[index].width)  / 2,
                      (heightOfLargerImg - allTextSizes[index].height) / 2);
              // posX += 0;
              // カーテンなし
          }
      }

      moveTo($('#menu'), undefined,
              (modeIn2Rows ? heightOfLargerImg : 0) + maxHeightOfImg + gapBetweenImgAndMenu);
      resizeTo($('.menuItem'), widthOfMenuItem)
  }


  function initializeAndStartAnimation() {
      if (startedAnimation || ! calculateSizes()) {
          return;
      }
      // アニメーションが開始されていず、サイズを計算できたときに続行

      // ブラウザの画面幅があらかじめわからないので、CSSではなく、
      // JavaScriptで、画像、カーテン、テキスト、メニューの初期位置・サイズを設定する。
      // 最左の画像の位置は、ブラウザの画面より画像幅1つ分左
      placeObjects(0 - widthOfImg, 0 - widthOfLargerImg, true);

      // 画像およびカーテンのアニメーション設定
      (function(posX) {
          for (var index = 0; index < allImgs.length; index++) {
              if (! modeIn2Rows) {
                  // 1段モード
                  slideImgIn(allImgs[index].parent(), posX);

                  posX += widthOfImg;

                  openCurtain(allCurtains[index], posX);
              }
              else {
                  // 2段モード
                  if (index === 0) {
                      // 最初の画像
                      // 上段
                      slideImgIn(allImgs[index].parent(), posX);
                      // posX += 0;
                      // カーテンなし
                  }
                  else {
                      // 2番目以降の画像
                      // 下段
                      // setTimeoutのコールバック関数に変化する値を
                      // 正しくわたすため、forループの実行毎に異なるスコープを作る
                      (function(thisImg, thisCurtain, thisPosX) {
                          setTimeout(function() {
                              // 指定ミリ秒遅れて動作
                              slideImgIn(thisImg.parent(), thisPosX);

                              thisPosX += widthOfImg;

                              openCurtain(thisCurtain, thisPosX);
                          },
                          delayBetweenSlideIn);
                      })
                      (allImgs[index], allCurtains[index], posX);

                      posX += widthOfImg;
                  }
              }
          }
      })(0); // 最左の画像の位置は、ブラウザの画面と同じ

      startedAnimation = true;
  }


  /** ブラウザの画面幅に応じてサイズを(再)計算する
   * @return true:正しく計算できた／false:正しく計算できなかった
   */
  function calculateSizes() {
      var calculated = true;

      // 画像のもとのサイズを取得
      if (allImgSizes.length < allImgs.length) {
          // まだ取得できていないときのみ、取得する
          $.each(allImgs, function(index, currentImg) {
              var width  = currentImg.width();
              var height = currentImg.height();

              if (width == 0 || height == 0) {
                  // Safariで画像がまだロードされていない場合
                  calculated = false;
                  return;
              }

              var ratio = height / width; // 画像の縦横比
              allImgSizes[index] = { 'width' : width, 'height' : height, 'ratio' : ratio };
          });

          if (! calculated) {
              return false;
          }
      }

      // テキストのサイズを取得
      if (allTextSizes.length < allTexts.length) {
          // まだ取得できていないときのみ、取得する
          $.each(allTexts, function(index, currentText) {
              var width  = currentText.width();
              var height = currentText.height();
              allTextSizes[index] = { 'width' : width, 'height' : height };
          });
      }

      var widthOfWindow = $(window).width();
      modeIn2Rows = (widthOfWindow < discontinuousWidth);
      widthOfImg = widthOfWindow / (modeIn2Rows ? allImgs.length - 1 : allImgs.length);
      widthOfLargerImg = widthOfWindow;
      heightOfLargerImg = allImgSizes[0].ratio * widthOfLargerImg;
      var marginOfMenu = ($('#menu').css('margin-left').replace(/px$/, '')  - 0) +
                         ($('#menu').css('margin-right').replace(/px$/, '') - 0);
      widthOfMenuItem = - 4 +
              (widthOfWindow - borderOfMenu * (allImgs.length + 1) + marginOfMenu) / allImgs.length;

      return true;
  }


  // 画像、カーテン、テキスト、メニューの位置を変更する
  // 画像の場合はそのコンテナ
  function moveTo(obj, targetPosX, targetPosY) {
      if (typeof targetPosX !== 'undefined') {
          // targetPosX が指定されているときのみ変更する
          obj.css('left', targetPosX);
      }

      if (typeof targetPosY !== 'undefined') {
          // targetPosY が指定されているときのみ変更する
          obj.css('top', targetPosY);
      }
  }

  // 画像、カーテン、メニュー項目のサイズを変更する
  function resizeTo(obj, targetWidth, targetHeight) {
      if (typeof targetWidth !== 'undefined') {
          // targetWidth が指定されているときのみ変更する
          obj.css('width', targetWidth)
      }

      if (typeof targetHeight !== 'undefined') {
          // targetHeight が指定されているときのみ変更する
          obj.css('height', targetHeight);
      }
  }

  // 画像をのせたコンテナをアニメーションでスライドインする
  function slideImgIn(imgWrapper, targetPosX) {
      imgWrapper.animate({
          'left' : targetPosX
      }, durationOfAnimation);
  }

  // カーテンをアニメーションで開ける
  function openCurtain(curtain, targetPosX) {
      curtain.animate({
          'left' : targetPosX,
          'width' : 0
          // 最終的に幅が 0 になる。
      }, durationOfAnimation);
  }


  // ブラウザの画面幅が変わったときに動作する。
  $(window).on('resize', function() {
      calculateSizes();

      // ブラウザの画面幅に合わせて、画像の位置・サイズを再設定する。
      // カーテンはない
      // 最左の画像の位置は、ブラウザの画面と同じ
      placeObjects(0, 0, false);
  });
});