import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { isErrored } from "stream";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          language_code: ctx.from?.language_code!,
        });

        await ctx.replyWithHTML(
          `Iltimos, akkountni faollashtirish uchun <b>☎️Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎️Telefon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else if (!user.status) {
        await ctx.replyWithHTML(
          `Iltimos, akkountni faollashtirish uchun <b>☎️Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎️Telefon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          `Ushbu Bot InBook Premium foydalanuvchilari uchun kitob izlash imkoniyatini beradi`,
          {
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Start: `, error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Iltimos, <b>/start</b> tugmasini bosing!`, {
            ...Markup.keyboard([["/start"]]).resize(),
          });
          return;
        }

        if (ctx.message.contact.user_id !== user_id) {
          await ctx.replyWithHTML(
            `Iltimos, faqat <b>O'zingizning</b> telefon raqamingizni yuboring!`,
            {
              ...Markup.keyboard([
                [Markup.button.contactRequest("☎️Telefon raqamni yuborish")],
              ]).resize(),
            }
          );
          return;
        }
        let phone = ctx.message.contact.phone_number;
        user.phone_number = phone[0] != "+" ? "+" + phone : phone;
        user.status = true;
        await user.save();

        await ctx.replyWithHTML(`✅ <b>Akkount faollashtirildi!</b>`, {
          ...Markup.removeKeyboard(),
        });
      } else {
        await ctx.reply("Iltimos, kontakt yuboring");
      }
    } catch (error) {
      console.log(`❌ Error on Contact: `, error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxattan o'tmagansiz`, {
          ...Markup.removeKeyboard(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();

        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqib ketdingiz. Qayta faollashtirish uchun /start tugmasini bosing!`,
          {
            ...Markup.keyboard([["/start"]]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(`❌ Error on Stop: `, error);
    }
  }
  async sendOtp(
    phone_number: string,
    OTP: string
  ): Promise<boolean | undefined> {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }
      await this.bot.telegram.sendMessage(user.user_id, `verfiy code: ${OTP}`);
      return true;
    } catch (error) {
      console.log(`❌ Error on Send OTP: `, error);
    }
  }
}
