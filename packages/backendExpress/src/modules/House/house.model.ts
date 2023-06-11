import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from "../../common/db/connection";

export class House {
    id: number;
    address: string;
    currentValue: number;
    loanAmount: number;
    risk: number;
}

export interface HouseInput extends Optional<House, 'id' | 'risk'> {}
export interface HouseOutput extends Required<House> {}

class HouseModel extends Model<House, HouseInput> implements HouseOutput {
    public id!: number;
    public address!: string;
    public currentValue!: number;
    public loanAmount!: number;
    public risk!: number;

    calcRisk(): number {
        //The `risk` attribute is calculated as the ratio of `loanAmount` to `currentValue`.
        const ratio = this.loanAmount/this.currentValue;
        if (ratio > 1) {
            //  The `risk` should be a value between 0 and 1.
            this.risk = 1;
        } else if (ratio > 0.5) {
            // If the `loanAmount` is more than 50% of the `currentValue`, increase the risk by an additional 10%.
            this.risk = ratio + 0.1;
        } else {
            this.risk = ratio;
        }

        return this.risk;
    }

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

HouseModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
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
            notEmpty: true
        }
    },
}, {
    hooks: {
        beforeBulkCreate(instances, options) {
            instances.map(instance => instance.calcRisk());
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
});

export default HouseModel;