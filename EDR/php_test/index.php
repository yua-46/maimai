<?php 
session_start();

header("Content-type: text/html; charset=utf-8");

if(!isset($_SESSION['access_token'])){
	echo "<a href='login.php'>Twitterでログイン</a>";
}else{
	header('Location: https://yua-46.github.io/maimai/EDR/mypage.html');
	exit();
}