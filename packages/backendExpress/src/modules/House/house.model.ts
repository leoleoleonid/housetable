import { DataTypes, Model, Optional, Sequelize } from "sequelize";

//TODO to common @lib for backend and frontend
interface IHouse {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;
}

export class House {
  id: number;
  address: string;
  currentValue: number;
  loanAmount: number;
  risk: number;

  static calcRisk(self: House): number {
    //The `risk` attribute is calculated as the ratio of `loanAmount` to `currentValue`.
    const ratio = self.loanAmount / self.currentValue;
    if (ratio > 1) {
      //  The `risk` should be a value between 0 and 1.
      self.risk = 1;
    } else if (ratio > 0.5) {
      // If the `loanAmount` is more than 50% of the `currentValue`, increase the risk by an additional 10%.
      self.risk = ratio + 0.1;
    } else {
      self.risk = ratio;
    }

    return self.risk;
  }
}

export interface HouseInput extends Optional<House, "id" | "risk"> {}
export interface HouseOutput extends Required<House> {}

class HouseModel extends Model<House, HouseInput> implements HouseOutput {
  public id!: number;
  public address!: string;
  public currentValue!: number;
  public loanAmount!: number;
  public risk!: number;

  // need it to split model initialization from tests
  calcRisk(): number {
    return House.calcRisk(this);
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export const initModel = (sequelizeConnection: Sequelize) =>
  HouseModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      loanAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      risk: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: true,
          min: 0,
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        beforeBulkCreate(instances, options) {
          instances.map((instance) => instance.calcRisk());
        },
        beforeCreate: (instance: HouseModel) => {
          instance.calcRisk();
        },
        beforeUpdate: (instance: HouseModel) => {
          instance.calcRisk();
        },
      },
      sequelize: sequelizeConnection,
      paranoid: true,
      timestamps: true,
    }
  );

export default HouseModel;
