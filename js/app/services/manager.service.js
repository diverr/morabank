angular.module('morabanc')
.service('Managers', serviceManagers);

function serviceManagers($http, Data) {
    
    return {
        getAll: function(callback) {
            Data.getAll('managers',function(data) {
                callback(data);
            });
        },

        get: function(id, callback) {
            Data.get(id, 'managers', function(manager) {
                callback(manager);
                return;
            });
        }
    };
}