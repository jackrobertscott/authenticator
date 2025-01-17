import { Plugin, IPluginConstructor, IPlugin, IPluginOptions } from './plugin'
import { API, IAPIConstructor, IAPIGraphql } from './api'

export class Authpack {
  private api: API
  private plugin: Plugin
  constructor(options: IAuthpackConstructor) {
    if (!options.key || !options.key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.api = new API(options)
    this.plugin = new Plugin(options)
  }
  public current(): IAuthpackCurrent {
    return this.plugin.current()
  }
  public open(): void {
    return this.plugin.show()
  }
  public exit(): void {
    return this.plugin.exit()
  }
  public update(options: Partial<IAuthpackOptions>): void {
    return this.plugin.update(options)
  }
  public listen(callback: (current: IAuthpackCurrent) => void): () => void {
    return this.plugin.listen(callback)
  }
  public graphql<T>(options: IAuthpackGraphql): Promise<T> {
    return this.api.graphql<T>(options)
  }
}

export type IAuthpackConstructor = IPluginConstructor & IAPIConstructor & {}

export type IAuthpackOptions = IPluginOptions

export type IAuthpackCurrent = IPlugin

export type IAuthpackGraphql = IAPIGraphql
