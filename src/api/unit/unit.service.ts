import { execute } from "./../utils/mysql.connector";
import { UnitQueries } from "./unit.queries";
import { IUnit } from "./unit.model";

/**
 * adds a new active Unit record
 */
export const insertUnit = async (Unit: IUnit) => {
  try {

    //check if there is no such unit in the database already
    const unitExists = await execute<Array<{ unitId: IUnit['unit_id'] }>>
      (UnitQueries.FindUnit, [Unit.cashRegisterCode]);

    let result: number;

    if (unitExists.length > 0) {
      result = unitExists[0].unitId as number;
    } else {
      const unit = await execute<{ insertId: number }>(UnitQueries.AddUnit, [
        Unit.organization_id,
        Unit.cashRegisterCode,
        Unit.buildingNumber,
        Unit.country,
        Unit.municipality,
        Unit.postalCode,
        Unit.propertyRegistrationNumber,
        Unit.streetName,
        Unit.name,
        Unit.unitType
      ]);
      
      result = unit.insertId;
    };

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * gets Unit record by Id
 */
 export const getUnitById = async (unitId: IUnit['unit_id']) => {
  const result = await execute<IUnit[]>(UnitQueries.GetUnitById, [unitId]);
  return result[0]; 
};