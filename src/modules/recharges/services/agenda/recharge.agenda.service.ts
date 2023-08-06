import { Recharge } from "./../../model/recharge.model";
import { IRechargeRepository } from "../../repositories/recharge.repository.interface";
import { isDebugMode } from "../../../utils/debugMode/debug.mode";
import { IRechargeAgendaService } from "./recharge.agenda.service.interface";

export class RechargeAgendaService implements IRechargeAgendaService {
  private intervalId: NodeJS.Timeout | undefined;

  constructor(private readonly rechargeRepository: IRechargeRepository) {}

  public async startRechargeChecking() {
    const fiveSeconds = 5000;
    const fifiteenSeconds = 15000;

    await this.sleep(fiveSeconds);

    console.log("Recharge checking is online");

    this.intervalId = setInterval(async () => {
      try {
        await this.checkRecharges();

        if (isDebugMode) {
          console.log("Recharges checked");
        }
      } catch (error) {
        console.error("Error checking recharges:", error);
      }
    }, fifiteenSeconds);
  }

  private async checkRecharges() {
    const recharges =
      (await this.rechargeRepository.getActiveRecharges()) as Recharge[];

    const now = new Date();

    for (const recharge of recharges) {
      if (recharge.endDate < now) {
        console.log(
          `Recharge ${recharge._id}, of station ${recharge.stationName}, and user ${recharge.userEmail} complete!!!`
        );

        recharge.inProgress = false;

        await this.rechargeRepository.update(String(recharge._id), recharge);
      }
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
