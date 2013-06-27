///<reference path='../../libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../../services/todo/TodoService.ts' />
///<reference path='../../models/todo/Todo.ts' />

module Controller.Todo{

    export interface ICalendarEvent {
        id?: string;
        title: string;
        allDay?: boolean;
        start: any;
        end?: any;
        url?: string;
        className?: any;
        editable?: boolean;
        source?: any;
        color?: string;
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string
    }

    export interface IErrorInfo {
        code: number;
        message: string;
    }

    export interface IScope extends ng.IScope {

        newTodo: Model.Todo;
        //todos: Array<Model.Todo.Todo>;
        todos: Model.Todo[];
        onAdd: () => void;
        onRemove: ($index: number) => void;
        calendarConfig: any;
        eventSources: Array<ICalendarEvent>;
        onClickEvent: () => void;
        errorInfo: IErrorInfo;
    }

    export class TodoController {
        
        // service.
        public todos: Array<Model.Todo>;
        public newTodo: Model.Todo;
        public eventSources: ICalendarEvent[];
        public errorInfo: IErrorInfo;

        private _isAdding: boolean = false;
        private _isRemoving: boolean = false;
        private _isRefreshing: boolean = false;

        private _isProcessing: boolean = false;

        // consturctor.
        constructor(public $scope: Controller.Todo.IScope, private $window: ng.IWindowService, private todoService: Service.Todo.TodoService) {

            this.newTodo = new Model.Todo();
            //this.todos = new Array< Model.Todo.Todo>();
            this.todos = new Array<Model.Todo>();
            this.eventSources = [];
            this.errorInfo = { code: 0, message: '' };

            this.$scope.newTodo = this.newTodo;
            this.$scope.todos = this.todos;
            this.$scope.onAdd = () => { this.onAdd(); };
            this.$scope.onRemove = ($index: number) => { this.onRemove($index); };
            this.$scope.onClickEvent = () => { this.onClickEvent(); };
            this.$scope.eventSources = [];
            this.$scope.errorInfo = this.errorInfo;

            // calendar config.
            this.$scope.calendarConfig = {
                height: 450,
                editable: true,
                dayClick: () => {
                    this.$scope.onClickEvent();
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
                    },
                ]
            }
            this.refresh();
        }

        public get isProcessing(): boolean {
            return this._isAdding || this._isRemoving || this._isRefreshing;
        }

        private clearErrorInfo(): void {
            this.setErrorInfo();
        }

        private setErrorInfo(code: number = 0, message: string = ''): void {
            this.errorInfo = {
                code: code,
                message: message
            };
            this.$scope.errorInfo = this.errorInfo;
        }

        public refresh(): void {
            this._isRefreshing = true;
            // TODOリストを取得します。
            this.todoService.getList()
                .success((data: Model.Todo[], status: number) => {
                    this.todos.length = 0;
                    data.forEach((todo: Model.Todo) => {
                        this.todos.push(todo);
                    })
                    this.clearErrorInfo();
                    this._isRefreshing = false;
                })
                .error((data: any, status: number) => {
                    this.setErrorInfo(30000, '情報の更新に失敗しました。');
                    this._isRefreshing = false;
                })
                .then((response: ng.IHttpPromiseCallbackArg) => {
                });
        }

        public onClickEvent(): void {
        }

        // on click add button.
        public onAdd(): void {
            this._isAdding = true;
            this.todoService.post(this.newTodo)
                .success((data: any, status: number) => {
                    this.clearErrorInfo();
                    this.refresh();
                    this.newTodo.content = '';
                    this._isAdding = false;
                })
                .error((data: any, status: number) => {
                    this.setErrorInfo(10000, '登録に失敗しました。');
                    this.newTodo.content = '';
                    this._isAdding = false;
                })
                .then((response: ng.IHttpPromiseCallbackArg) => {
                });
        }

        // on click remove button.
        public onRemove($index: number): void {
            this._isRemoving = true;
            this.todoService.delete(this.todos[$index].id)
                .success((data: any, status: number) => {
                    this.clearErrorInfo();
                    this.refresh();
                    this._isRemoving = false;
                })
                .error((data: any, status: number) => {
                    this.setErrorInfo(20000, '削除に失敗しました。');
                    this._isRemoving = false;
                })
                .then((response: ng.IHttpPromiseCallbackArg) => {
                });
        }
    }
}