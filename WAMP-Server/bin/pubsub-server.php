<?php
use Ratchet\Wamp\WampServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Website\ChatRoom;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new WsServer(
        new WampServer(
            new ChatRoom()
        )
    )
    ,8080
);
$server->run();