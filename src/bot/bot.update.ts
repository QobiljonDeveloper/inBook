import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }
  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithSticker(String(ctx.message.sticker.file_id));
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if ("contact" in ctx.message!) {
  //     console.log(ctx.message.contact);
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }
  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.reply(String(ctx.message.location.latitude));

  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }
  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.reply(String(ctx.message.voice.duration));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithDocument(String(ctx.message.document.file_id));
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("hi HITLER");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Ertaga yordam beraman");
  // }

  // @Command("inline")
  // async onCommandInline(@Ctx() ctx: Context) {
  //   const inlineKeyboards = [
  //     [
  //       { text: "Product1", callback_data: "product_1" },
  //       { text: "Product2", callback_data: "product_2" },
  //       { text: "Product3", callback_data: "product_3" },
  //     ],
  //     [
  //       { text: "Product4", callback_data: "product_4" },
  //       { text: "Product5", callback_data: "product_5" },
  //     ],
  //     [{ text: "Product6", callback_data: "product_6" }],
  //   ];

  //   await ctx.reply("Kerakli productlar", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboards,
  //     },
  //   });
  // }

  // @Action("product_1")
  // async onActPro1(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Product1 Tanlandi");
  // }

  // @Action("product_2")
  // async onActPro2(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Product2 Tanlandi");
  // }

  // @Action(/product_\d+/)
  // async onActionAnyProduct(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const data = ctx.callbackQuery?.data;
  //     const productId = data.split("_")[1];
  //     await ctx.replyWithHTML(`${productId} - Product Tanlandi`);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Kerakli Main Button Tanla: ", {
  //     ...Markup.keyboard([
  //       ["Bir"],
  //       ["Ikki", "Uch"],
  //       ["To'rt", "Besh", "Olti"],
  //       [Markup.button.contactRequest("Telefon raqamingizni yuboring")],
  //       [Markup.button.locationRequest("Turgan lokatsiyangizni yuboring")],
  //     ])
  //       .resize()
  //       .oneTime(),
  //   });
  // }

  // @Hears("Bir")
  // async onHearBir(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Bir bosildi");
  // }

  // @Hears("Ikki")
  // async onHearIkki(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Ikki bosildi");
  // }
  @On("text")
  async onText(@Ctx() ctx: Context) {
    if ("text" in ctx.message!) {
      if (ctx.message.text == "hi") {
        ctx.replyWithHTML(`<b>Hello</b>`);
      } else {
        ctx.replyWithHTML(ctx.message.text);
      }
    }
  }
  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
  }
}
