function CalendarCtrl($scope, Meetings, Clients, Helper, $location) {
    var vm = this;

    vm.form = {};
    vm.clients = [];

    vm.submitForm = function() {
        alert("Cita añadida");
        return;
    }

    Clients.getAll(function(data) {
        vm.clients = data;
        console.log(data);
    });


    vm.events = [];

    Meetings.getAll(function(meetings) {
        for(var i = 0; i < meetings.length; i++) {
            var meeting = meetings[i];

            var className = '';
            if(meeting.busy) {
              className = 'fc-busy';
            }

            vm.events.push({
                title: meeting.subject,
                start: moment(Helper.transformDate(meeting.date)).toDate(),
                url: '',
                className: className
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
}

function MeetingsCtrl($scope, $timeout, Meetings, Clients, Helper) {
    var vm = this;
    vm.meetings = [];
    vm.clients = [];

    vm.search = {};
    vm.search.client = null;
    vm.search.results = [];
    vm.isSearch = false;

    Meetings.getAll(function(data) {
        vm.meetings = data;

        $timeout(function(){
            $('.table').trigger('footable_redraw');
        }, 100);
    });

    Clients.getAll(function(data) {
        vm.clients = data;
    });

    vm.doSearch = function() {
        vm.search.results = [];
        vm.isSearch = true;

        Meetings.search(vm.search, function(meetings) {
            vm.search.results = meetings;

            $timeout(function(){
                $('.table').trigger('footable_redraw');
            }, 100);
        });
    }

    vm.cancelSearh = function() {
        vm.isSearch = false;
    }



    vm.form = {};
    vm.clients = [];

    vm.submitForm = function() {
        alert("Cita añadida");
        return;
    }

    Clients.getAll(function(data) {
        vm.clients = data;
    });

    vm.formEdit = {};
    // cogemos los datos de la cita 101
    var id = 101;
    Meetings.get(id, function(data) {
        vm.formEdit = data;
        $("#time").val(vm.formEdit.time);
        vm._date = Helper.transformDate(vm.formEdit.date);
    })
}

function ChatsArchiveCtrl(Chats) {
    var vm = this;
    vm.form = {};
    var id = 100;

    // cogemos los datos del chat
    Chats.get(id, function(data) {
        vm.form = data;
        console.log(data);
    })
}

function ChatsCtrl($scope, $timeout, Chats) {
    var vm = this;
    vm.chats = [];
    vm.myMessage = '';

    Chats.getAll(function(data) {
        vm.chats = data;

        $timeout(function(){
            $('.table').trigger('footable_redraw');
        }, 100);
    });
}

function ChatViewCtrl(Chats, Managers) {
    // cogemos los mensajes del chat con id 100
    var id = 100;
    var vm = this;
    vm.chat = {};
    Chats.get(id, function(chat) {
        vm.chat = chat;
    });

    vm.keypress = function(event) {
        if(event.keyCode == 13) {
            Chats.addMessage(vm.myMessage, vm.chat);
            vm.myMessage = '';
        }
    };




    vm.managers = [];

    Managers.getAll(function(data) {
        vm.managers = data;
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
}

angular
    .module('morabanc')
    .controller('CalendarCtrl', CalendarCtrl)
    .controller('MeetingsCtrl', MeetingsCtrl)
    .controller('ChatsCtrl', ChatsCtrl)
    .controller('ChatViewCtrl', ChatViewCtrl)
    .controller('ChatsArchiveCtrl', ChatsArchiveCtrl);
