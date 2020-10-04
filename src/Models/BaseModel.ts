interface BaseModelOptions {
  id?: number;
}

interface BaseEntity {
  ID?: number;
}
//TODO - ORDER
abstract class BaseModel<T1, T2 extends BaseEntity, T3 extends BaseModelOptions> {
  public id: number;
  protected static dataAccess: any;

  constructor({ id = 0, ...opts }: T3) {
    this.id = id;
    Object.assign(this, opts);
  }

  protected abstract entityMap(entity: T2): T1;

  protected abstract entityUnMap(): T2;

  async exist() {
    if ((await this.checkIdentityConstraints()) === false) return true;
    if (this.id === 0) return false;
    if ((await this.checkUniqueId()) === false) return true;
    return false;
  }

  protected async checkUniqueId() {
    const entity = await (this.constructor as any).dataAccess.findByPk(this.id);
    if (entity !== null) return false;
    return true;
  }

  protected async checkIdentityConstraints() {
    return true;
  }

  async persist() {
    if (!(await this.exist())) return this.create();
    return this; //TODO - ADD Update
  }

  private async create() {
    const entity = await (this.constructor as any).dataAccess.create(this.entityUnMap());
    return this.entityMap(entity);
  }

  async findById(id: number) {
    const entity = await (this.constructor as any).dataAccess.findByPk(id);
    return this.entityMap(entity);
  }

  async findAll(): Promise<T1[]> {
    const entity = await (this.constructor as any).dataAccess.findAll();
    return await entity.map((i: any) => this.entityMap(i));
  }
}

export { BaseModel, BaseModelOptions, BaseEntity };
