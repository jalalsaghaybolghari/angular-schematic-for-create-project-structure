interface ConfigData {
  updateAppConfigByConfigService: UpdateAppConfigByConfigService;
}

interface UpdateAppConfigByConfigService {
  path: string;
  providersMetaData: string[];
  importStatements: string[];
}

