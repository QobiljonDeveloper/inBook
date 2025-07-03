import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Subscription } from "./models/subscription.model";

@ApiTags("Subscription")
@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: "Yangi subscription yaratish" })
  @ApiResponse({
    status: 201,
    description: "Subscription muvaffaqiyatli yaratildi",
    type: Subscription,
  })
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @ApiOperation({ summary: "Barcha subscriptionlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Subscriptionlar ro‘yxati",
    type: [Subscription],
  })
  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @ApiOperation({ summary: "Bitta subscriptionni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan subscription",
    type: Subscription,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subscriptionService.findOne(+id);
  }

  @ApiOperation({ summary: "Subscriptionni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Subscription muvaffaqiyatli yangilandi",
    type: Subscription,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @ApiOperation({ summary: "Subscriptionni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Subscription muvaffaqiyatli o‘chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subscriptionService.remove(+id);
  }
}
