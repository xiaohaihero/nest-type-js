import { Model } from 'mongoose';
import _ from 'lodash';
import { Logger } from '@nestjs/common';
import { EntityModelServiceException } from './exceptions';
import ModelEntity from '../entity/ModelEntity';

const logger = new Logger();

export interface ModelServiceInterface<T extends ModelEntity> {
  getEntityModel(): Model<T>;
  list(params?: any, sort?: any, fields?: any): Promise<T[]>;
  details(instanceId: string, params?: any): Promise<T | null>;
  create(params: T | any): Promise<T | null>;
  update(instanceId: string, params: T | any): Promise<T | null>;
  delete(instanceId: string): Promise<T | null>;
}

export default abstract class EntityModelService<T extends ModelEntity> implements ModelServiceInterface<T> {
  public getEntityModel(): Model<T> {
    return {} as Model<T>;
  }
  public async list(params?: any, sort?: any, fields?: any) {
    let condition = this.getEntityModel().find(params, fields);
    if (sort) {
      condition = condition.sort(sort);
    } else {
      condition = condition.sort({_id: -1});
    }
    return await condition;
  }
  public async details(instanceId: string, params?: {}) {
    let condition;
    if (!!params) {
      (params as any)._id = instanceId;
      condition = this.getEntityModel().findOne(params);
    } else {
      try {
        condition = this.getEntityModel().findById(instanceId);
      } catch (e) {
        return null;
      }
    }
    return await condition;
  }
  public async create(params: T | any) {
    try {
      params.dateCreated = Date.now();
      params.dateUpdated = params.dateCreated;
      const instances: T[] = await this.getEntityModel().insertMany([params]);
      if (!!instances && instances.length === 1) {
        return instances[0];
      }
      return null;
    } catch (e) {
      if (Object.keys(e).indexOf('code') !== -1) {
        throw new EntityModelServiceException(
          e.code,
          _.get(e, 'errmsg', 'Unknown Error')
        );
      }
      throw e;
    }
  }
  public async update(instanceId: string, params: T | any) {
    const tmpParams: any = _.cloneDeep(params);
    if (!!tmpParams && !!tmpParams._id) {
      delete tmpParams._id;
    }
    tmpParams.dateUpdated = Date.now();
    const result = await this.getEntityModel().updateOne({_id: instanceId}, tmpParams);
    return await this.details(instanceId);
  }
  public async delete(instanceId: string) {
    const instance: T | any = await this.details(instanceId);
    if (!instance) {
      return null;
    }
    await this.getEntityModel().deleteOne({_id: instanceId});
    return instance;
  }
}
