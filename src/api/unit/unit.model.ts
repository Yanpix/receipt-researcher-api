import { Request } from 'express';

export interface IUnit {
  unit_id? : number;
  organization_id: number;
  cashRegisterCode: string;  
  buildingNumber: string;
  country: string;
  municipality: string;
  postalCode: string;
  propertyRegistrationNumber: string;
  streetName: string;
  name: string;
  unitType: string;
};

export interface IAddUnitReq extends Request<any, any, IUnit> { }