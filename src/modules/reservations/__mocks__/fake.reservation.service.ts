import { RequestReservationDTO } from "../dtos/request.reservation.dto";
import { fakeReservation } from "./fake.reservation";
import { IReservationService } from "../services/reservation.service.interface";

export const fakeReservationService = {
  async getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeReservation));
  },

  async getById(_id: string) {
    return Promise.resolve(fakeReservation);
  },

  async create(_reservation: RequestReservationDTO) {
    return Promise.resolve(fakeReservation);
  },

  async update(_id: string, _reservation: RequestReservationDTO) {
    return Promise.resolve(fakeReservation);
  },

  async softDelete(_id: string) {
    return Promise.resolve(fakeReservation);
  },
} as unknown as IReservationService;
