angular.module('morabanc')
.service('Chats', serviceChats);

function serviceChats($http, $q, Data, Clients, Managers) {
    
    return {
        getAll: function(callback) {
            var result = [];

            Data.getAll('chats', function(data) {
                var chats = data;
                var requests = [];

                // recorremos los chats para asociar el cliente
                angular.forEach(chats, function(chat) {
                    var deferred = $q.defer();
                    requests.push(deferred.promise);

                    // le asociamos el cliente
                    Clients.get(chat.client_id, function(client) {
                        chat.client = client;

                        // le asociamos el manager
                        Managers.get(chat.manager_id, function(manager) {
                            chat.manager = manager;
                            result.push(chat);
                            deferred.resolve();
                        });
                    });
                });

                // cuando hay terminado todas las llamadas asíncronas ejecutamos el callback
                $q.all(requests).then(function() {
                    callback(result);    
                });
            });
        },

        getMessages: function(id, callback) {
            var result = [];

            Data.getAll('messages', function(data) {
                angular.forEach(data, function(item) {
                    if(item.chat_id == id) {
                        result.push(item);
                    }
                })

                callback(result);
            });
        },

        get: function(id, callback) {
            var parent = this;

            var result = null;

            Data.get(id, 'chats', function(chat) {
                
                // cogemos los chats asociados
                parent.getMessages(chat.id, function(messages) {
                    chat.messages = messages;

                    // le asociamos el cliente
                    Clients.get(chat.client_id, function(client) {
                        chat.client = client;

                        // le asociamos el manager
                        Managers.get(chat.manager_id, function(manager) {
                            chat.manager = manager;

                            callback(chat);
                            return;
                        })
                    })
                });
            });
        },

        addMessage: function(myMessage, chat) {
            console.log(myMessage);
            console.log(chat);
            return 1;
        }
    };
}