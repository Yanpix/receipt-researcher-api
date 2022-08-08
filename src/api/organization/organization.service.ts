import { execute } from "./../utils/mysql.connector";
import { OrganizationQueries } from "./organization.queries";
import { IOrganization } from "./organization.model";

/**
 * adds a new active Organization record
 */
export const insertOrganization = async (Organization: IOrganization) => {
  try {

    //check if there is no such organization in the database already
    const organizationExists = await execute<Array<{ organizationId: IOrganization['organization_id'] }>>
      (OrganizationQueries.FindOrganization, [Organization.ico]);

    let result: number;

    if (organizationExists.length > 0) {
      result = organizationExists[0].organizationId as number;
    } else {
      const org = await execute<{ insertId: number }>(OrganizationQueries.AddOrganization, [
        Organization.buildingNumber,
        Organization.country,
        Organization.dic,
        Organization.icDph,
        Organization.ico,
        Organization.municipality,
        Organization.name,
        Organization.postalCode,
        Organization.propertyRegistrationNumber,
        Organization.streetName,
        Organization.vatPayer
      ]);

      result = org.insertId;
    };

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * gets Organization record by Id
 */
 export const getOrganizationById = async (organizationId: IOrganization['organization_id']) => {
  const result = await execute<IOrganization[]>(OrganizationQueries.GetOrganizationById, [organizationId]);
  return result[0]; 
};