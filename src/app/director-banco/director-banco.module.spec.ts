import { DirectorBancoModule } from './director-banco.module';

describe('DirectorBancoModule', () => {
  let directorBancoModule: DirectorBancoModule;

  beforeEach(() => {
    directorBancoModule = new DirectorBancoModule();
  });

  it('should create an instance', () => {
    expect(directorBancoModule).toBeTruthy();
  });
});
