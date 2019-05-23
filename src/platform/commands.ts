// https://github.com/microsoft/vscode/blob/master/src/vs/platform/commands/common/commands.ts

export interface ICommand {
  id: string;
  // handler: ICommandHandler;
  // description?: ICommandHandlerDescription | null;
}

// tslint:disable-next-line:no-empty-interface
export interface ICommandHandler {
  // (accessor: ServicesAccessor, ...args: any[]): void;
}

export interface ICommandsMap {
  [id: string]: ICommand;
}

export interface ICommandRegistry {
  // onDidRegisterCommand: Event<string>;
  // registerCommand(id: string, command: ICommandHandler): IDisposable;
  // registerCommand(command: ICommand): IDisposable;
  // registerCommandAlias(oldId: string, newId: string): IDisposable;
  getCommand(id: string): ICommand | undefined;
  getCommands(): ICommandsMap;
}

// tslint:disable-next-line:new-parens
export const CommandsRegistry: ICommandRegistry = new class implements ICommandRegistry {

  // tslint:disable-next-line:variable-name
  private readonly _commands = new Map<string, LinkedList<ICommand>>();

  public registerCommand(idOrCommand: string | ICommand, handler?: ICommandHandler) {

    if (!idOrCommand) {
      throw new Error(`invalid command`);
    }

    if (typeof idOrCommand === 'string') {
      if (!handler) {
        throw new Error(`invalid command`);
      }
      return this.registerCommand({ id: idOrCommand, handler });
    }

    // add argument validation if rich command metadata is provided
    /*
    if (idOrCommand.description) {
      const constraints: Array<TypeConstraint | undefined> = [];
      for (const arg of idOrCommand.description.args) {
        constraints.push(arg.constraint);
      }
      const actualHandler = idOrCommand.handler;
      idOrCommand.handler = function(accessor, ...args: any[]) {
        validateConstraints(args, constraints);
        return actualHandler(accessor, ...args);
      };
    }
    */

    // find a place to store the command
    const { id } = idOrCommand;

    let commands = this._commands.get(id);
    if (!commands) {
      commands = new LinkedList<ICommand>();
      this._commands.set(id, commands);
    }

    const removeFn = commands.unshift(idOrCommand);

    /*
    const ret = toDisposable(() => {
      removeFn();
      const command = this._commands.get(id);
      if (command && command.isEmpty()) {
        this._commands.delete(id);
      }
    });

    // tell the world about this command
    this._onDidRegisterCommand.fire(id);

    return ret;
    */
  }


  public getCommand(id: string): ICommand | undefined {
    const list = this._commands.get(id);
    if (!list || list.isEmpty()) {
      return undefined;
    }
    return list.iterator().next().value;
  }

  public getCommands(): ICommandsMap {
    const result: ICommandsMap = Object.create(null);
    this._commands.forEach((value, key) => {
      result[key] = this.getCommand(key)!;
    });
    return result;
  }
};
