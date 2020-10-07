interface IBase {
  id: number;
}

interface IBaseModel<T1 extends IBase> {
  exist(model: T1): Promise<Boolean>;

  persist(model: Partial<T1>): Promise<T1>;

  findById(id: number): Promise<T1>;

  findAll(): Promise<T1[]>;
}

export { IBaseModel, IBase };
