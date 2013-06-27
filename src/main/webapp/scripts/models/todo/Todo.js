var Model;
(function (Model) {
    var Todo = (function () {
        function Todo(json) {
            this.content = '';
            this.id = 0;
            this.createdAt = 0;
            this.createdBy = '';
            if (json == null)
                return;

            var todo = json;
            this.content = todo.content;
            this.id = todo.id;
            this.createdAt = todo.createdAt;
            this.createdBy = todo.createdBy;
        }
        return Todo;
    })();
    Model.Todo = Todo;
})(Model || (Model = {}));
