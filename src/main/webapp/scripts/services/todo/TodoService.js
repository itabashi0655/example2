var Service;
(function (Service) {
    (function (Todo) {
        var TodoService = (function () {
            function TodoService($http) {
                this.$http = $http;
            }
            TodoService.prototype.post = function (todo) {
                return this.$http({
                    method: 'POST',
                    url: 'api/todo/post',
                    data: $.param({ content: todo.content }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cache: false
                });
            };

            TodoService.prototype.delete = function (id) {
                return this.$http({
                    method: 'POST',
                    url: 'api/todo/delete',
                    data: $.param({ id: id }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cache: false
                });
            };

            TodoService.prototype.getList = function () {
                var promise = this.$http({
                    method: 'GET',
                    url: 'api/todo/list',
                    cache: false
                });

                var wrappedPromise = {
                    success: function (callback) {
                        promise.success(function (data, status, headers, config) {
                            var readTodos = [];
                            data.forEach(function (todo) {
                                readTodos.push(new Model.Todo(todo));
                            });

                            callback(readTodos, status, headers, config);
                        });
                        return wrappedPromise;
                    },
                    error: promise.error,
                    then: promise.then
                };
                return wrappedPromise;
            };
            return TodoService;
        })();
        Todo.TodoService = TodoService;
    })(Service.Todo || (Service.Todo = {}));
    var Todo = Service.Todo;
})(Service || (Service = {}));
