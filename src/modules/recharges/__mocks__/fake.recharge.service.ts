import { RequestRechargeDTO } from "../dtos/request.reacharge.dto";
import { fakeRecharge } from "./fake.recharge";
import { IRechargeService } from "../services/recharge.service.interface";

export const fakeRechargeService = {
  async getAll() {
    return Promise.resolve(Array.from({ length: 10 }, () => fakeRecharge));
  },

  async getById(_id: string) {
    return Promise.resolve(fakeRecharge);
  },

  async create(_recharge: RequestRechargeDTO) {
    return Promise.resolve(fakeRecharge);
  },

  async update(_id: string, _recharge: RequestRechargeDTO) {
    return Promise.resolve(fakeRecharge);
  },

  async softDelete(_id: string) {
    return Promise.resolve(fakeRecharge);
  },
} as unknown as IRechargeService;
