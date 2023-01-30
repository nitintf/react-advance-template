import { RequireOnlyOne } from './types';

type EnvPropsType<T> = {
  name: string;
  defaultValue?: T;
  required?: boolean;
};

// Either pass defaultValue or required as if it is required we should throw error and tell the var is missing otherwise return defaultValue
type EnvProps<T> = RequireOnlyOne<EnvPropsType<T>, 'defaultValue' | 'required'>;

const getDefault = <T>(variableName: string, defaultValue?: T): T => {
  if (defaultValue === (null || undefined)) {
    throw new Error(`Missing value for enviorment variable ${variableName}.`);
  }

  return defaultValue;
};

export const getEnvString = ({
  name,
  defaultValue,
  required = false,
}: EnvProps<string>): string => {
  const envValue = process.env[name] as string;

  if (envValue === undefined || required) {
    return getDefault<string>(name, defaultValue);
  }

  return envValue;
};

export const getEnvNumber = ({
  name,
  defaultValue,
  required = false,
}: EnvProps<number>): number => {
  const envValue = process.env[name];

  if (envValue === undefined || required) {
    return getDefault<number>(name, defaultValue);
  }

  const value = Number(envValue);

  return value;
};

export const getEnvBoolean = ({
  name,
  defaultValue,
  required = false,
}: EnvProps<boolean>): boolean => {
  const envValue = process.env[name];

  if (envValue === undefined || required) {
    return getDefault<boolean>(name, defaultValue);
  }

  if (envValue === 'true') {
    return true;
  }
  if (envValue === 'false') {
    return false;
  }

  throw new Error(`Could not parse enviorment variable ${name} as Boolean.`);
};
