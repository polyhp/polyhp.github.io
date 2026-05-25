<?php
   $user = "root";
   $mdp = "";
   $db = "projet";
   $server = "polyhpservices.wuaze.com";
   $link = mysqli_connect($server, $user, $mdp, $db);
   if($link){
    //echo "Connection etablie ";
   }else{
    die(mysqli_connect_error());
   }
   

?>