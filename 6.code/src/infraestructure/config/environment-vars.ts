/**
 * Este modulo se encarga de:
 *  Cargar las variables de entorno desde un archivo .env usando dotenv. Validarlas con joi para asegurarse de que tengan los formatos esperados.
 *  Exportarlas como un objeto tipado para su uso en la aplicacion
 */
import * as joi from 'joi';
import "dotenv/config";
require('dotenv').config();

export type ReturnEnvironmentVars = {
  PORT: number;
  ENVIRONMENT: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNC: boolean;
};
/**
 * ValidationEnvironmentVars: Estructura que almacena el resultado de la validación de las variables de entorno.
 */
type ValidationEnvironmentVars = {
  error: joi.ValidationError | undefined;
  value: ReturnEnvironmentVars;
};

function validateEnvVars(vars: NodeJS.ProcessEnv): ValidationEnvironmentVars {
  const envSchem = joi.object({
    PORT: joi.number().default(4666).required(),
    ENVIRONMENT: joi.string().default('dev').required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().default(3306).required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().allow("").optional(),
    DB_NAME: joi.string().required(),
    DB_SYNC: joi.boolean().default(false).required(),
  }).unknown(true);
  const { error, value } = envSchem.validate(vars);
  return { error, value };
}

const loadEnvVars = (): ReturnEnvironmentVars => {
  const result = validateEnvVars(process.env);
  if (result.error) {
    throw new Error(`Error validating environment variables: ${result.error.message}`);
  }
  const value = result.value;
  return {
    PORT: value.PORT,
    ENVIRONMENT: value.ENVIRONMENT,
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_NAME: value.DB_NAME,
    DB_SYNC: value.DB_SYNC
  }
}
const envs = loadEnvVars();
export default envs;