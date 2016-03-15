angular.module('morabanc')
.directive('messagesList', messagesList);

function messagesList() {
    return {

        scope: {},
        controller: function(Chats, $stateParams, $timeout) {
            var id = $stateParams.id;
            var vm = this;
            vm.chat = {};

            Chats.get(id, function(chat) {
                vm.chat = chat;
            });
        },
        controllerAs: 'vm',
        templateUrl: 'views/templates/messagesList.html'

    };
}