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

@Module({
  imports: [
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
      models: [User, Admin, Genre, Language, Category, Author],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
