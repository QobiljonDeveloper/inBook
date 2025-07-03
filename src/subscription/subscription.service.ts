import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Subscription } from "./models/subscription.model";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: typeof Subscription
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = await this.subscriptionModel.create(
      createSubscriptionDto
    );
    return subscription;
  }

  async findAll() {
    return this.subscriptionModel.findAll();
  }

  async findOne(id: number) {
    return this.subscriptionModel.findByPk(id);
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionModel.findByPk(id);
    if (!subscription) return null;
    return subscription.update(updateSubscriptionDto);
  }

  async remove(id: number) {
    const subscription = await this.subscriptionModel.findByPk(id);
    if (!subscription) return null;
    await subscription.destroy();
    return { message: "Subscription deleted successfully" };
  }
}
