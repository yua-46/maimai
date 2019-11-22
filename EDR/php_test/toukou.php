<?php
session_start();

require "twitteroauth-master/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

require "index.php";

#APIにアクセスするためのアクセストークンを用いて$connectionを作成
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET,$_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);


if(!empty($_POST)){
    if($_POST["title"] == ""){
        $error["title"]="blank";
    }
    if($_POST["time"] == ""){
        $error["time"]="blank";
    }
    if($_POST["page"] == ""){
        $error["page"]="blank";
    }
    if($_POST["page2"] == ""){
        $error["page"]="blank";
    }
    if($_POST["textarea"] == ""){
        $error["textarea"]="blank";
    }
    
    if(empty($error)){
        $_SESSION["join"]=$_POST;
        header('Location: mypage.php');
        exit();
    }
}


try {
    $db = new PDO('mysql:dbname=puramai_yuadata;host=mysql1.php.xdomain.ne.jp','puramai_yua','puramai278669630');
} catch (PDOException $e) {
    echo 'DB接続エラー' . $e->getMessage();
}


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
<div class="toukou_form">
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

      
        <form action="" method="post">
            <div class="form_container" style="height: 400px;">
                <table>
                    <tr>
                        <td class="form_title">
                            <label for="form_title">本の題名
                            </label>
                        </td>
                        <td class="form_contents">
                            <input type="text" name="title" id="form_booktitle" maxlength="50" style="height: 22px; width: 300px;"
                            value="<?php echo htmlspecialchars($_POST["title"],ENT_QUOTES); ?>">
                            <?php
                                if ($error['title'] == 'blank') {
                                    echo '<p class="error" style="color:red; font-size: 13px;  margin: -30px 0;">※本の題名を入力してください</p>';
                                }
                            ?>
                        </td>
                 
                    </tr>

                    <tr>
                        <td class="form_title">
                            <label for="form_time">時間
                            </label>
                        </td>
                        <td class="form_contents">
                            <input type="text" name="time" id="form_time" maxlength="3"
                            value="<?php echo htmlspecialchars($_POST["time"],ENT_QUOTES); ?>">
                            分
                            <?php
                                if ($error['time'] == 'blank') {
                                    echo '<p class="error" style="color:red; font-size: 13px;  margin: -30px 0;">※時間を入力してください</p>';
                                }
                            ?>
                        </td>
                 
                    </tr>
    
                    <tr>
                        <td class="form_title">
                            <label for="form_page">ページ</label>
                        </td>
                        <td class="form_contents">
                            <input type="text" name="page" class="form_page" maxlength="4" style="margin-bottom:30px;"  value="<?php echo htmlspecialchars($_POST["page"],ENT_QUOTES); ?>">～
                            <input type="text" name="page2" class="form_page" maxlength="4" value="<?php echo htmlspecialchars($_POST["page2"],ENT_QUOTES); ?>">
                            ページ
                            <?php
                                if ($error['page'] == 'blank') {
                                    echo '<p class="error" style="color:red; font-size: 13px;  margin: -45px 0 -15px;">※ページを入力してください</p>';
                                } 
                                if ($error['page2'] == 'blank') {
                                    echo '<p class="error" style="color:red; font-size: 13px;  margin: -45px 0 -15px;">※ページを入力してください</p>';
                                } 
                            ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="form_title">
                            <label for="form_textarea">コメント</label>
                        </td>
                        <td class="form_contents">
                            <textarea id="form_textarea" name="textarea" maxlength="255" style="width: 420px; height: 83px;"
                            value="<?php echo htmlspecialchars($_POST["textarea"],ENT_QUOTES); ?>"></textarea>
                        </td>
                    </tr>
                </table>
                <p id="submit">
                    <input type="submit" name="submit" value="投稿">
                </p>
            </div><!-- form_container -->
        </form>
        
    







        
    </div>
</body>
</div><!-- toukou_form -->

</html>
