import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { ReportDTO } from './dtos/report.dto';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/guards/admin-guard';
import { GetEstimateDTO } from './dtos/get-estimate.dto';
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDTO) {
    return this.reportsService.createEstimate(query);
  }
}

