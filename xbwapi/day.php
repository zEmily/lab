<html>
  <head>
   <title>test</title>
   <style>
   li{color:red;}
   </style>
  </head>
  <body>
<?php
//$username = $_GET["user"];
$url_day = "http://bbs.lzu.edu.cn/nForum/api/widget/day.json";
$ch = curl_init($url_day);
$timeout = 60;
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_USERPWD, "guest:");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$info = curl_exec($ch);
curl_close($ch);

$xbw = json_decode($info, true);
echo "<br>测试<br>";
echo "<br><b>十大内容</b><br>";
echo $xbw['name'];
echo "标题0: " . iconv('UTF-8', 'GB2312', $xbw['article'][0]['title']) . "xx";
echo "<ul>";
for ($i = 0; $i < sizeof($xbw['article']); $i++) {
//echo urlencode(iconv('UTF-8', 'GB2312', '百度'));
    echo "<li><a href='http://bbs.lzu.edu.cn/nForum/#!article/'.$xbw['article'][$i]['board_name'].'/'.$xbw['article][$i]['id']>' . iconv('UTF-8', 'GB2312',$xbw['article'][$i]['title'].$xbw['article'][$i]['user']['id']) . '</a></li>'";
}
echo "</ul>";

?>
  </body>
</html>
