<?php
session_start();

//ライブラリを読み込む
require "twitteroauth-master/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

//認証時に必要な設定の読み込み(initialize.php参照)
require "index.php";

   
//initialize.phpで入力した値を用いてTwitterに接続
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
   
//認証URLを取得するためのリクエストトークンの生成
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

//認証後にアクセストークンを取得するために、セッション関数にトークンを保存することでコールバック後にアクセス出来るようにする
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

// Twitterの認証画面へリダイレクト
$url = $connection->url("oauth/authorize", array("oauth_token" => $request_token['oauth_token']));
header('Location: ' . $url);