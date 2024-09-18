import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import * as csv from 'csv-parser';
import { VehicleEntity } from './entity/vehicle.entity';

@Injectable()
@Processor('file-upload-queue')
export class UploadProcessingService {
  private readonly BATCH_SIZE = 1000;

  constructor(private readonly dataSource: DataSource) {}

    @Process('read-file')
    async handleFileUpload(job: Job) {
        console.log('Processing File', job.data);

        try {
            // Validate job data
            if (!job.data || !job.data.file || !job.data.file.path) {
                throw new Error('Invalid job data. Missing file path.');
            }
            const filePath = job.data.file.path;
            console.log('Processing File', filePath);

            // Extract file extension manually
            const fileParts = filePath.split('.');
            const fileExtension = fileParts.length > 1 ? `.${fileParts.pop()?.toLowerCase()}` : '';
            console.log('File Extension:', fileExtension);

            // Check file is CSV or Excel
            if (fileExtension === '.csv') {
                await this.parseCSVFile(filePath);
                console.log('Processing CSV File', filePath);
            } else if (fileExtension === '.xlsx' || fileExtension === '.xls') {
                await this.parseExcelFile(filePath);
                console.log('Processing Excel File', filePath);
            } else {
                console.error('Unsupported file type:', fileExtension);
            }
        } catch (error) {
            console.error('Error Processing File:', error);
        }
    }

    private async parseCSVFile(filePath: string): Promise<void> {
        const results: any[] = [];

        return new Promise((resolve, reject) => {

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) =>{
                    console.log('CSV Rows', row);
                    // call age calculate
                    row.age_of_vehcle = this.calculateVehcleAge(row.manufactured_date);
                    results.push(row);

                    if(results.length >= this.BATCH_SIZE){
                        this.insertDataIntoDatabase(results.splice(0, this.BATCH_SIZE));
                    }
                })
                .on('end',async () => {
                    console.log('CSV File Successfully processed');
                    if(results.length > 0){
                        await this.insertDataIntoDatabase(results);
                    }
                    console.log('Total records processed', results.length);
                    resolve();
                })
                .on('error', (error) => {
                    console.error('Reading Error CSV File', error);
                    reject(error);
                });
        });
    }
  
    private async parseExcelFile(filePath: string): Promise<void> {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetNames = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[sheetNames];
            const jsonData = XLSX.utils.sheet_to_json(workSheet);

            console.log('Excel File Parsed:', jsonData);
                
            // Process data in batches
            for(let i=0; i< jsonData.length; i += this.BATCH_SIZE){
                const batch = jsonData.slice(i, i + this.BATCH_SIZE);
                batch.forEach((row: any)=>{
                    row.age_of_vehcle = this.calculateVehcleAge(row.manufactured_date);
                });
                await this.insertDataIntoDatabase(batch);
            }
        } catch (error) {
            console.error('Error Reading Excel File:', error);
        }
    }

    // calculate vehicle age 
    private calculateVehcleAge(manufacturedDate: string | Date): number {
        const currentYear = new Date().getFullYear();
        const manufacturedYear = new Date(manufacturedDate).getFullYear();
        return currentYear - manufacturedYear;
            
    }



    private async insertDataIntoDatabase(data: any[]): Promise<void> {
        // Use a transaction for batch
        await this.dataSource.transaction(async (manager) => {
            const batchData = data.map(row => {
                const vehicleEntity = new VehicleEntity();
                vehicleEntity.firstName = row.first_name;
                vehicleEntity.lastName = row.last_name;
                vehicleEntity.email = row.email;
                vehicleEntity.carMake = row.car_make;
                vehicleEntity.carModel = row.car_model;
                vehicleEntity.vin = row.vin;
                vehicleEntity.manufacturedDate = new Date(row.manufactured_date);
                vehicleEntity.vehicleAge = row.age_of_vehcle;
                return vehicleEntity;
            });

            try {
                await manager.save(VehicleEntity, batchData);
                console.log('Records inserted into the database');
            } catch (error) {
                console.error('Error inserting into database:', error);
                throw error;
            }
        });
    }

}


