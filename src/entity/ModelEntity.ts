import { Document } from 'mongoose';

// tslint:disable-next-line:no-empty-interface
export default interface ModelEntity extends Document {
  dateCreated: number;
  dateUpdated: number;
}
