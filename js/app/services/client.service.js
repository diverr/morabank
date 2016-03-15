angular.module('morabanc')
.service('Clients', serviceClients);

function serviceClients($http, Data) {
    
    return {
        
        getAll: function(callback) {
            Data.getAll('clients', function(data) {
                callback(data);
            });
        },

        get: function(id, callback) {
            Data.get(id, 'clients', function(client) {
                callback(client);
                return;
            });
        },

        prueba: function() {
            return "hola";
        },

        prueba2: function(callback) {
            /*$http.get('http://jsonplaceholder.typicode.com/posts/1').then(function (data) {
               console.log(data);
               callback(data.data); 
            });*/

            $.get('http://jsonplaceholder.typicode.com/posts/1', function(data) {
                callback(data);
            });
        }
    };
}