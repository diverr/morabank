angular.module('morabanc')
.directive('myCalendar', calendarDirective);

function calendarDirective() {
    return {

        scope: {},
        controller: function(Meetings, Helper) {
            var vm = this;
            vm.events = [];
            
            Meetings.getAll(function(meetings) {
                for(var i = 0; i < meetings.length; i++) {
                    var meeting = meetings[i];
                    vm.events.push({
                        title: meeting.subject,
                        start: moment(Helper.transformDate(meeting.date)).toDate(),
                        url: '/#/meetings/edit/' + meeting.id
                    });
                }
            });

            /* config object */
            vm.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    header: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    lang: 'es'
                }
            };

            /* Event sources array */
            vm.eventSources = [vm.events];
        },
        controllerAs: 'vm',
        templateUrl: 'views/templates/calendar.html'

    };
}