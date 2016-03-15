angular.module('morabanc')
.directive('managersList', managersList);

function managersList() {
    return {

        scope: {},
        controller: function(Managers) {
            var vm = this;
            vm.items = [];

            Managers.getAll(function(data) {
                vm.items = data;
            });


            vm.icono = function(index) {
                if(index % 3 == 0) {
                    return 'fa fa-check azul1';
                }
                if(index % 2 == 0) {
                    return 'fa fa-clock-o naranja';
                } else {
                    return 'fa fa-times rojo';
                }
            }

        },
        controllerAs: 'vm',
        templateUrl: 'views/templates/managersList.html'

    };
}