angular.module('morabanc')
.directive('editMeetingForm', editMeetingForm);

function editMeetingForm() {
    return {

        scope: {},
        controller: function(Clients, Meetings, $stateParams, Helper) {
            var vm = this;
            var id = $stateParams.id;

            vm.form = {};
            vm.clients = [];
            
            // cogemos los datos de la cita
            Meetings.get(id, function(data) {
                vm.form = data;
                console.log(vm.form);
                
                $("#time").val(vm.form.time);
                vm._date = Helper.transformDate(vm.form.date);
                
            })

            vm.submitForm = function() {
                vm.form.date = $("#date").val();
                vm.form.time = $("#time").val();
                Meetings.update(vm.form, function(obj) {
                    alert("Cita actualizada!");
                });
                
            }

            Clients.getAll(function(data) {
                vm.clients = data;
            });
        },
        controllerAs: 'vm',
        templateUrl: 'views/templates/editMeetingForm.html'

    };
}