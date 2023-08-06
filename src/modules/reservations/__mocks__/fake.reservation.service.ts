import { RequestReservationDTO } from "../dtos/request.reservation.dto"; // Atualize isso para o DTO correto
import { fakeReservation } from "./fake.reservation";
import { IReservationService } from "../services/reservation.service.interface"; // Atualize isso para a interface correta

export const fakeReservationService = {
  async getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeReservation));
  },

  createRechargeByReservation(_id: string) {
    return Promise.resolve(fakeReservation);
  },

  async createReservation(_reservation: RequestReservationDTO) {
    return Promise.resolve(fakeReservation);
  },

  async update(_id: string, _reservation: RequestReservationDTO) {
    return Promise.resolve(fakeReservation);
  },
} as unknown as IReservationService;
