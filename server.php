<?php
// Все что приходит от клиента мы будем дэкадировать из json
;$_POST = json_decode(file_get_contents("php://input"), true);
//команда которая позволит нам увидеть те данные которые приходят с клиенте
echo var_dump($_POST);