export const UnitQueries = {

  AddUnit:
    `INSERT INTO unit ( organization_id, cashRegisterCode, buildingNumber, country, municipality, postalCode, propertyRegistrationNumber, streetName, name, unitType ) VALUES (?,?,?,?,?,?,?,?,?,?);`,

  FindUnit:
    `SELECT unit_id FROM unit WHERE cashRegisterCode = ?;`,

  GetUnitById:
    `SELECT * FROM unit WHERE unit_id = ?;`
};