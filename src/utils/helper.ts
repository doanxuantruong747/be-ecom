import * as bcrypt from "bcrypt";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import crypto from "crypto";
import moment from "moment";

import { ObjectId } from "bson";

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint
    });
  };
}

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}

export function IsMongoIdObject(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "IsMongoIdObject",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return ObjectId.isValid(value);
        }
      }
    });
  };
}

export function capitalize([first, ...rest]: string, lowerRest = false) {
  return first.toUpperCase() + (lowerRest ? rest.join("").toLowerCase() : rest.join(""));
}

export function getCurrentTimeInt(): number {
  return +(moment().valueOf() / 1000).toFixed();
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const hashNameReel = async (name: string, none: string) => {
  const shasum = crypto.createHash("sha1");
  shasum.update(name + none);
  return shasum.digest("hex");
};

const checkHashPassword = async (password: string, hashPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

export { checkHashPassword, hashNameReel, hashPassword };

export function toSlug({ str }: { str: string }): string {
  str = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9_-]/g, "")
    .replace(/-+/g, "-");
  return str;
}

export function isEmptyObject(object: object): boolean {
  if (typeof object !== "object") return false;
  if (!object) return false;
  return !!Object.keys(object).length;
}

export function logSection(text: string) {
  console.log("..........................................................................................");
  console.log(`......................................${text.toUpperCase()}...............................`);
  console.log("..........................................................................................");
}

export function countPage(total: number, page: number, limit: number) {
  const pagination = {
    page: page,
    limit: limit,
    totalItems: total,
    totalPages: total % limit === 0 ? total / limit : Math.floor(total / limit) + 1
  };

  return pagination;
}

export function getCurrenDatetime() {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}

export function randomNumberString(length: number) {
  let text = "";
  const possible = "0123456789";

  for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export type ErrorCustom = {
  code: number;
  message: string;
};

export const retunException = (code: number, message: string) => {
  const error: ErrorCustom = {
    code: code,
    message: message
  };
  return error;
};

export const generateRandomString = (length: any) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};
