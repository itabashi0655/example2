var Modules;
(function (Modules) {
    (function (Todo) {
        angular.module('example2.todo', ['ui.calendar'], function ($routeProvider, $locationProvider) {
        }).controller('TodoController', Controller.Todo.TodoController).factory('todoService', function ($http) {
            return new Service.Todo.TodoService($http);
        }).run(function ($rootScope, $routeParams) {
        });
    })(Modules.Todo || (Modules.Todo = {}));
    var Todo = Modules.Todo;
})(Modules || (Modules = {}));
