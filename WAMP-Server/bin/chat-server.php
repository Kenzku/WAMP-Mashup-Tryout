<?php
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use ServerScript\Chat;

    require dirname(__DIR__) . '/vendor/autoload.php';

    $server = IoServer::factory(
    	new WsServer(
    		new Chat()
    	)
      , 8080
    );

    $server->run();