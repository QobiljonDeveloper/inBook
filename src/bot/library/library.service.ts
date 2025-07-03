import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "../models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Library } from "./models/library.model";

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Library) private readonly libraryModel: typeof Library,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onLibrary(ctx: Context) {
    try {
      await ctx.replyWithHTML("Kerakli menuni tanlang", {
        ...Markup.keyboard([
          ["Yangi kutubxona qo'shish", "Barcha kutubxonalar"],
        ]).resize(),
      });
    } catch (error) {
      console.log("Error on Library: ", error);
    }
  }

  async addNewLibrary(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>/start</b> tugmasini bosing!`, {
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        await this.libraryModel.create({
          user_id: user_id!,
          last_state: "name",
        });
        await ctx.replyWithHTML("Yangi kutubxona nomini kiriting: ", {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("Error on Library: ", error);
    }
  }
}
