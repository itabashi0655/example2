var Controller;
(function (Controller) {
    (function (Todo) {
        var TodoController = (function () {
            function TodoController($scope, $window, todoService) {
                var _this = this;
                this.$scope = $scope;
                this.$window = $window;
                this.todoService = todoService;
                this._isAdding = false;
                this._isRemoving = false;
                this._isRefreshing = false;
                this._isProcessing = false;
                this.newTodo = new Model.Todo();

                this.todos = new Array();
                this.eventSources = [];
                this.errorInfo = { code: 0, message: '' };

                this.$scope.newTodo = this.newTodo;
                this.$scope.todos = this.todos;
                this.$scope.onAdd = function () {
                    _this.onAdd();
                };
                this.$scope.onRemove = function ($index) {
                    _this.onRemove($index);
                };
                this.$scope.onClickEvent = function () {
                    _this.onClickEvent();
                };
                this.$scope.eventSources = [];
                this.$scope.errorInfo = this.errorInfo;

                this.$scope.calendarConfig = {
                    height: 450,
                    editable: true,
                    dayClick: function () {
                        _this.$scope.onClickEvent();
                    },
                    events: [
                        {
                            id: '200',
                            title: 'SBCまつり',
                            start: '2013-06-26 7:30:00',
                            end: '2013-06-26 21:00:00',
                            allDay: true
                        },
                        {
                            id: '201',
                            title: 'SBCまつり',
                            start: '2013-06-27 7:30:00',
                            end: '2013-06-27 21:00:00',
                            allDay: true
                        }
                    ]
                };
                this.refresh();
            }
            Object.defineProperty(TodoController.prototype, "isProcessing", {
                get: function () {
                    return this._isAdding || this._isRemoving || this._isRefreshing;
                },
                enumerable: true,
                configurable: true
            });

            TodoController.prototype.clearErrorInfo = function () {
                this.setErrorInfo();
            };

            TodoController.prototype.setErrorInfo = function (code, message) {
                if (typeof code === "undefined") { code = 0; }
                if (typeof message === "undefined") { message = ''; }
                this.errorInfo = {
                    code: code,
                    message: message
                };
                this.$scope.errorInfo = this.errorInfo;
            };

            TodoController.prototype.refresh = function () {
                var _this = this;
                this._isRefreshing = true;

                this.todoService.getList().success(function (data, status) {
                    _this.todos.length = 0;
                    data.forEach(function (todo) {
                        _this.todos.push(todo);
                    });
                    _this.clearErrorInfo();
                    _this._isRefreshing = false;
                }).error(function (data, status) {
                    _this.setErrorInfo(30000, '情報の更新に失敗しました。');
                    _this._isRefreshing = false;
                }).then(function (response) {
                });
            };

            TodoController.prototype.onClickEvent = function () {
            };

            TodoController.prototype.onAdd = function () {
                var _this = this;
                this._isAdding = true;
                this.todoService.post(this.newTodo).success(function (data, status) {
                    _this.clearErrorInfo();
                    _this.refresh();
                    _this.newTodo.content = '';
                    _this._isAdding = false;
                }).error(function (data, status) {
                    _this.setErrorInfo(10000, '登録に失敗しました。');
                    _this.newTodo.content = '';
                    _this._isAdding = false;
                }).then(function (response) {
                });
            };

            TodoController.prototype.onRemove = function ($index) {
                var _this = this;
                this._isRemoving = true;
                this.todoService.delete(this.todos[$index].id).success(function (data, status) {
                    _this.clearErrorInfo();
                    _this.refresh();
                    _this._isRemoving = false;
                }).error(function (data, status) {
                    _this.setErrorInfo(20000, '削除に失敗しました。');
                    _this._isRemoving = false;
                }).then(function (response) {
                });
            };
            return TodoController;
        })();
        Todo.TodoController = TodoController;
    })(Controller.Todo || (Controller.Todo = {}));
    var Todo = Controller.Todo;
})(Controller || (Controller = {}));
