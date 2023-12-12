import React, { useEffect } from "react";

class SceneHook {
  protected static SceneManager: SceneManagerStatic | null = null;
  protected static _handlers: Record<number, Function> = {};

  static setup(): SceneManagerStatic {
    if (this.SceneManager) return this.SceneManager;

    const hook = this;
    const set = (
      target: SceneManagerStatic,
      p: string | symbol,
      value: any,
      receiver: any
    ) => {
      if (p === "_scene") {
        Object.values(hook._handlers).forEach((x) => x(value));
      }
      return Reflect.set(target, p, value, receiver);
    };

    SceneManager = new Proxy(SceneManager, { set });

    return (this.SceneManager = SceneManager);
  }

  static addHandler(handler: Function) {
    this.setup();
    const key = Math.random() * 1000000000;
    this._handlers[key] = handler;
    return key;
  }

  static removeHandler(key: number) {
    delete this._handlers[key];
  }
}

SceneHook.setup();

export function useScene<T extends Scene_Base>(): T | null {
  const [scene, setScene] = React.useState<T | null>(
    SceneManager._scene as any
  );

  useEffect(() => {
    const key = SceneHook.addHandler(setScene);

    return () => {
      SceneHook.removeHandler(key);
    };
  }, []);

  return scene;
}
