<?php include "../inc/dbinfo.inc"; ?>
<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();
  $database = mysqli_select_db($connection, DB_DATABASE);
?>
<div style="overflow-y:auto;width:66%;height:361px">
<table border='1' style='cursor: pointer;width:100%'>
<?php
$lat = $_GET['lat'];$lng = $_GET['lng'];$taxonomy = $_GET['tax'];$radius = $_GET['radius'];
$distance = "SELECT ROUND(( 3959 * acos( cos( radians(".$lat.") ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(".$lng.") ) + sin( radians(".$lat.") ) * sin( radians( lat ) ) ) ),1) AS distance, Name, Address,NPI,Phone FROM Organi WHERE `tax1`= '".$taxonomy."' OR `tax2`= '".$taxonomy."' OR `tax3`= '".$taxonomy."' OR `tax4`= '".$taxonomy."' OR `tax5`= '".$taxonomy."' OR `tax6`= '".$taxonomy."' OR `tax7`= '".$taxonomy."' OR `tax8`= '".$taxonomy."' OR `tax9`= '".$taxonomy."' OR `tax10`= '".$taxonomy."' OR `tax11`= '".$taxonomy."' OR `tax12`= '".$taxonomy."' OR `tax13`= '".$taxonomy."' OR `tax14`= '".$taxonomy."' OR `tax15`= '".$taxonomy."' HAVING distance < ".$radius." ORDER BY distance";
$joan = "SELECT * FROM Orga";
$Organization = mysqli_query($connection, $joan);
$Physicians = mysqli_query($connection, "SELECT * FROM Physicians");
$distHosp = mysqli_query($connection,$distance);
if(!$distHosp){
	echo"not good";
}
$org_len = mysqli_num_rows($Organization); $phy_len= mysqli_num_rows($Physicians);
while($query_data = mysqli_fetch_row($distHosp)){
	$rightPhy = mysqli_query($connection,"SELECT Name From boss.Physicians WHERE `Org NPI` = '".$query_data[2]."' AND`taxonomy` = '".$taxonomy."'");
	echo "<tr>";
	echo "<th>",$query_data[1],"&nbsp","&nbsp","&nbsp",$query_data[2],"&nbsp","&nbsp","Tel:",$query_data[4],"&nbsp","&nbsp","&nbsp","&nbsp",$query_data[0],"miles","</th>";
	echo "</tr>";
	if(mysqli_num_rows($rightPhy) > 0 ){
		while($row = mysqli_fetch_assoc($rightPhy)){
				echo "<tr>";
				echo "<td>",$row["Name"],"</td>";
				echo "</tr>";		
		}
	}
	else{
		echo "<tr>";
		echo "<td> Call this number to ask about physicians.","&nbsp","Telephone:","&nbsp",$query_data[4],"</td>";
		echo "</tr>";
	}
}
?>
</table>
</div>