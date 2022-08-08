export const OrganizationQueries = {

  GetOrganizationById:
    `SELECT * FROM organization WHERE organization_id = ?`,

  AddOrganization:
    `INSERT INTO organization ( buildingNumber, country, dic, icDph, ico, municipality, name, postalCode, propertyRegistrationNumber, streetName, vatPayer ) VALUES (?,?,?,?,?,?,?,?,?,?,?);`,

  FindOrganization:
    `SELECT organization_id FROM organization WHERE ico = ?;`
};