///<reference path='../../libs/DefinitelyTyped/angularjs/angular.d.ts' />
/**
 * Created by 201304013 on 13/06/18.
 */
module Model{

    export interface ITodo {
        content: string;
        id: number;
        createdAt: number;
        createdBy: string;
    }
    /**
     * TODOひとつを表すクラス
     * TODOのデータを保存するモデル
     */
    export class Todo implements ITodo{

        public content: string = '';
        public id: number = 0;
        public createdAt: number = 0;
        public createdBy: string = '';

        constructor(json?: any) {

            if (json == null) return;

            var todo:ITodo = <ITodo> json;
            this.content = todo.content;
            this.id = todo.id;
            this.createdAt = todo.createdAt;
            this.createdBy = todo.createdBy;
        }
    }

}