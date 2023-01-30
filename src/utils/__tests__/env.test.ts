import { getEnvBoolean, getEnvNumber, getEnvString } from '../env';

describe('util - getEnvString', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('Should return env variable with type string', () => {
    const value = 'Randoom Value';
    process.env.ENV_VAR = value;

    const envVar = getEnvString({ name: 'ENV_VAR', defaultValue: '' });
    expect(envVar).toBe(value);
    expect(typeof envVar).toBe('string');
  });

  it('Should throw error if env var not found and required is true', () => {
    const t = () => {
      getEnvString({ name: 'ENV_VAR', required: true });
    };

    expect(t).toThrow('Missing value for enviorment variable ENV_VAR.');
  });

  it('Should return default value if env var is missing', () => {
    const envVar = getEnvString({ name: 'ENV_VAR', defaultValue: 'Random value' });
    expect(envVar).toBe('Random value');
  });
});

describe('util - getEnvNumber', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('Should return env variable with type string', () => {
    const value = '1000';
    process.env.ENV_VAR = value;

    const envVar = getEnvNumber({ name: 'ENV_VAR', defaultValue: 100 });
    expect(envVar).toBe(Number(value));
    expect(typeof envVar).toBe('number');
  });

  it('Should throw error if env var not found and required is true', () => {
    const t = () => {
      getEnvNumber({ name: 'ENV_VAR', required: true });
    };

    expect(t).toThrow('Missing value for enviorment variable ENV_VAR.');
  });

  it('Should return default value if env var is missing', () => {
    const envVar = getEnvNumber({ name: 'ENV_VAR', defaultValue: 1000 });
    expect(envVar).toBe(1000);
  });
});

describe('util - getEnvBoolean', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('Should return env variable with type string', () => {
    const value = 'true';
    process.env.ENV_VAR = value;

    const envVar = getEnvBoolean({ name: 'ENV_VAR', defaultValue: false });
    expect(envVar).toBe(true);
    expect(typeof envVar).toBe('boolean');
  });

  it('Should throw error if env var not found and required is true', () => {
    const t = () => {
      getEnvBoolean({ name: 'ENV_VAR', required: true });
    };

    expect(t).toThrow('Missing value for enviorment variable ENV_VAR.');
  });

  it('Should return default value if env var is missing', () => {
    const envVar = getEnvBoolean({ name: 'ENV_VAR', defaultValue: false });
    expect(envVar).toBe(false);
  });

  it('Should throw parse error if env variable is not able parse into boolean', () => {
    const value = 'Value';
    process.env.ENV_VAR = value;
    const t = () => {
      getEnvBoolean({ name: 'ENV_VAR', required: false });
    };

    expect(t).toThrow('Could not parse enviorment variable ENV_VAR as Boolean.');
  });
});
