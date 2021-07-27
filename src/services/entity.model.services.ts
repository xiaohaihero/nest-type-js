import { FilterQuery, Model } from 'mongoose'
import ModelEntity  from '../entity/ModelEntity'

enum sortEnum {
    DESC = 'DESC',   // 倒序
    ASC = 'ASC'      // 升序
}

interface orderEntity {
    field: string,
    sort: string
}


interface ModelServiceInterface<T>{
    getEntityModel(): Model<T>;
    create(params: T | any): Promise<T | any>;
    list(params: T | any, page?: number, rows?: number, orders?: orderEntity[], fields?: string[]): Promise<T[] | any>;
    update(params: T | any, _id: string): Promise<T | any>;
    findOne(params: T | any): Promise<T | any>;
    delete(params: T | any): Promise<T | any>;
    deleteOne(_id: string): Promise<any>;
}

export default abstract class EntityModelService<T extends ModelEntity> implements ModelServiceInterface<T>{
    getEntityModel(): Model<T> {
        return {} as Model<T>;
    }

    async create(params: T): Promise<T[]> {
        let instances: T[] = await this.getEntityModel().insertMany([params]);
        return instances;
    }

    async list(params: any, page?: number, rows?: number, orders?: orderEntity[], fields?: string[]): Promise<any> {
        let fieldsObj = {};
        if(fields){
            fieldsObj = (() => { 
                fields.forEach(element => {
                    fieldsObj[element] = 1
                }); 
                return fieldsObj;
            })()
        }
        let list = this.getEntityModel().find(params, fieldsObj);
        if(orders){
            let sortInfo = {};
            orders.forEach((item) => { sortInfo[item.field] = item.sort});
            list.sort(sortInfo);
        }
        if(page){
            let _rows = Number(rows) || 10;
            let offset = (page - 1) * _rows;            
            list.skip(offset).limit(_rows);
        }
        return await list;
    }

    async update(params: any, _id: string): Promise<any> {
        let result = await this.getEntityModel().updateOne({_id: _id} as FilterQuery<T>, params);
        return result;
    }

    async findOne(params: any): Promise<T> {
        let result: T = await this.getEntityModel().findOne(params);
        return result
    }

    async delete(params: any): Promise<any> {
        let result = await this.getEntityModel().deleteMany(params);
        return result
    }

    async deleteOne(_id: string): Promise<any> {
        let result = await this.getEntityModel().findByIdAndDelete(_id);
        return result;
    }

}