///<reference path='libs/DefinitelyTyped/jasmine/jasmine.d.ts' />
///<reference path='libs/DefinitelyTyped/sinon/sinon.d.ts' />
///<reference path='libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />
///<reference path='../../main/typescripts/models/todo/Todo.ts' />

'use strict';

/**
 * モデルのテスト
 */
describe('TodoModel', () => {

    // テストの前に実行されるメソッド
    beforeEach(() => {
    });

    // テストの後に実行されるメソッド
    afterEach(() => {
    });

    // 初期化のテスト
    it('Todo Initialize 1', () => {

        var todo: Model.Todo = new Model.Todo();

        expect(todo.content)
            .toBe('');
        expect(todo.createdAt)
            .toBe(0);
        expect(todo.createdBy)
            .toBe('');
        expect(todo.id)
            .toBe(0);
    });

    // contentプロパティのテスト２
    it('Todo Initialize 2', () => {

        var todo: Model.Todo
            = new Model.Todo({
                id: 100,
                createdAt: 1234560,
                createdBy: 'loginuser',
                content: 'aaaa'
            });

        expect(todo.content)
            .toBe('aaaa');
        expect(todo.createdAt)
            .toBe(1234560);
        expect(todo.createdBy)
            .toBe('loginuser');
        expect(todo.id)
            .toBe(100);
    });
});