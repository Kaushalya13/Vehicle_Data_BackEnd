import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { GetVehicleArgs } from './args/get-vehicle.args';
import { GetVehiclesArgs } from './args/get-vehicles.args';
import { CreateVehicleInput } from './input/create-vehicle.input';
import { UpdateVehicleInput } from './input/update-vehicle.input';
import { DeleteVehicleInput } from './input/delete-vehicle.input';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  // fetch single vehicle using graphql query
  @Query(() => Vehicle, { name: 'vehicle', nullable: true })
  async getVehicle(@Args() getVehicleArgs: GetVehicleArgs): Promise<Vehicle> {
    return this.vehicleService.getVehicle(getVehicleArgs);
  }

  // fetch multiple vehicles using graphql query
  @Query(() => [Vehicle], { name: 'vehicles', nullable: 'items' })
  async getVehicles(@Args() getVehiclesArgs: GetVehiclesArgs): Promise<Vehicle[]> {
    return this.vehicleService.getVehicles(getVehiclesArgs);
  }

  // create a new vehicle using graphql Mutation
  @Mutation(() => Vehicle)
  async createVehicle(
    @Args('createVehicleData') createVehicleData: CreateVehicleInput
  ): Promise<Vehicle> {
    return this.vehicleService.create(createVehicleData);
  }

  // update vehicle using graphql Mutation
  @Mutation(() => Vehicle)
  async updateVehicle(
    @Args('updateVehicleData') updateVehicleData: UpdateVehicleInput
  ): Promise<Vehicle> {
    return this.vehicleService.update(updateVehicleData);
  }


  // delete a vehicle using graphql Mutation
  @Mutation(() => Vehicle)
  async deleteVehicle(
    @Args('deleteVehicleData') deleteVehicleData: DeleteVehicleInput): Promise<Vehicle>{
    return this.vehicleService.delete(deleteVehicleData);
  }

}
