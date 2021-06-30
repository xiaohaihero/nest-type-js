import { Injectable } from '@nestjs/common';

let users = []
let id = 0;

@Injectable()
export class ExceptionService {
    list(id?: number){
        if(id){
            return users.filter(item => item.id == id)
        }
        return users
    }

    create(name:string, age:number):string{
        let user = {
            id: ++id,
            name:name,
            age:age
        }
        users.push(user);
        return 'success'
    }

    update(id:number, name?:string, age?:number): string{
        users.map(item => {
            if(item.id != id) return item;
            name? item.name = name : '';
            age? item.age = age: '';
            return item;
        })
        return 'success'
    }

    delete(id:number): string{
        users = users.filter(item => item.id != id)
        return 'success'
    }
    
}
