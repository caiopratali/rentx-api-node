import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "any_plate",
      fine_amout: 60,
      brand: "any_brand",
      category_id: "any_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "any_plate",
      fine_amout: 60,
      brand: "any_brand",
      category_id: "any_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "any_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "any_plate",
      fine_amout: 60,
      brand: "any_brand",
      category_id: "any_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "any_name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "any_plate",
      fine_amout: 60,
      brand: "any_brand",
      category_id: "any_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "any_id",
    });

    expect(cars).toEqual([car]);
  });
});
