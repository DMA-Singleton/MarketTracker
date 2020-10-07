import { IBase } from "./Interfaces/IBaseModel";

interface BaseEntity {
  ID: number;
}

type PartialId<T> = Partial<IBase> & T;

abstract class BaseModel<T1 extends IBase, T2 extends BaseEntity> {
  protected dataAccess: any;

  constructor() {}

  protected abstract entityMap(entity: T2): T1;

  protected abstract entityUnMap(model: T1): T2;

  protected abstract new({}: Partial<T1>): T1;

  protected async checkUniqueId(model: T1) {
    const entity = await this.dataAccess.findByPk(model.id);
    if (entity !== null) return false;
    return true;
  }

  protected async checkIdentityConstraints(model: T1) {
    return true;
  }

  async exist(model: T1) {
    if ((await this.checkIdentityConstraints(model)) === false) return true;
    if (model.id === undefined) return false;
    if ((await this.checkUniqueId(model)) === false) return true;
    return false;
  }

  async persist(model: Partial<T1>) {
    const modelComplete = this.new(model);
    //TODO - Add Validation
    if (!(await this.exist(modelComplete))) return this.create(modelComplete);
    return modelComplete; //TODO - ADD Update
  }

  private async create(model: T1) {
    const entity = await this.dataAccess.create(this.entityUnMap(model));
    return this.entityMap(entity);
  }

  async findById(id: number) {
    const entity = await this.dataAccess.findByPk(id);
    return this.entityMap(entity);
  }

  async findAll(): Promise<T1[]> {
    const entity = await this.dataAccess.findAll();
    return await entity.map((i: any) => this.entityMap(i));
  }
}

export { BaseModel, BaseEntity, PartialId };
