type GetParameterValue = {
  readonly url: string;
}

type IsParameterValueUuidArgs = {
  readonly parameterValue: string;
}

const UUID_REGEXP = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

export class ParseUrlService {
  static getParameterValue({ url }: GetParameterValue): string | null {
    const possibleParameterValue = url.split('/');

    return possibleParameterValue.length > 2 ? possibleParameterValue.pop() : null ;
  }

  static isParameterValueUuid({ parameterValue }: IsParameterValueUuidArgs): boolean {
    return UUID_REGEXP.test(parameterValue);
  }
}