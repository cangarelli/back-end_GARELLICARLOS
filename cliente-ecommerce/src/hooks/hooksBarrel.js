// Server Managers
export { default as serverConfig } from './serverManagers/serverConfig.js';
export { default as devHost } from './serverManagers/devConfigurator.js';

// Data Managers
export { default as fetchData } from './dataManagers/fetchData.js';
export { default as formProcesor } from './dataManagers/formProcesor.js';
export { default as dataUploader } from './dataManagers/dataUploader.js';
export { default as handleSubmit } from './dataManagers/handleSubmit.js';

// Dom Managers
export { default as deleteElement } from './domManagers/deleteElement.js';
export { default as formWindowMaker } from './domManagers/formWindowMaker.js';
export { default as formController } from './domManagers/formController.js';

// Event Managers

// Loguin Managers

// Utils
export { default as queryMaker } from './utils/queryMaker.js';
export { default as queryGetter } from './utils/queryGetter.js';
