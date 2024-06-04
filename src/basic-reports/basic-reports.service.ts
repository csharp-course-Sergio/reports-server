import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetter,
  getEmploymentLetterById,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Sergio Barreras',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async countriesReport() {
    const docDefinition = getCountriesReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterById({
      employeeHour: employee.hours_per_day,
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
      employerName: 'Sergio Barreras',
      employerPosition: 'Gerente de RRHH',
      employerCompany: 'Tucan Code Corp.',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
