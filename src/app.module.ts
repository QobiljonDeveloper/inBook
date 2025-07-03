import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { GenreModule } from "./genre/genre.module";
import { Genre } from "./genre/models/genre.model";
import { LanguagesModule } from "./languages/languages.module";
import { CategoriesModule } from "./categories/categories.module";
import { Language } from "./languages/models/language.model";
import { Category } from "./categories/models/category.model";
import { AuthorModule } from "./author/author.module";
import { Author } from "./author/models/author.model";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from "./bot/bot.module";
import { AudioBookModule } from "./audio_book/audio_book.module";
import { AudioBook } from "./audio_book/models/audio_book.model";
import { BookVersionModule } from "./book_version/book_version.module";
import { BookModule } from "./book/book.module";
import { Book } from "./book/models/book.model";
import { BookVersion } from "./book_version/models/book_version.model";
import { AudioPartsModule } from "./audio-parts/audio-parts.module";
import { AudioPart } from "./audio-parts/models/audio-part.model";
import { Bot } from "./bot/models/bot.model";
import { Otp } from "./users/models/otp.model";
import { BooksGenreModule } from "./books-genre/books-genre.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { Subscription } from "./subscription/models/subscription.model";
import { BookMarksModule } from "./book-marks/book-marks.module";
import { Library } from "./bot/library/models/library.model";
import { BookMark } from "./book-marks/models/book-mark.model";
import { CollectionModule } from "./collection/collection.module";
import { Collection } from "./collection/models/collection.model";
import { BookCollectionModule } from "./book-collection/book-collection.module";
import { BookCollection } from "./book-collection/models/book-collection.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Admin,
        Genre,
        Language,
        Category,
        Author,
        AudioBook,
        Book,
        BookVersion,
        AudioPart,
        Bot,
        Otp,
        Subscription,
        Library,
        BookMark,
        Collection,
        BookCollection, 
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    GenreModule,
    LanguagesModule,
    CategoriesModule,
    AuthorModule,
    BotModule,
    AudioBookModule,
    BookVersionModule,
    BookModule,
    AudioPartsModule,
    BooksGenreModule,
    SubscriptionModule,
    BookMarksModule,
    CollectionModule,
    BookCollectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
