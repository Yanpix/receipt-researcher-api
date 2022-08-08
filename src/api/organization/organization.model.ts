import { Request } from 'express';

export interface IOrganization {
  organization_id? : number;
  buildingNumber: string;
  country: string;
  dic: string;
  icDph: string;
  ico: string;
  municipality: string;
  name: string;
  postalCode: string;
  propertyRegistrationNumber: string;
  streetName: string;
  vatPayer: boolean;
};

export interface IAddOrganizationReq extends Request<any, any, IOrganization> { }
export interface IGetOrganizationReq extends Request<{ organizationId: IOrganization['organization_id'] }> { }