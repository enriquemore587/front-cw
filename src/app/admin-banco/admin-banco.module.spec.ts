import { AdminBancoModule } from './admin-banco.module';

describe('AdminBancoModule', () => {
  let adminBancoModule: AdminBancoModule;

  beforeEach(() => {
    adminBancoModule = new AdminBancoModule();
  });

  it('should create an instance', () => {
    expect(adminBancoModule).toBeTruthy();
  });
});
