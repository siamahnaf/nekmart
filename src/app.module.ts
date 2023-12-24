import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

//Using Apollo Studio
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";

//Path
import { join } from "path";

//Modules
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { BrandModule } from "./brand/brand.module";
import { TagModule } from "./tag/tag.module";
import { AttributeModule } from "./attributes/attributes.module";
import { CouponModule } from "./coupon/coupon.module";
import { PaymentModule } from "./payment/payment.module";
import { ShippingModule } from "./shipping/shipping.module";
import { FlashModule } from "./flash/flash.module";
import { PlatformModule } from "./platform/platform.module";
import { HomeModule } from "./homepgae/home.module";
import { SettingModule } from "./settings/settings.module";
import { SellerModule } from "./seller/seller.module";
import { ProductModule } from "./product/product.module";
import { WishlistModule } from "./wishlist/wishlist.module";
import { CartModule } from "./cart/cart.module";
import { PreorderModule } from "./preorder/preorder.module";
import { AddressModule } from "./address/address.module";
import { OrderModule } from "./orders/orders.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { PointModule } from "./points/points.module";
import { ReviewModule } from "./reviews/review.module";
import { RefundModule } from "./refund/refund.module";
import { WithdrawModule } from "./withdraw/withdraw.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: "nekmart",
      playground: false,
      plugins: [process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
          footer: false
        })
        : ApolloServerPluginLandingPageLocalDefault({
          footer: false,
          includeCookies: true
        })],
      context: ({ req }) => ({ req })
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    BrandModule,
    TagModule,
    CategoryModule,
    AttributeModule,
    CouponModule,
    PaymentModule,
    ShippingModule,
    FlashModule,
    PlatformModule,
    HomeModule,
    SettingModule,
    SellerModule,
    ProductModule,
    WishlistModule,
    CartModule,
    PreorderModule,
    AddressModule,
    OrderModule,
    AnalyticsModule,
    PointModule,
    ReviewModule,
    RefundModule,
    WithdrawModule
  ]
})
export class AppModule { }
