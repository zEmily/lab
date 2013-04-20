<?php
$username = $_GET["user"];
$url = "http://bbs.lzu.edu.cn/nForum/api/user/query/$username.json";
$ch = curl_init($url);
$timeout = 60;
//curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_USERPWD, "guest:");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$info = curl_exec($ch);
curl_close($ch);

$info = json_decode($info, true);

echo "<br><b>用户 $username  信息: </b><br>";
?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<div id='userinfo'>
  <div>id: <?php echo $info['id']; ?></div>
  <div>昵称: <?php echo $info['user_name']; ?> </div>
  <div>生命值: <?php echo $info['life']; ?> </div>
  <div>经验值: <?php echo $info['exp'] . "(" . $info['cexp'] . ")"; ?> </div>
  <div>表现值: <?php echo $info['perf'] . "(" . $info['cperf'] . ")"; ?> </div>
  <img src="<?php echo $info['face_url'] ?>" width=100></img>
</div>


