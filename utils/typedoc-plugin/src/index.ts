import { Application } from 'typedoc';
import { load as loadPlugin } from './newPlugin';
import l from './logger';

/**
 * Initializes the plugin.
 * @param app Reference to the application that is loading the plugin.
 */
export function load(app: Readonly<Application>): void {
  l.logger = app.logger;
  return loadPlugin(app);
}
