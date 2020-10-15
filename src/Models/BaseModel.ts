import { IBase } from "./Interfaces/IBaseModel";
import { injectable } from "inversify";

interface BaseEntity {
  ID: number;
}

type PartialId<T> = Partial<IBase> & T;

@injectable()
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

  protected async isCreatable(model: T1) {
    return true;
  }

  async exist(model: T1) {
    if (!model.id) return false;
    if ((await this.checkUniqueId(model)) === false) return true;
    return false;
  }

  async persist(model: Partial<T1>) {
    const modelComplete = this.new(model);
    if (!(await this.exist(modelComplete))) {
      await this.checkIsCreatable(modelComplete);
      return this.create(modelComplete);
    } else {
      return this.update(modelComplete);
    }
  }

  private async checkIsCreatable(model: T1) {
    if (!(await this.isCreatable(model))) {
      throw new Error("model is not creatable");
    }
  }

  private async create(model: T1) {
    const entity = await this.dataAccess.create(this.entityUnMap(model));
    return this.entityMap(entity);
  }

  private async update(model: T1) {
    await this.dataAccess.update(this.entityUnMap(model), { where: { ID: model.id } });
    return this.findById(model.id);
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
