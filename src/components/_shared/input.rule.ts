export type ResultCheckError = string | undefined;
export type InputRule = (value: any) => ResultCheckError;

export class InputData<T = any> {
  value: T | null = null;
  error: ResultCheckError = undefined;
  rules: InputRule[] = [];
  constructor(other: Partial<InputData> = {}) {
    Object.assign(this, other);
  }

  validate() {
    return checkError(this);
  }
}

export function checkError(field: InputData): ResultCheckError {
  for (const rule of field.rules) {
    const error = rule(field.value);
    if (error !== null) {
      return error;
    }
  }
}

export function ruleIsString(allowEmpty = false): InputRule {
  return (val: any) => {
    if (typeof val !== "string") {
      return "Must be string";
    }
    if (!allowEmpty && val.length === 0) {
      return "Please type something";
    }
  };
}

export function ruleStrongPassword(): InputRule {
  return (val: string) => {
    if (val.length < 8) {
      return "Password must more than 7 characters";
    }
  };
}

export function ruleIsEmail(): InputRule {
  return (val: string) => {
    if (!val.includes("@")) {
      return "Email must include @";
    }
  };
}
