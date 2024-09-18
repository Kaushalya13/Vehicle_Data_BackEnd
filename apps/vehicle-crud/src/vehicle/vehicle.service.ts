import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { CreateVehicleInput } from './input/create-vehicle.input';
import { UpdateVehicleInput } from './input/update-vehicle.input';
import { DeleteVehicleInput } from './input/delete-vehicle.input';
import { GetVehicleArgs } from './args/get-vehicle.args';
import { GetVehiclesArgs } from './args/get-vehicles.args';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,) {}

    // save 
    public async create(createVehicleData: CreateVehicleInput): Promise<Vehicle> {
      // Create a new instance of the Vehicle entity
      const vehicle = this.vehicleRepository.create(createVehicleData);

      // Save the vehicle to the database
      await this.vehicleRepository.save(vehicle);

      console.log("Vehicle Saved to Database");
      return vehicle;
    }

  
    //Update
    public async update(updateVehicledata: UpdateVehicleInput): Promise<Vehicle>{
      // find the exist vehicle id
      const existVehicle = await this.vehicleRepository.findOne({
        where: {id: updateVehicledata.id}
      });

      if (!existVehicle) {
        throw new NotFoundException(`Vehicle with ID ${updateVehicledata.id} not found`);
      }

      // update the vehicle with the new data
      const updateVehicle = Object.assign(existVehicle, updateVehicledata);

      //save the update vehicle to the database
      await this.vehicleRepository.save(updateVehicle);

      console.log("Vehicle Updated in Database");
      return updateVehicle;

    }

    //Delete
    public async delete(deleteVehicledata: DeleteVehicleInput): Promise<Vehicle>{
      //find the vehicle id
      const vehicle = await this.vehicleRepository.findOne({
        where: { id: deleteVehicledata.id},
      });

      if(!vehicle){
        throw new NotFoundException(`Vehicle with ID ${deleteVehicledata.id} not found`);
      }

      const deleteVehicle = Object.assign(vehicle, deleteVehicledata);
      // delete the vehicle from database
      await this.vehicleRepository.remove(vehicle);
      console.log(`Vehicle ID Deleted`);

      return deleteVehicle;
    }


    // Retrieve a vehicle by its ID
    public async getVehicle(getVehicleArgs: GetVehicleArgs): Promise<Vehicle> {
      return this.vehicleRepository.findOne({
        where: { id: getVehicleArgs.id }
      });
    }

    // Retrieve vehicles by their IDs
    public async getVehicles(getVehiclesArgs: GetVehiclesArgs): Promise<Vehicle[]> {
      return this.vehicleRepository.find({
        where: { id: In(getVehiclesArgs.ids) }
      });
    }
}
