export abstract class IRechargeAgendaService {
  abstract startRechargeChecking(): Promise<void>;
}
