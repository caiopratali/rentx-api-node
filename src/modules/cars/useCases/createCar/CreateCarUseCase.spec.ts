import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "any_plate",
      fine_amout: 60,
      brand: "any_brand",
      category_id: "any_id",
    });

    expect(car).toHaveProperty("id");
  });

  it("shold not be able to create a car  with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "any_name",
        description: "any_description",
        daily_rate: 100,
        license_plate: "any_plate",
        fine_amout: 60,
        brand: "any_brand",
        category_id: "any_id",
      });

      await createCarUseCase.execute({
        name: "any_name2",
        description: "any_description",
        daily_rate: 100,
        license_plate: "any_plate",
        fine_amout: 60,
        brand: "any_brand",
        category_id: "any_id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "any_name",
      description: "any_description",
      daily_rate: 100,
      license_plate: "any_plate",
      fine_amout: 60,
      brand: "any_brand",
      category_id: "any_id",
    });

    expect(car.available).toBe(true);
  });
});
