declare module '*/filter_config.json' {
  interface FilterConfig {
    category: {
      target: string;
      id: string;
      displayText: string;
      regExp: string;
    };
    flag: {
      target: string;
      id: string;
      displayText: string;
      regExp: string;
      default: boolean;
    };
    semester: {
      id: string;
      displayText: string;
      regExp: string;
    };
    organization: {
      belongs: string;
      type: string;
      id: string;
      displayText: string;
      regExp: string;
    };
  }

  const value: FilterConfig;
  export = value;
}
