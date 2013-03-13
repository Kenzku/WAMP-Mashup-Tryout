/**
 * User: Ken
 * Date: 25/02/2013
 * Time: 13:39
 */
//Create a chat module to use.
(function () {
    window.Chat = {
        socket : null,

        // is there any special meaning in "initialise" method
        initialize: function(socketURL) {
            this.socket = io.connect(socketURL);

            //send message on button click or enter
            $('#send').click(function(){
                Chat.send();
            });

            $('#message').keyup(function(evt){
                if ((evt.keyCode || evt.which) == 13){
                    Chat.send();
                    return false;
                }
            });

            //Process any income messages
            this.socket.on('new',this.add);
        },

        add: function(data) {
            var name = data.name || 'anonymous';
            var msg = $ ('<div class="msg"></div>')
                .append('<span class="name">' + name + '</span>:')
                .append('<span class="text">' + data.msg + '</span>');
            $('#messages')
                .append(msg)
                .animate({scrollTop:$('#messages').prop('scrollHeight')},0);
        },

        send: function(){
            this.socket.emit('msg',{
                name:$('#name').val(),
                msg:$('#message').val()
            });

            $('#message').val('');
        }
    };
}());