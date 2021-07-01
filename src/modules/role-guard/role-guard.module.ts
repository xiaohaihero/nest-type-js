import { Module } from '@nestjs/common';
import { RoleGuardsController } from './role-guard.controller';
import { RoleGuardsService } from './role-guard.service';

@Module({
  controllers: [RoleGuardsController],
  providers: [RoleGuardsService]
})
export class RoleGuardsModule {}
