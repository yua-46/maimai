<?php
session_start();

require "twitteroauth-master/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

require "index.php";

#APIにアクセスするためのアクセストークンを用いて$connectionを作成
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET,$_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

$user = $connection->get("account/verify_credentials");







?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>毎日 Reading</title>
<link rel="stylesheet" href="EDR.css">
<LINK rel="SHORTCUT ICON" href="images/book.jpg">
<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

</head>

<body>
    <div id="wrapper">
        <header>
            <nav>
                <ul>
                    <li class="header-logo">
                        <a href="home.php">毎日Reading</a>
                    </li>
                    <li class="header_middle">
                        <a href="toukou.php">
                            <img src="images/whitebook.jpg">
                        </a>
                    </li>
                    <li class="logout">
                        <a href="logout.php">ログアウト</a>
                    </li>
                    <li class="toukou">
                        <a href="mypage.php">投稿一覧</a>
                    </li>
                </ul>
            </nav>

        </header>
        
     <div id="middle">
        <div id="left">
            <ul>
                <li>
                <?php

                    echo "@" . $user -> screen_name;
                ?>
                </li>
                <li>累計時間</li>
                <li>投稿数</li>
                <li>ログアウト</li>
            </ul>
        </div><!-- left -->
        <div id="right">
         <?php 


try {
    $db = new PDO('mysql:dbname=puramai_yuadata;host=mysql1.php.xdomain.ne.jp','puramai_yua','puramai278669630');
} catch (PDOException $e) {
    echo 'DB接続エラー' . $e->getMessage();
}


    if(isset($_POST["title"])){
        try{
            $datetime=date("Y-m-d H:i:s");
            //sql文
            $sql='INSERT INTO items ("title","time","page","page2","textarea","date")VALUES(?,?,?,?,?,?)';
            $stmt=$db->prepare($sql);
            $stmt->bindParam(1, $title, PDO::PARAM_STR);
            $stmt->execute();
        }catch (PDOException $e){
            echo "接続出来ませんでした。理由：" . $e->getMessage();
        }

    }
        ?>
            
            
        </div><!-- right -->
    </div>


        <footer>
            <nav>
                <ul>
                    <li class="edr">
                        <a href="home.php">毎日Readingとは</a>
                    </li>
                    <li class="service">
                        <a href="service.html">利用規約</a>
                    </li>
                    <li class="privacy">
                        <a href="privacy.html">プライバシーポリシー</a>
                    </li>
                    <li class="inquiry">
                        <a href="inquiry.html">お問い合わせ</a>
                    </li>
                </ul>
            </nav>
            <P id="copy">©2019 Mainiti Reading.</P>
        </footer>


    </div>

</body>


</html>