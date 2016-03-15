angular.module('morabanc')
.directive('newMeetingForm', newMeetingForm);

function newMeetingForm() {
    return {

        scope: {},
        controller: function($location, Clients, Meetings) {
            var vm = this;

            vm.form = {};
            vm.clients = [];
            
            vm.submitForm = function() {
                vm.form.date = $("#date").val();
                vm.form.time = $("#time").val();
                Meetings.add(vm.form, function(obj) {
                    alert("Cita añadida");
                    $location.path('/meetings/index');
                });
                
            }

            Clients.getAll(function(data) {
                vm.clients = data;
            });
        },
        controllerAs: 'vm',
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl || 'views/templates/newMeetingForm.html'
        }

    };
}