import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/models/user.model";

interface ISubscriptionCreationAttr {
  userId: number;
  startDate: Date;
  endDate: Date;
}

@Table({ tableName: "subscription", timestamps: false })
export class Subscription extends Model<
  Subscription,
  ISubscriptionCreationAttr
> {
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "2025-07-01", description: "Obuna boshlangan sana" })
  @Column({ type: DataType.DATE, allowNull: false })
  startDate: Date;

  @ApiProperty({ example: "2025-08-01", description: "Obuna tugaydigan sana" })
  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;

  @BelongsTo(() => User)
  user: User;
}
