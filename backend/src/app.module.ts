import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { SacramentsModule } from './sacraments/sacraments.module';
import { FinanceModule } from './finance/finance.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MembersModule,
    SacramentsModule,
    FinanceModule,
    DashboardModule,
  ],
})
export class AppModule {}
